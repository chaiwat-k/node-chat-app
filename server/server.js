const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
});

// server.lister instead of app.listen
server.listen(port, () => {
    console.log('Server is up on port: '+port);
});