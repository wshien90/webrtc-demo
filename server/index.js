const io = require('socket.io')(3000);
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('NGUOI_DUNG_DANG_KY', username => {
        console.log(username);
    });
});