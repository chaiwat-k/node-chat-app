var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
}); 

// function createMsg(){
//     socket.emit('createMessage', {
//         from: 'jen@exampl.com',
//         text: 'Hey, this is Andrew'
//     });    
// }

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

// Custom Event
socket.on('newMessage', function(message){
    console.log('New message', message);
});