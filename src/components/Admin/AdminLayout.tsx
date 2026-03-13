// Create a new file: src/components/Admin/AdminLayout.tsx
// This provides the sidebar navigation and main content area for the admin dashboard.
// It's fully responsive: sidebar collapses to a menu on mobile.

import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
          <nav>
            <ul className="space-y-4">
                <li>
                <Link
                  to="/admin/dashboard"
                  className="block py-2 px-4 hover:bg-slate-700 rounded"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/projects"
                  className="block py-2 px-4 hover:bg-slate-700 rounded"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Projects
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/admin/team"
                  className="block py-2 px-4 hover:bg-slate-700 rounded"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Team Members
                </Link>
              </li> */}
              <li>
                <Link
                  to="/admin/users"
                  className="block py-2 px-4 hover:bg-slate-700 rounded"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Users
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;