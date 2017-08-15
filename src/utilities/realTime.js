export const registerSocketEventHandler = (socket, channel, handler, message = null) => {
    message = message || channel + " updated";

    socket.on(channel, (data) => {
        console.log(message);
        handler(data);
    });
};

