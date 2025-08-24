// const Message = require('../models/Message');

// const socketHandler = (io) => {
//   io.on('connection', (socket) => {
//     console.log('User connected');

//     socket.on('chat-message', async ({ userId, content }) => {
//       const newMessage = new Message({ sender: userId, content });
//       await newMessage.save();

//       // Emit to all clients
//       // io.emit('chat-message', { userId, content });
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });
// };

// module.exports = socketHandler;

const User = require("../models/User");
const Message = require("../models/Message");
// const socketHandler = (io) => {
  // io.on('connection', (socket) => {
  //   console.log('User connected:', socket.id);

  //   socket.on('join', (userId) => {
  //     socket.join(userId); // Use user ID as room name
  //     console.log(`User ${userId} joined room ${userId}`);
  //   });
  // //   socket.on("message", ({ room, message }) => {
  // //   console.log({ room, message });
  // //   socket.to(room).emit("receive-message", message);
  // //   });
  // //   socket.on("join-room", (room) => {
  // //   socket.join(room);
  // //   console.log(`User joined room ${room}`);
  // // });

  //   socket.on('private-message', async ({ senderId, receiverId, content }) => {
  //     const message = await Message.create({ sender: senderId, receiver: receiverId, content });

  //     // Send message only to the target user (room)
  //     socket.to(receiverId).emit('private-message', message);
  //     console.log(`Message sent from ${senderId} to room ${receiverId}`);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('User disconnected:', socket.id);
  //   });
  // });
  
// ① Middleware to authorise socket connection with stored userId
// io.use((socket, next) => {
//   const { userId } = socket.handshake.auth || {};
//   if (!userId) return next(new Error("invalid user token"));
//   socket.userId = userId;
//   return next();
// });

// // ② On connection
// io.on("connection", async (socket) => {
//   console.log("Socket connected", socket.id, "– userId:", socket.userId);

//   // Autogroup for private messages: each socket joins room = userId
//   socket.join(socket.userId);

//   // Emit the current user list (socket.id and username)
//   const connected = [];
//   for (const [sid, s] of io.of("/").sockets) {
//     connected.push({
//       userId: s.userId,
//       username: s.username || (await User.findById(s.userId).then(u => u.username)),
//       socketId: sid,
//     });
//   }
//   socket.emit("users", connected);

//   socket.broadcast.emit("user-connected", {
//     userId: socket.userId,
//     username: connected.find(u => u.userId === socket.userId)?.username,
//   });

//   // Private message handler
//   socket.on("private-message", async ({ to, content }) => {
//     const saved = await Message.create({
//       sender: socket.userId,
//       receiver: to,
//       content,
//     });
//     io.to(to).emit("private-message", {
//       content: saved.content,
//       from: socket.userId,
//       messageId: saved._id,
//       timestamp: saved.createdAt,
//     });
//     console.log(`Message ${saved._id} from ${socket.userId} → user-room {${to}}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.userId, "socket:", socket.id);
//     socket.broadcast.emit("user-disconnected", { userId: socket.userId });
//   });
// });
// };

// module.exports = socketHandler;


const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (userId) => {
      socket.join(userId); // Use user ID as room name
      console.log(`User ${userId} joined room ${userId}`);
    });

    socket.on('private-message', async ({ senderId, receiverId, content }) => {
      const message = await Message.create({ sender: senderId, receiver: receiverId, content });

      // Send message only to the target user (room)
      socket.to(receiverId).emit('private-message', message);
      console.log(`Message sent from ${senderId} to room ${receiverId}`);

    socket.on("message", (data) => {
    console.log(data); 
    socket.broadcast.emit("receive-message",data);
  });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;
