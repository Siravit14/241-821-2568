const express = require('express');
const bodyParser = require('body-parser'); 
const mysql = require('mysql2/promise');
const app = express();
const port = 8000;
app.use(bodyParser.json());

let users = [];
let counter = 1;

let conn =null
const initDBConnection = async () => {
     conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    })
}

app.get('/users/:id', async (req, res) => {
   

    try {
        let id = req.params.id;
        const [results] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        if (results.length === 0) {
            throw { statusCode: 404, message: 'User not found'};
        }
        res.json(results[0]);
    } catch (error) {
        
        console.error('Error fetching user:', error.message); 
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({ 
            message: 'Error fetching user', 
            error: error.message 
        });
    }
});



/*
app.get('/users', (req, res) => {
    res.json(users);
});
*/
app.post('/users',  async (req, res) => {
    try {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user);
        console.log('results:', results);
        res.json({
            message: 'User added successfully',
            data:results[0]
    })
    }catch (error) {
        console.error("Database Error:", error); 
        res.status(500).json({ 
            message: 'Error creating user', 
            error: error.message 
    });
    }
});

app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;
    let seletedIndex = users.findIndex(user => user.id == id);
    
    if (updatedUser.name) {
        users[seletedIndex].name = updatedUser.name;
    }
    if (updatedUser.email) {
        users[seletedIndex].email = updatedUser.email;
    }
   
    
    res.json({message: 'User updated successfully',data:{updatedUser: updatedUser, indexUpdated: seletedIndex}});
});

 app.delete('/users/:id', async (req, res) => {
    try {
    let id = req.params.id;
    const results = await conn.query('DELETE FROM users WHERE id = ?', [id]);
    if (results[0].affectedRows === 0) {
        throw { statusCode: 404, message: 'User not found' };
    }

    
    res.json({message: 'User deleted successfully'});
 } catch (error) {
    console.error('Error deleting user:', error.message);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({ 
        message: 'Error deleting user', 
        error: error.message 
     });
    }
 });


 app.listen(port, async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`)});

app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedUser = req.body; // ข้อมูลที่ส่งมาจาก Postman เช่น { "name": "ใหม่", "email": "new@mail.com" }

        // 1. ใช้ UPDATE และส่ง [ข้อมูลใหม่, id] ไปที่ SQL
        const [results] = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id]);

        // 2. เช็คว่ามีแถวไหนถูกแก้ไขไหม (ถ้า id ไม่มีจริง affectedRows จะเป็น 0)
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ 
            message: 'Error updating user', 
            error: error.message 
        });
    }
});