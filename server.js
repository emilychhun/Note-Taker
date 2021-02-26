let express = require('express');
let path = require('path');
let fs = require('fs');
let util = require('util');
const { prototype } = require('events');

let readFileAsync = util.promisify(fs.readFile);
let writeFileAsync = util.promisify(fs,writeFile);
let app = express();
let PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(expres.static("./public"));

app.get('/api/notes', (req, res) => {
res.sendFile(path.join(__dirname, "/db/db.json"))
});
app.post('/api/notes', (req, res) => {
    let notes = JSon.parse(fs.readFileSync('.db/db.json'));
    let newNotes = req.body;
    newNotes.id =util.v4();
    notes.push(newNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes);
});

app.delete("api/notes/:id", (req, res) =>{
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(delNote));
    res.json(delNote);
})

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));

});

app.get('notes', function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.listen(PORT, function(){
    console.log('App listening on PORT: ' + PORT);
});
app.listen(process.env.PORT || prototype, () => console.log('Example app listening at http://localhost:${port}'));