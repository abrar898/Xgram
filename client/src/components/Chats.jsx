// // Chats.jsx
// import { useEffect, useState } from 'react';
// import socket from '../socket';

// export default function Chats() {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);

//   useEffect(() => {
//     socket.on('chat-message', (msg) => {
//       setChat((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off('chat-message'); // Cleanup
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//     setChat((prev) => [...prev, `You: ${message}`]);
//       socket.emit('chat-message', { text: message, sender: socket.id });
//       setMessage('');
//     }
//   };


//   return (
//     <div className="p-4 text-white bg-gray-900 min-h-screen">
//       <h1 className="text-2xl mb-4">Socket.IO Chat</h1>
//       <div className="space-y-2 mb-4">
//         {chat.map((msg, index) => (
//           <div key={index} className="bg-gray-800 p-2 rounded">
//                 <strong>{msg.sender}:</strong> {msg.text}
//           </div>                                                                                                                                                                                                                                                                                                                                                    
//         ))}
//       </div>
//       <input
//         type="text"
//         className="px-4 py-2 rounded bg-gray-700 text-white w-64 mr-2"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button
//         className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//         onClick={sendMessage}
//       >
//         Send
//       </button>
//     </div>
//   );
// }

// Chats.jsx
// import { useEffect, useState } from 'react';
// import socket from '../socket'; // Assumes socket is initialized correctly

// export default function Chats() {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const [receiverId, setReceiverId] = useState(''); // For private messaging
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     // Register client with server
//     socket.on('connect', () => {
//       setUserId(socket.id);
//       socket.emit('register', socket.id); // Optionally use user ID instead
//     });

//     // Receive a message
//     socket.on('receive-message', ({ sender, text }) => {
//       setChat((prev) => [...prev, { sender, text }]);
//     });

//     return () => {
//       socket.off('receive-message');
//       socket.off('connect');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     // Emit message to a specific client
//     socket.emit('private-message', {
//       to: receiverId,
//       sender: socket.id,
//       text: message,
//     });

//     // Show your message locally
//     setChat((prev) => [...prev, { sender: 'You', text: message }]);
//     setMessage('');
//   };

//   return (
//     <div className="p-4 text-white bg-gray-900 min-h-screen">
//       <h1 className="text-2xl mb-4">Private Chat</h1>

//       <div className="mb-4">
//         <input
//           type="text"
//           className="px-3 py-2 bg-gray-700 rounded mr-2"
//           placeholder="Receiver socket ID"
//           value={receiverId}
//           onChange={(e) => setReceiverId(e.target.value)}
//         />
//       </div>

//       <div className="space-y-2 mb-4">
//         {chat.map((msg, index) => (
//           <div key={index} className="bg-gray-800 p-2 rounded">
//             <strong>{msg.sender}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>

//       <div>
//         <input
//           type="text"
//           className="px-4 py-2 rounded bg-gray-700 text-white w-64 mr-2"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }



// ChatPage.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:5000", {
  autoConnect: false
});

socket.onAny((ev, ...args) => console.log("[socket]", ev, args));

const Chats = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit('join', currentUserId);

    axios.get('/api/users').then((res) => {
      setUsers(res.data.filter(user => user._id !== currentUserId));
    });

    socket.on('private-message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('private-message', {
      senderId: currentUserId,
      receiverId: selectedUserId,
      content: message,
    });
    setChat((prev) => [...prev, { sender: currentUserId, receiver: selectedUserId, content: message }]);
    setMessage('');
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
        <h4>Users</h4>
        {users.map((user) => (
          <div key={user._id} onClick={() => setSelectedUserId(user._id)}>
            {user.username}
          </div>
        ))}
      </div>

      <div style={{ padding: 20 }}>
        <h4>Chat</h4>
        <div style={{ height: 300, overflowY: 'scroll', border: '1px solid #000' }}>
          {chat
            .filter(m => (m.sender === currentUserId && m.receiver === selectedUserId) ||
                         (m.sender === selectedUserId && m.receiver === currentUserId))
            .map((m, i) => (
              <div key={i}>
                <b>{m.sender === currentUserId && m.receiver === selectedUserId ? 'You' : 'Them'}:</b> {m.content}
              </div>
          ))}
        </div>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chats;
