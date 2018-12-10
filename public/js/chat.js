var socket = io();

function scrollToBottom(){
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        //console.log('Should scroll');
        messages.scrollTop(scrollHeight);
    }
}

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
    var fmtTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from:message.from,
        text:message.text,
        createdAt: fmtTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${fmtTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var fmtTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: message.createdAt,
        url: message.url
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank"> My Current Location</a>');
    // li.text(`${message.from} ${fmtTime}`);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

var messageTextbox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val(),
        createdAt: moment().valueOf()
    }, function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled','disabled');
    locationButton.text('Sending location...');
    navigator.geolocation.getCurrentPosition(
    function(position){
        locationButton.removeAttr('disabled');
        locationButton.text('Sending location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, 
    function(){
        //alert('Unable to get location!');
        locationButton.removeAttr('disabled');
        locationButton.text('Sending location');
    });
});