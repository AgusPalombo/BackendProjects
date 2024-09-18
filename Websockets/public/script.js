console.log('Script cargado correctamente');
const socket = io(); // Conectar al servidor Socket.IO

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesList = document.getElementById('messages');

// Escuchar el clic del botón de enviar
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chatMessage', message); // Enviar el mensaje al servidor
        messageInput.value = ''; // Limpiar el campo de texto
    }
});

// Escuchar los mensajes recibidos del servidor
socket.on('chatMessage', (msg) => {
    const newMessage = document.createElement('li');
    newMessage.textContent = msg;
    messagesList.appendChild(newMessage); // Añadir el mensaje a la lista
});
