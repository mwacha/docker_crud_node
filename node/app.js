const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handleBars = require('express-handlebars'); 
const app = express();
const urlencodeParser=bodyParser.urlencoded({extended:false});

const connection = mysql.createConnection({ 
    host: 'db',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'persondb'
});

const port = 3000;

// Template engine
app.engine("handlebars", handleBars({defaultLayout:'main'}));
app.set('view engine','handlebars');

// Static files
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/img", express.static("img"));

app.get("/", function(req,res) {
     res.render('index');
   })
// Routes and templates
app.get("/:id?", function(req,res) {
    if (!req.params.id) {
        connection.query("select * from person order by person_name", function(err, results, fields){
          res.render("index", {data:results});
        });
    } else {
        connection.query("select * from person where id = ?", [req.params.id], function(err,results, fields){
          res.render("index", {data:results});
        });
    }  
  });

  /*app.get("/", function(req,res) {
    res.render("index");
});*/
app.get("/create", function(req,res) {
    res.render("create");
});

app.post("/createControllerForm", urlencodeParser, function (req,res) {
    connection.query("insert into person (person_name) values(?)", [req.body.name]);
    res.render('createControllerForm', {name:req.body.name});
});

app.get("/update/:id", urlencodeParser, function(req,res) {
    con.query("select * from person where id =?",[req.params.id], function(err, results, fields){
      res.render("update", {data:results});
    });  
  });
  
  app.put("/update/updateControllerForm", urlencodeParser, function(req,res) {
    con.query("update people set name = ? where id = ?", [req.body.name, req.body.id]);
    res.render("updateControllerForm");
  });

//start server
app.listen(port,() => {
    console.log('Run on port: ' + port);
});
