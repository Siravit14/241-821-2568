const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

const port = 8000;

app.use(bodyParser.json());
let users = [];
let counter = 1;

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter++;
    users.push(user);
    res.json({message: 'User added successfully', user: user});
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)});

