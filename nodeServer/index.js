//node server for socket.io

const io = require('socket.io')(6000)
const users = {}

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('recived', {message: message, name: users[socket.id]})
    });
})
