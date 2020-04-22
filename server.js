const express = require("express");
const path = require("path");
const util = require("util");
var fs = require("fs");
var db = require("./db.json");
const app = express();
// we need to add this for heroku => process.env.PORT || <port number>;
var PORT = process.env.PORT|| 3000;
// this will look at the header and decide which of the two it should be: 
// this will cause the message to be automatically be parsed by the server:
app.use(express.urlencoded({ extended: true }));
// this will send the message back as a formatted json object
app.use(express.json());

//This will cause index.html page to be displayed in the browser: 
app.get("/", function(req, res) {
    res.sendFile(path.resolve('.')+"/index.html");
});

//This will allow the style sheet to be loaded into the browser: 
app.get("/styles.css", function(req, res) {
    res.sendFile(path.resolve('.')+"/styles.css");
});

//This will allow the script to be used on the web pages to be loaded into the browser: 
app.get("/index.js", function(req, res) {
    res.sendFile(path.resolve('.')+"/index.js");
});

//This will display the notes.html file in the browser
app.get("/notes", function(req, res) {
    res.sendFile(path.resolve('.')+"/notes.html");
});

app.get("/api/notes", function(req, res) {
    res.json(db);
});

// This will update the db.json file:  
app.post("/api/notes", function(req, res) {
     req.body.id=db.length;
     db.push(req.body);
     db = renumId(db);
     fs.writeFileSync(path.resolve('.')+"/db.json", JSON.stringify(db));
     res.json(db);  
});

app.delete("/api/notes/:id", function(req, res){
    db.splice(req.params.id,1);
    db = renumId(db);
    fs.writeFileSync(path.resolve('.')+"/db.json", JSON.stringify(db));
    res.json(db);
}); 

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log(`App listening on port: ${PORT}`);
});

function renumId(db) {

  for (var i = 0; i < db.length; i++)
  {
    db[i].id = i;
  }
  
  return db;
};
