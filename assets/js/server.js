const express = require("express");
const path = require("path");
const util = require("util");
var fs = require("fs");
var db = require("../../db/db.json");



const app = express();
// we need to add this for heroku => process.env.PORT || <port number>;
var PORT = process.env.PORT|| 8080;
// this will look at the header and decide which of the two it should be: 
// this will automatically be parsed by the server
app.use(express.urlencoded({ extended: true }));
// this will be formatted in a json object
app.use(express.json());
//app.use(express.static("public"));

//This will cause index.html page to be displayed in the browser: 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname,"../../index.html"));
});

app.get("/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname,"../css/styles.css"));
});

app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname,"index.js"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"../../notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.json(db);
});

// This will update the db.json file:  
app.post("/api/notes", function(req, res) {
     req.body.id=db.length;
     db.push(req.body);
     console.log("We are in the following directory: " + __dirname);
     fs.writeFileSync("test.json", JSON.stringify(db));
     res.json(db);  
     
});

app.delete("/api/notes/:id", function(req, res){
    db.splice(req.params.id,1);
    fs.writeFileSync("db.json", JSON.stringify(db));
    res.json(db);
  }); 

// app.get("/api/waitList", function(req, res) {
//     res.json(waitList);
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log(`App listening on port: ${PORT}`);
  });

function updateJSONfile(db) 
{
   console.log(__dirname); 
   fs.readFile(path.join(__dirname,"../../db/db.json"), 'utf8', function readFileCallback(err, data)
   {
      if (err)
      {
        console.log(err);
      } 
      else 
      {
        var obj = JSON.parse(data); //now it an object
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('test.json', json, function(err){
            if(err) throw err; }); // write it back 
      }
   });
};