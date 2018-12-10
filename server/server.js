const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));

// Need to go this way to incorporate socket.io
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

// Listen to onconnection
io.on('connection', (socket) => {
    
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room are required.');
            return;
        }
        //console.log(params);
        socket.join(params.room); //Join a room
        //socket.leave('a room'); // Leave a room
        // io.emit -> emit to everyone connected
        // socket.broadcast.emit -> emit to everyone except sender
        // socket.emit emit to one user
        // io.to('room').emit -> to everyone in the room
        // socket.broadcast.to('room').emit
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        // Send updated users list to everyone in the room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.name+' has joined'));
        callback();
    });

    // Listen to clients
    socket.on('createMessage', (newMessage, callback) => {
        if(!isRealString(newMessage.text)){
            callback('Empty text');
            return;
        }
        var user = users.getUser(socket.id);
        if(!user){
            callback('Cannot find user');
            return;
        }
        io.to(user.room).emit('newMessage', 
        generateMessage(user.name,newMessage.text));            
        callback();
    });

    socket.on('createLocationMessage', (coors) => {
        if(!coors.latitude || !coors.longitude) return;
        var user = users.getUser(socket.id);
        if(!user) return;
        io.to(user.room).emit('newLocationMessage', 
        generateLocationMessage(user.name,
            coors.latitude,coors.longitude));
    });

    // List to ondisconnect
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', 
            generateMessage('Admin', `${user.name} has left the room`));
        }
    });
});

// server.lister instead of app.listen
server.listen(port, () => {
    console.log('Server is up on port: '+port);
});