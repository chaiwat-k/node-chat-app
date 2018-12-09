const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));

// Need to go this way to incorporate socket.io
var server = http.createServer(app);
var io = socketIO(server);

// Listen to onconnection
io.on('connection', (socket) => {
    console.log('New user connection');
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    // socket.broadcast.emit from Admin text New user joined    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    // Listen to clients
    socket.on('createMessage', (newMessage) => {
        var td = new Date();
        newMessage.createAt = td.getTime();
        console.log('createEmail', newMessage);

        // io.emit send event to every connection
        io.emit('newMessage', 
        generateMessage(newMessage.from,newMessage.text));

        // broadcast to everyone else
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createAt: td.getTime()
        // });
    });

    // List to ondisconnect
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

// server.lister instead of app.listen
server.listen(port, () => {
    console.log('Server is up on port: '+port);
});