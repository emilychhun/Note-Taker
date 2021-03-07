const express = require("express");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const app = express();
let PORT = process.env.PORT || 8000;
let httpMsgs = require("http-msgs");


//set Static Path
app.use(express.static('assets'));
//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", (req, res) =>{
    res.sendFile(path.join(__dirname, "assets", "notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "index.html"));
});

//get all notes

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//get single note
app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

//Create note

app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = uuid.v4();
    newNote.id = uniqueID;

     savedNotes.push(newNote);
     console.log(newNote); 
 
     fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
     console.log("Note saved to db.json. Content: ", newNote);
     res.json(savedNotes);
   //  httpMsge.send8000;
 })
  



//Delete note
app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;

    console.log(`Deleting note with ID ${noteID}`);
    
    savedNotes = savedNotes.filter(function(item) { 
        return item.id !== noteID;  
     });

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
      res.json(savedNotes);
})




app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)}
);




