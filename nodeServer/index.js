//node server for socket.io

const io = require('socket.io')(8000, {cors: {origin: "*"}});
const users = {}

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        // console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('recived', {message: message, name: users[socket.id]})
    });
})
