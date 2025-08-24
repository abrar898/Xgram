// import React, { useState } from 'react';

// const RightSidebar = ({ user }) => {
//   const [message, setMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]); // Stores messages

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     // Add message to chat history
//     setChatHistory(prev => [...prev, { sender: 'You', text: message }]);

//     // You can also send it to the backend here with fetch or axios
//     console.log(`Sending message to ${user.username}:`, message);

//     setMessage('');
//   };

//   if (!user) return null;

//   return (
//     <div className="bg-gray-800 text-white p-4 w-full h-full flex flex-col">
//       <h3 className="text-xl mb-4">Chat with {user.username}</h3>

//       {/* Message display */}
//       <div className="flex-1 overflow-y-auto mb-4 bg-gray-700 p-2 rounded">
//         {chatHistory.map((message, index) => (
//           <div key={index} className="mb-1">
//             <strong>{message.sender}:</strong> {message.text}
//           </div>
//         ))}
//       </div>

//       {/* Input and send button */}
//       <div className=" flex flex-row">
//         <input
//           type="text"
//           placeholder="Type a message"
//           className="w-[90%] px-3 py-2  rounded bg-gray-700 text-white"
//           value={message}
//           onChange={e => setMessage(e.target.value)}
//         />
//         <button
//           onClick={sendMessage}
//           className=" bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-[10%]"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RightSidebar;



// import React, { useState, useEffect } from 'react';
// import socket from '/src/socket'; // adjust pathclient\src\socket.js

// const RightSidebar = ({ user, currentUserId }) => {
//   const [message, setMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);

  
// useEffect(() => {
//   if (currentUserId) {
//     socket.emit('join', currentUserId);
//     console.log(`Joined room: ${currentUserId}`);
//   }

//   const handlePrivateMessage = (msg) => {
//     if (msg.sender === currentUserId && msg.receiver === user) {
//       setChatHistory((prev) => [...prev, {
//         sender: msg.sender === currentUserId ? 'You' : user.username,
//         text: msg.content,
//       }]);
//     }
//   };

//   socket.on('private-message', handlePrivateMessage);

//   return () => {
//     socket.off('private-message', handlePrivateMessage);
//   };
// }, [user, currentUserId]);


//   const sendMessage = () => {
//     if (!message.trim()) return;

//     // Update UI
//     setChatHistory((prev) => [...prev, { sender: 'You', text: message }]);

//     // Send via socket
//     socket.emit('private-message', {
//       senderId: currentUserId,
//       receiverId: user,
//       content: message,
//     });

//     setMessage('');
//   };

//   if (!user) return null;

//   return (
//     <div className="bg-gray-800 text-white p-4 w-full h-full flex flex-col">
//       <h3 className="text-xl mb-4">Chat with {user.username}</h3>

//       <div className="flex-1 overflow-y-auto mb-4 bg-gray-700 p-2 rounded">
//         {chatHistory.map((message, index) => (
//           <div key={index} className="mb-1">
//             <strong>{message.receiver}:</strong> {message.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-row">
//         <input
//           type="text"
//           placeholder="Type a message"
//           className="w-[90%] px-3 py-2 rounded bg-gray-700 text-white"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-[10%]"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RightSidebar;
import React, { useEffect, useState } from "react";
import socket from "/src/socket";

export default function RightSidebar({ selectedUser }) {
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const handlePm = msg => {
      if (msg.from === selectedUser.userId || msg.to === selectedUser.userId) {
        setChat(prev => [
          ...prev,
          {
            from: msg.from === socket.auth.userId ? "You" : selectedUser.username,
            content: msg.content
          }
        ]);
      }
    };
    socket.on("private-message", handlePm);
    return () => socket.off("private-message", handlePm);
  }, [selectedUser]);

  const send = () => {
    if (!text || !selectedUser) return;
    setChat(prev => [...prev, { from: "You", content: text }]);
    socket.emit("private-message", {
      to: selectedUser.userId,
      content: text
    });
    setText("");
  };

  if (!selectedUser) return <div>Select a user</div>;

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-800">
      <h2>welcome{selectedUser.username}</h2>
      <div className="flex-1 overflow-auto mb-2">
        
        {chat.map((m, i) => (
          <div key={i}><strong>{m.from}:</strong> {m.content}</div>
        ))}
      </div>
      <div className="flex">
        <input className="flex-1 p-2 text-black" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={send} className="px-4 bg-blue-600 ml-2">Send</button>
      </div>
    </div>
  );
}
