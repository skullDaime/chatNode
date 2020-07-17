var socket = io('http://localhost:3000');

function renderMessage(message){
    $('.messages').append(
        '<div class="message"><p style="color:#FFCC00;">Data:'+message.date+'<br>Hora:'+message.hour+':'+message.minute+':'+message.second+'</p><br><strong>'+message.author+': </strong>' + message.message+'</div><br>');
}

function renderClientId(socket){
    $('.loguser').append(
        '<div class="message>'+ socket.id +'</div>'
    );
}

socket.on('previousMessages', function(messages){
    for(message in messages){
        renderMessage(message);
    }
});

socket.on('connectedClient', function(socket){
    renderClientId(socket);
});

socket.on('receivedMessage', function(message){
    renderMessage(message);
});

    $('#chat').submit(function(event){
        event.preventDefault();

        var author = $('input[name=username]').val();
        var message = $('input[name=message]').val();
        var date = new Date();
        var sdate = date.toLocaleDateString();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        if(author.length && message.length){

            var messageObject = {
                author : author,
                message : message,
                date : sdate,
                hour: hour, 
                minute: minute,
                second: second,
            };

        renderMessage(messageObject);
        socket.emit('sendMessage', messageObject);
    }
});