var express = require('express');
var socket = require('socket.io');
var MongoClient=require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/chatRoom";
 MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
    var dbo = db.db("chatRoom"); 
    dbo.collection("dataChat", function(err,res){

        
     if (err) throw err;
     console.log(" creacted... ");
     db.close();
    });
 });

//app setup
var app = express();
// start server ด้วย port 4000
var server = app.listen(4000, function(){
    console.log('listening to requests on prt 4000');
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection', socket.id);

//Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat',data); //ส่งหา client ทั้งหมดรวมทั้งตัวเองด้วย
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing', data) //ส่งหา client ทุกคนยกเว้นตัวเอง
    });
});