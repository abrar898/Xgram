import {
  Twitter,
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  List,
  User,
  MoreHorizontal,
  Pencil,
  Settings
} from 'lucide-react';
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="w-[25%] bg-black text-white  h-screen p-8 border-r border-white">
      <ul className="flex flex-col gap-7 mx-8 text-lg font-medium">
        <li className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
          <Twitter className="w-5 h-5" /> Twitter</li>
        <li className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
          <Home className="w-5 h-5" /> Home
        </li>
        <li className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
          <Search className="w-5 h-5" /> Explore
        </li>
        <li className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
          <Bell className="w-5 h-5" /> Notifications
        </li>
        <li><Link to="/messages" className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
        <Mail className="w-5 h-5" /> Messages</Link></li>
        <li className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
          <Bookmark className="w-5 h-5" /> Bookmarks
        </li>
        <li className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
          <List className="w-5 h-5" /> Lists
        </li>
        <li className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
          <User className="w-5 h-5" /> Profile
        </li>
        <li className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
          <MoreHorizontal className="w-5 h-5" /> More
        </li>
        <li className="hover:text-blue-400 cursor-pointer font-semibold flex items-center gap-4">
          <Pencil className="w-5 h-5" /> Tweet
        </li>
        <li className="hover:text-blue-400 cursor-pointer flex items-center gap-4">
          <Settings className="w-5 h-5" /> Account
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
