const express = require ("express");

const fs = require('fs');

const bodyParser = require ('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

var userName;
var textMessage;

app.get('/login' , (req,res, next) => {
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST"><input type="text" id="username" name="username" placeholder="Enter Username"><button type="submit"> Send </button></form>');
})



app.post('/' , (req,res, next) => {
    userName=req.body.username;
    console.log(req.body);
    res.send('<form action="/messages" onsubmit = "document.getElementById("username").value = localStorage.getItem(`username`)" method="POST"><input type="text" name="Message" placeholder="Enter Your Message"><input type="hidden" id="username" name="title" placeholder="Enter Username"><button type="submit"> Send </button></form>');
})

app.post('/messages' , (req,res, next) => {
    textMessage = req.body.Message;
    fs.appendFileSync('data.txt' , `{${userName} :==> ${textMessage}}`);
    console.log(userName, ':', textMessage);
    // data.push(`{${userName} :==> ${textMessage}}`);
    var text = fs.readFileSync('data.txt' , 'utf8');
    console.log(text);
    res.redirect('/');
})

app.listen(3000);
