// import UserList from './UserList';
// import RightSidebar from './RightSidebar';
// import React, { useState, useEffect } from 'react';

// const ChatLayout =() =>  {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [loggedInUserId, setLoggedInUserId] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser && storedUser.id) {
//       setLoggedInUserId(storedUser.id);
//     }
//   }, []);
//   return (
//     <div className="flex h-screen bg-black text-white">
//       <UserList onSelect={setSelectedUser} />
//       <div className="flex-1 flex items-center justify-center">
//         {!selectedUser ? (
//           <h2>Welcome {loggedInUserId} </h2>
          
//         ) : (
//           <RightSidebar user={selectedUser} currentUserId={loggedInUserId} />
//         )}
//       </div>
      
//     </div>
//   );
// };

// export default ChatLayout;


import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import RightSidebar from "./RightSidebar";
import socket from "/src/socket";

export default function ChatLayout() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    socket.on("users", list => setUsers(list));
    socket.on("user-connected", u =>
      setUsers(prev => [...prev, u])
    );
    socket.on("user-disconnected", ({ userId }) =>
      setUsers(prev => prev.filter(u => u.userId !== userId))
    );
    return () => socket.offAny();
  }, []);

  const handleSelect = u => setSelected(u);

  return (
    <div className="flex h-screen bg-black text-white">
    
      <UserList users={users} onSelect={handleSelect} selectedUser={selected} />
      <RightSidebar selectedUser={selected} />
    </div>
  );
}
