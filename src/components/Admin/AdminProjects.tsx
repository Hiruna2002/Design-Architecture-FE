import { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  cost: string;
  area: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ preview: '',name: '', description: '', category: '', area: '', cost: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5173/admin/projects');
      setProjects(res.data);
      console.log("Projects is:- ", projects)
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (currentProject) {
        const res = await axios.put(`/admin/projects/${currentProject._id}`, formData);
        console.log(res)
      } else {
        const res = await axios.post('http://localhost:9000/api/projects', formData);
        console.log(res)
      }
      fetchProjects();
      closeModal();
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  const openModal = (project?: Project) => {
    setCurrentProject(project || null);
    setFormData(project ? { 
        preview: project.imageUrl, 
        name: project.name, 
        description: project.description, 
        category: project.category, 
        area: project.area, 
        cost: project.cost 
    } : {
        preview: '', 
        name: '', 
        description: '', 
        category: '', 
        area: '', 
        cost: ''
    });
    setSelectedFile(null);
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
        <h2 className="text-3xl font-bold">Projects</h2>
        <button
          onClick={() => openModal()}
          className="bg-lime-400 text-slate-900 px-4 py-2 rounded hover:bg-lime-500"
        >
          Add Project
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 border border-slate-700">
          <thead>
            <tr>
              <th className='py-2 px-4 border-b border-slate-700 text-left'>Preview</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Name</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Description</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Category</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Area</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Cost</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(projects) ? (
                projects.map((project) => (
                <tr key={project._id}>
                    <td className="py-2 px-4 border-b border-slate-700">{project.imageUrl}</td>
                    <td className="py-2 px-4 border-b border-slate-700">{project.name}</td>
                    <td className="py-2 px-4 border-b border-slate-700">{project.description}</td>
                    <td className="py-2 px-4 border-b border-slate-700">{project.category}</td>
                    <td className="py-2 px-4 border-b border-slate-700">{project.area}</td>
                    <td className="py-2 px-4 border-b border-slate-700">{project.cost}</td>
                    <td className="py-2 px-4 border-b border-slate-700">
                    <button
                        onClick={() => openModal(project)}
                        className="text-lime-400 hover:underline mr-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(project._id)}
                        className="text-red-400 hover:underline"
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={3} className="py-2 px-4 text-center">
                    No projects available or invalid data.
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>

      {/* Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded w-full max-w-md">
            <h3 className="text-xl mb-4">{currentProject ? 'Update Project' : 'Add Project'}</h3>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
      )} */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded w-full max-w-md overflow-y-auto max-h-[80vh]">
            <h3 className="text-xl mb-4">{currentProject ? 'Update Project' : 'Add Project'}</h3>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <input
              type="text"
              placeholder="Category (e.g., Residential, Commercial)"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <input
              type="number"
              placeholder="Area (sq ft)"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <input
              type="number"
              placeholder="Cost (USD)"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
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
              <button onClick={closeModal} className="text-white mr-2">
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

export default AdminProjects;