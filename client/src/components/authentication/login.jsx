import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import socket from '/src/socket';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
      });
    //    toast.success('✅ User has been logged in!');
      const user = res.data; // { userId, username }
      socket.auth = { userId: user.userId };
      await socket.connect();
      toast.success("Logged in as " + user.username);
      navigate("/users");
    } catch {
      toast.error("Invalid credentials");
    }
  
    //   console.log("Login Response:", res.data);// pass user data to parent
    //   localStorage.setItem('user', JSON.stringify({
    //     id: res.data.userId,
    //     username: res.data.username
    //   }));
    //     console.log('User id is',res.data.userId);
    //   navigate('/users'); // optional
    // } catch (err) {
    //   setError('Invalid username or password');
    // }
  };

  return (
    <div className="p-8 max-w-sm mx-auto bg-gray-800 text-white rounded">
      <h2 className="text-xl mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-2 p-2 rounded bg-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
