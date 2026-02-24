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

app.get('/users', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0]);
    } catch (error) {
        
        console.error("Database Error:", error); 
        
        res.status(500).json({ 
            message: 'เกิดข้อผิดพลาดฝั่งเซิร์ฟเวอร์', 
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
    let user = req.body;
    const results = await conn.query('INSERT INTO users SET ?', user);
    console.log('results:', results);
    res.json({
        message: 'User added successfully',
        data:results[0]
    })
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

 app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let seletedIndex = users.findIndex(user => user.id == id);

    users.splice(seletedIndex, 1);
    res.json({message: 'User deleted successfully', data:{indexDeleted: seletedIndex}});
 });

app.listen(port, async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`)});

