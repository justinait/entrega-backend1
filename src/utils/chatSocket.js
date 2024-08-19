export const chatSocket = (io) => {
    let messages = [];
    io.on('connection', socket => {
        console.log('nuevo cliente conectado');
        socket.on('message', data => {
            messages.push(data)
            io.emit('messageLogs', messages)
        })  
    })
}