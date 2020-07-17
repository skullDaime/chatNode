const express = require('express');
const path = require('path');
const { renderFile } = require('ejs');
const { Script } = require('vm');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 3000;
const hostname = '127.0.0.1'; 

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>{
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {

    //lista de clients
    console.log('Socket conectado:'+ socket.id);
    socket.broadcast.emit('connectedClient', socket);

    //

    //menssages
    socket.emit('previousMessages', messages);
    socket.on('sendMessage', data =>{
        console.log(data);
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});



server.listen(3000);