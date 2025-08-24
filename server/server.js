// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const { Server } = require('socket.io');
// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 5000;
// const server = http.createServer(app);


// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Vite default
//     methods: ["GET", "POST"],
//   },
// });

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ Connected to MongoDB Atlas'))
// .catch((err) => console.error('❌ MongoDB connection error:', err));



// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('chat-message', ({ text, sender }) => {
//   io.emit('chat-message', { text, sender });
// console.log("Received message from ");


// });

//   // Receive message from client
// //   socket.on('chat-message', (message) => {
// //     console.log(`Received message from ${socket.id}:`, message);

// //     // Send message back to all clients (including sender)
// //     io.emit('chat-message', message);

// //     // OR: Send only to others (not to sender)
// //     // socket.broadcast.emit('chat-message', message);
// //   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// server.listen(PORT, () => {
//   console.log('Server running on port 5000');
// });
// const dotenv = require('dotenv');
// dotenv.config();

// const mongoose = require('mongoose');
// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // Setup Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// const users = {}; // Map userId => socket.id

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ Connected to MongoDB Atlas'))
// .catch((err) => console.error('❌ MongoDB connection error:', err));

// // Socket.IO logic
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('register', (userId) => {
//     users[userId] = socket.id;
//     console.log(`Registered user ${userId} with socket ID ${socket.id}`);
//   });

//   socket.on('private-message', ({ to, sender, text }) => {
//     const targetSocketId = users[to];
//     if (targetSocketId) {
//       io.to(targetSocketId).emit('receive-message', { sender, text });
//       console.log(`Message sent to ${to}:`, text);
//     } else {
//       console.log(`User ${to} not found`);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//     // Cleanup
//     for (const userId in users) {
//       if (users[userId] === socket.id) {
//         delete users[userId];
//         break;
//       }
//     }
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const app = express();
const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const socketHandler = require('./socket/socketHandler'); 
const authRoutes = require('./routes/auth');


const app = express();
const server = http.createServer(app);
const io =socketIo(server, {
    cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api',authRoutes);

// Socket Logic
socketHandler(io);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('MongoDB connection failed:', err));
