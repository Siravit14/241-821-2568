const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
const mysql = require(`mysql2/promise`);
const port = 8000;
const cors = require('cors');

app.use(cors());

let conn = null;
const initDBconnection = async () => {
     const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8821  
});
    conn = connection;
}

app.use(bodyParser.json());

// path GET /users/:id สำหรับ get ข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id);

        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }

        res.json(results[0][0]);

    } catch (error) {
        console.error('Error fetching user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
});

// path GET /users สำหรับ get ข้อมูล user ทั้งหมดที่มีในฐานข้อมูล
app.get('/users', async (req, res) => {
    try {
        // ดึงข้อมูลทุกแถวจากตาราง users
        const results = await conn.query('SELECT * FROM users');
        
        // results[0] คือ Array ของข้อมูลทั้งหมด (Rows)
        res.json(results[0]);

    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message
        });
    }
});

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) {
        errors.push('First name is required');
    }
    if (!userData.lastName) {
        errors.push('Last name is required');
    }
    if (!userData.gender) {
        errors.push('Gender is required');
    }
    if (!userData.age) {
        errors.push('Age is required');
    }
    if (!userData.description) {
        errors.push('Description is required');
    }
    if (!userData.interests) {
        errors.push('At least one interest is required');
    }
    return errors;
}

app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0) {
            throw {
                message: 'กรอกข้อมูลไม่ครบถ้วน',
                errors: errors
            }
        }
        console.log("BODY:", user);

        const [result] = await conn.query(
            "INSERT INTO users SET ?",
            user
        );

        console.log("result", result);

        res.json({
            message: "User created successfully",
            data: result
        });

    } catch (err) {
        const errorMessage = err.message || 'Error creating user';
        const errors = err.errors || [];
        console.error("ERROR:", errorMessage, errors);
        
        res.status(500).json({
            error: "Insert failed",
            detail: err.message
        });
    }
});

// path GET /users/:id สำหรับ get ข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id);

        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }

        res.json(results[0][0]);

    } catch (error) {
        console.error('Error fetching user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
});

// PUT /users/:id สำหรับแก้ไขข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedUser = req.body;

        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id]);

        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }

        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        console.error('Error updating user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error updating user',
            error: error.message
        });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedUser = req.body;

        const results = await conn.query('DELETE FROM users WHERE id = ?', id);

        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }

        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        console.error('Error updating user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error updating user',
            error: error.message
        });
    }
});

app.listen(port, async () => {
    await initDBconnection();
    console.log(`Server running on port ${port}`);
});