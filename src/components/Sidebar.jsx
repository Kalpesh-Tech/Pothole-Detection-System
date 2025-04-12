import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Camera, Home as HomeIcon, Camera as DetectionIcon, BarChart2, LogOut } from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/signin');
    window.location.reload(); // Optional: force state refresh in App
  };

  return (
    <div className="w-64 bg-secondary p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Camera className="w-8 h-8 text-blue-500" />
        <span className="text-white text-xl font-semibold">Pothole Vision</span>
      </div>

      <nav className="flex-1">
        <Link
          to="/"
          className={`flex items-center gap-3 p-3 rounded-lg mb-2 ${
            isActive('/') ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-blue-600/10'
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </Link>

        
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 text-gray-400 hover:bg-blue-600/10 rounded-lg"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;
