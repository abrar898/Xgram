import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ onSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:4000/api/users')
    .then(res => {
      console.log("Fetched users:", res.data);
      setUsers(res.data);
    })
    .catch(err => console.error("Error fetching users:", err));
}, []);
// useEffect(() => {
//   setUsers([
//     { _id: '1', username: 'testuser1' },
//     { _id: '2', username: 'testuser2' },
//   ]);
// }, []);


  return (
    <div className="bg-gray-900 text-white p-4 w-64">
      <h3 className="text-lg font-semibold mb-4">Users</h3>
      <ul>
        {users.map(user => (
          <li
            key={user._id}
            onClick={() => onSelect(user)}
            className="p-2 hover:bg-gray-700 cursor-pointer rounded"
          >
          <p className='text-white'>  {user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
