// Create a new file: src/components/Admin/AdminUsers.tsx
// Similar to above, for users. Fields: name, email, role (e.g., admin/client).

import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  password: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', phone: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://design-architecture-be.vercel.app/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      console.log("Clicked");
      if (currentUser) {
        await axios.put(`https://design-architecture-be.vercel.app/api/users/${currentUser._id}`, formData);
      } else {
        await axios.post('https://design-architecture-be.vercel.app/api/users', formData);
      }
      fetchUsers();
      closeModal();
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`https://design-architecture-be.vercel.app/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  const openModal = (user?: User) => {
    setCurrentUser(user || null);
    setFormData(user ? { name: user.name, email: user.email, role: user.role, phone: user.phone, password: user.password } : { name: '', email: '', role: '', phone: '', password: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Users</h2>
        <button
          onClick={() => openModal()}
          className="bg-lime-400 text-slate-900 px-4 py-2 rounded hover:bg-lime-500"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 border border-slate-700">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Name</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Email</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Role</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-700/50">
                  <td className="py-3 px-4 border-t border-slate-700">{user.name}</td>
                  <td className="py-3 px-4 border-t border-slate-700">{user.email}</td>
                  <td className="py-3 px-4 border-t border-slate-700">{user.role}</td>
                  <td className="py-3 px-4 border-t border-slate-700">
                    <button
                      onClick={() => openModal(user)}
                      className="text-lime-400 hover:text-lime-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">
                  {users.length === 0 ? 'No users found' : 'Invalid data format'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded w-full max-w-md">
            <h3 className="text-xl mb-4">{currentUser ? 'Update User' : 'Add User'}</h3>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <input
              type="text"
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <input
              type="text"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-white mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdate}
                className="bg-lime-400 text-slate-900 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;