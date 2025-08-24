import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Left-sidebar";
import Card from "./components/Main-section";
import Right from "./components/Right-section";
import Messages from "./components/tags/Messages";
import Chats from "./components/Chats";
import Msg from "./components/Chatting";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/login";
import ChatLayout from "./components/chats/ChatLayout";
import UserList from "./components/chats/UserList";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-black">
        <Card />
      </div>
      <Right />
    </div>
  );
}

export default function App() {
  return (
      <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/msgs" element={<Msg />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/users" element={<ChatLayout />} />

        <Route path="/use" element={<UserList />} />
        <Route path="/login" element={<Login />} />


      </Routes>
      
      {/* ✅ ToastContainer must be outside of <Routes> */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
