// creates a server on port 3000, allows port 5500 to communicate with the server
const io = require("socket.io")(3000, { cors: { origin: 5500 } });
const users = {}; // object to store users

// everytime a client-side server connects to our api-server, send the message "hello world" to client
io.on("connection", (socket) => {
  //socket.emit("chat-message", "Hello World");
  socket.on("new-user", (userName) => {
    users[socket.id] = userName; // sets user's name to key of users object
    socket.broadcast.emit("user-connected", userName); // sends message with username included
  });

  socket.on("send-chat-message", (message) => {
    // sends chat message, including the user's name, to every client connected to server except user who sent message
    socket.broadcast.emit("chat-message", {
      message: message,
      userName: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]); // broadcast user has disconnected from chat
    delete users[socket.id]; // removes user from users array
  });
});
