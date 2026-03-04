import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";

import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  UserCog, 
  Plus, 
  Edit2, 
  Trash2, 
  Menu, 
  X, 
  Home, 
  Building2 
} from 'lucide-react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    navigate("/");
  };

  const [currentPage, setCurrentPage] = useState<'dashboard' | 'projects' | 'team' | 'users'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  

  return (

    <div className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#1e2937] border-r border-slate-700 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#a3e635] rounded-2xl flex items-center justify-center">
              <Home className="w-6 h-6 text-[#0f172a]" />
            </div>
            <div>
              <div className="font-bold text-2xl tracking-tight">PlanArch</div>
              <div className="text-xs text-slate-400 -mt-1">Studio Admin</div>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { key: 'projects', label: 'Projects', icon: FolderKanban },
            { key: 'team', label: 'Team Members', icon: Users },
            { key: 'users', label: 'Users', icon: UserCog },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key as any);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all ${isActive 
                  ? 'bg-[#a3e635] text-[#0f172a] font-semibold' 
                  : 'hover:bg-slate-700 text-slate-300'}`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
    
      {/* <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          Hiruna Store
        </Link>
      </div>

      <h2 className="text-xl font-medium mb-6 text-center">
        Admin Dashboard
      </h2> */}

      {/* <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/project"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav> */}

      
    

export default AdminSidebar;

