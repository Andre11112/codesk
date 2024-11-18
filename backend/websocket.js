const { Server } = require('socket.io');

function setupWebSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // URL de tu frontend
            methods: ["GET", "POST"]
        }
    });

    // Almacenar las conexiones activas
    const activeConnections = new Map();

    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);

        // Manejar cuando un usuario se une a un chat
        socket.on('joinChat', ({ userId, chatId }) => {
            socket.join(`chat_${chatId}`);
            activeConnections.set(userId, socket.id);
            console.log(`Usuario ${userId} se unió al chat ${chatId}`);
        });

        // Manejar mensajes nuevos
        socket.on('newMessage', async (messageData) => {
            try {
                // Emitir el mensaje a todos los participantes del chat
                io.to(`chat_${messageData.chat_id}`).emit('messageReceived', messageData);
            } catch (error) {
                console.error('Error al procesar mensaje:', error);
                socket.emit('messageError', { error: 'Error al enviar mensaje' });
            }
        });

        // Manejar desconexiones
        socket.on('disconnect', () => {
            // Eliminar la conexión cuando el usuario se desconecte
            for (const [userId, socketId] of activeConnections.entries()) {
                if (socketId === socket.id) {
                    activeConnections.delete(userId);
                    break;
                }
            }
            console.log('Cliente desconectado:', socket.id);
        });
    });

    return io;
}

module.exports = setupWebSocket;
