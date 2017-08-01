export const registerDebateUpdater = (socket, updateDebate) => {
    socket.on('updates:debates', (data) => {
        console.log("debate update received");
        updateDebate(data._id);
    });
};