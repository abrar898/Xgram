import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/register', { username, password });
      toast.success('✅ User has been created successfully!');
      // navigate('/users');
      setUsername('');
      setPassword('');
    } catch (error) {
      toast.error('❌ Registration failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black flex items-center justify-center px-4">
      <div className="bg-black bg-opacity-90 shadow-xl p-8 rounded-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">User Registration</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
