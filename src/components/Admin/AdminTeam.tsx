// Create a new file: src/components/Admin/AdminTeam.tsx
// Similar to AdminProjects, but for team members.
// Adjust fields: name, role, email.

import { useState, useEffect } from 'react';
import axios from 'axios';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  email: string;
  imageUrl: string;
}

const AdminTeam = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({ preview: '', name: '', role: '', email: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentProject] = useState<TeamMember | null>(null);
  


  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('/api/team');
      setMembers(res.data);
    } catch (err) {
      console.error('Error fetching team members:', err);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (currentMember) {
        await axios.put(`/api/team/${currentMember._id}`, formData);
      } else {
        await axios.post('/api/team', formData);
      }
      fetchMembers();
      closeModal();
    } catch (err) {
      console.error('Error saving member:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/team/${id}`);
        fetchMembers();
      } catch (err) {
        console.error('Error deleting member:', err);
      }
    }
  };

  const openModal = (member?: TeamMember) => {
    setCurrentMember(member || null);
    setFormData(member ? { preview: member.imageUrl, name: member.name, role: member.role, email: member.email } : { preview: '', name: '', role: '', email: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Team Members</h2>
        <button
          onClick={() => openModal()}
          className="bg-lime-400 text-slate-900 px-4 py-2 rounded hover:bg-lime-500"
        >
          Add Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 border border-slate-700">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Preview</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Name</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Role</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Email</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(members) && members.length > 0 ? (
              members.map((member) => (
                <tr key={member._id} className="hover:bg-slate-700/50">
                  <td className="py-3 px-4 border-t border-slate-700">{member.imageUrl}</td>
                  <td className="py-3 px-4 border-t border-slate-700">{member.name}</td>
                  <td className="py-3 px-4 border-t border-slate-700">{member.role}</td>
                  <td className="py-3 px-4 border-t border-slate-700">{member.email}</td>
                  <td className="py-3 px-4 border-t border-slate-700">
                    <button
                      onClick={() => openModal(member)}
                      className="text-lime-400 hover:text-lime-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
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
                  {members.length === 0 ? 'No team members found' : 'Invalid data format'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded w-full max-w-md">
            <h3 className="text-xl mb-4">{currentMember ? 'Update Member' : 'Add Member'}</h3>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <div className="mb-4">
              <label className="block mb-2 text-white">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
              />
              {currentProject?.imageUrl && !selectedFile && (
                <div className="mt-2">
                  <p className="text-sm text-gray-400">Current Photo:</p>
                  <img
                    src={`/uploads/${currentProject.imageUrl}`}
                    alt="Current project"
                    className="mt-2 max-w-full h-auto rounded"
                  />
                </div>
              )}
            </div>
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

export default AdminTeam;