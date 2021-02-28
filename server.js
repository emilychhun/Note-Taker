let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');
let todos = require('./src/todo');
let uuid = require('uuid');

let PORT = process.env.PORT || 8000;

let Todo =require('./src/todo');
const e = require('express');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname +'/assets'))

//git all todos
app.get('/todos/api', (req, res) =>{
    res.json(todos);});
 


//set static folder
app.use(express.static(path.join(__dirname, 'assets' )));

//get single Member
app.get('/todos/api/:id', (req, res) => {
res.json(todos.filter(todo => todo.id === parseInt(req.params.id)));
if (found) {
    res.json(todos.filter(todo => todo.id === parseInt(req.params.id)));
}else{
    res.status(400).json({ msg: `No member with the id of ${req.params.id}`});

}
});


//Create Member
app.post('/todos/api', (req, res) =>{
    let newNote ={
        id:uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newNote.name || !newNote.email){
       return res.status(400).json({ msg:'please include a name and email'});
    }
    todos.push(newNote);
    res.json(todos);

});

//update Member


app.put('/todos/api/:id', (req, res) => {
 let found = todos.some(todo => todo.id === parseInt(req.params.id));

 if (found) {
    let updateNote = req.body;
    todos.forEach(todo => {
        if(todo.id === parseInt(req.params.id)){
            todo.name = updateNote.name ? updateNote.name : todo.name;
            todo.email = updateNote.email ? updateNote.email : todo.email;
            res.json ({msg: 'Member updated', todo});
        }
     });
  } else {
       res.status(400).json({msg:`No member with the id of ${req.params.id}`});
}
});


//Delete Member
app.delete('/todos/api/:id', (req, res) => {
    let found = todos.some(todo => todo.id === parseInt(req.params.id));
    
    if (found) {
        res.json({
            msg: 'Note deleted', 
            todos: todos.filter(todo => todo.id !== parseInt(req.params.id))
    });
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    
    }
    });


app.listen(PORT, () =>
    console.log('Server started on port ${PORT}')
);






