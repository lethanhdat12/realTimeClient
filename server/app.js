const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const userRoute = require("./routers/user");
const messageRouter = require("./routers/message");
const app = express();
const conversation = require("./models/conversasion")

const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

app.use(cors());
http 
socketio
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/", userRoute);
app.use("/message", messageRouter);


io.on("connection", (socket) => {
    console.log('co nguoi ket noi');
    socket.on("disconnect", () => {
      io.emit("user-leave", "Bạn ấy đã rời cuộc trò truyện");
    });


    socket.on('create_conversation', currentUser => {
      const conversation = new ConversationModel({
        idUser: currentUser._id,
        nameConversation: currentUser.fullname,
      });
      conversation.save().then(data => {
        socket.join(String(data._id));
        socket.emit('response_room', data);
      });
    })
  });

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
