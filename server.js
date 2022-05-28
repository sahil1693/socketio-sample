const fs = require('fs');
const demoModule = require('./my-module-demo');
const lodash = require("lodash");
const express = require("express");
const app = express();
const bodyparse = require("body-parser");
var http = require('http').Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");
var Message = mongoose.model('Message',{
    name:String,
    message:String
})
//const data = fs.readdirSync("C:/");

// console.log(data);
// console.log('The after');
/*above is sync call */
//fs.readdir("C:/", (err, data)=>{console.log(data);}); //Async call due to callbacks
app.use(express.static(__dirname));
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({extended:false}));
var dburl = "mongodb+srv://socketiobackend:socketiobackend@cluster0.ckedpyc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dburl, (err)=>{
    console.log('mongodb connection'+err);
})
const server = http.listen(5000, ()=>{console.log("server started at port number "+server.address().port)});
app.get('/messages',(req,res)=>{
    Message.find({}, (err, message)=>{
        res.send(message);
    })
})
app.post('/messages',(req,res)=>{
    //console.log(req.body);
    var message = new Message(req.body);
    message.save((err)=>{
        if(err)
            res.sendStatus(500);
        res.sendStatus(200);
        io.emit('message',req.body);
    })
})
io.on('connection',(socket)=>{
    console.log('a user connected');
})
// console.log('The After');
// console.log(demoModule.module);
// console.log(lodash.random(1, 100));

//utf-8 tell us the encoding format of the string in the json file.
// fs.readFile('./package.json','utf-8',(err, data)=>{
//     data = JSON.parse(data);
//     console.log(data.dependencies);

// })
//another way of reading a file
//start
const data  = require('./package.json');
const { append } = require('express/lib/response');
const { dirname } = require('path');
const urlencoded = require('body-parser/lib/types/urlencoded');
const { Socket } = require('socket.io');
console.log(data.dependencies);
//end
//reading a directory
//start
// fs.readdir('C:/',(err, data)=>{

//     console.log(data);
// })

//end

//writing a file
//start
// fs.writeFile("demo.json",JSON.stringify({name:"sahil"}),(err)=>{
// } )
//end