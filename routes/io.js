const ioConnect = function(io) {
    return io.on('connection', function(socket) {
        socket.emit('connected', {foo: 'bar'});
    });
}

module.exports = ioConnect;