const socket = io('http://localhost:8000');

const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".main");
var notifi = new Audio('Notification.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);   
    if(position == 'left'){
        notifi.play();
    } 
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right'); 
    socket.emit('send', message);
    messageInput.value = '';   
})

const username = prompt("Enter your name and start Chating Here");
socket.emit('new-user-joined', username);

socket.on('user-joined', user=>{
    append(`${user} has joined the chat`, 'left');
})
socket.on('recived', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})
socket.on('left', data =>{
    append(`${data} has left the chat`, 'left');
})

