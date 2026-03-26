import { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  subImageUrls: string[];
  // category: string;
  cost: string;
  area: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  
  const [formData, setFormData] = useState({
    imageUrl: '',
    subImageUrls: [] as string[],
    name: '',
    description: '',
    // category: '',
    area: '',
    cost: ''
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file); 

    try {
      const res = await axios.post<{ imageUrl: string }>(
        "https://design-architecture-be.vercel.app/api/upload",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFormData((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
      console.log(" Cloudinary URL received:", res.data.imageUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed. Please try again.");
    }
  };

  const handleSubImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fd = new FormData();

    for (let i = 0; i < files.length; i++) {
      fd.append("images", files[i]); 
    }

    try {
      const res = await axios.post<{ imageUrls: string[] }>(
        "https://design-architecture-be.vercel.app/api/subImagesUpload",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFormData((prev) => ({
      ...prev,
      subImageUrls: [...prev.subImageUrls, ...res.data.imageUrls],
    }));
      console.log(" Cloudinary URL received:", res.data.imageUrls);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed. Please try again.");
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('https://design-architecture-be.vercel.app/api/projects');
      setProjects(res.data);
      console.log("Projects loaded:", res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      const payload = {
        ...formData,
        subImageUrls: formData.subImageUrls,
      };

      if (currentProject) {
        await axios.put(`https://design-architecture-be.vercel.app/api/projects/${currentProject._id}`, payload);
      } else {
        console.log("form data is: ", payload)
        await axios.post('https://design-architecture-be.vercel.app/api/projects', payload);
      }
      fetchProjects();
      closeModal();
    } catch (err) {
      console.error('Error saving project:', err);
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this project?')) {
      try {
        await axios.delete(`https://design-architecture-be.vercel.app/api/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error('Error deleting:', err);
      }
    }
  };

  const openModal = (project?: Project) => {
    setCurrentProject(project || null);
    setFormData(project ? {
      imageUrl: project.imageUrl || '',
      subImageUrls: project.subImageUrls || [],
      name: project.name,
      description: project.description,
      // category: project.category,
      area: project.area,
      cost: project.cost
    } : {
      imageUrl: '',
      subImageUrls: [],
      name: '',
      description: '',
      // category: '',
      area: '',
      cost: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 border border-slate-700">
          <thead>
            <tr>
              <th className='py-2 px-4 border-b border-slate-700 text-left'>Preview</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Name</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Description</th>
              {/* <th className="py-2 px-4 border-b border-slate-700 text-left">Category</th> */}
              <th className="py-2 px-4 border-b border-slate-700 text-left">Area</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Cost</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="py-2 px-4 border-b border-slate-700">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-16 h-16 object-cover rounded"
                      // onError={(e) => {
                      //   // e.currentTarget.src = "https://via.placeholder.com/64x64/333/fff?text=No+Image";
                      //   e.currentTarget.onerror = null;
                      //   e.currentTarget.src = "/no-image.png";
                      // }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-slate-700 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Image</span>
                    </div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-slate-700">{project.name}</td>
                <td className="py-2 px-4 border-b border-slate-700">{project.description}</td>
                {/* <td className="py-2 px-4 border-b border-slate-700">{project.category}</td> */}
                <td className="py-2 px-4 border-b border-slate-700">{project.area}</td>
                <td className="py-2 px-4 border-b border-slate-700">{project.cost}</td>
                <td className="py-2 px-4 border-b border-slate-700">
                  <button onClick={() => openModal(project)} className="text-lime-400 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(project._id)} className="text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded w-full max-w-2xl overflow-y-auto max-h-[80vh]">
            <h3 className="text-xl mb-4">{currentProject ? 'Update Project' : 'Add Project'}</h3>
            <span>
            <input 
              type="text" 
              placeholder="Name" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              className="w-[300px] mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />
            <input 
              type="number" 
              placeholder="Area (sq ft)" 
              value={formData.area} 
              onChange={(e) => setFormData({ ...formData, area: e.target.value })} 
              className="w-[288px] ml-5 mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />
            </span>
            <textarea 
              placeholder="Discription" 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />
            
            {/* <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" /> */}
            
            <input 
              type="number" 
              placeholder="Cost (Rs.)" 
              value={formData.cost} 
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })} 
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />

            <div className="mb-4">
              <label className="block mb-2 text-white">Upload Photo</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white" 
              />

              <div className='mt-4'>
                <label className='block mb-2 text-white'>Upload Sub Photo</label>
                <input 
                  type='file'
                  accept='image/*,application/pdf'
                  multiple
                  onChange={handleSubImageChange}
                  className='w-full p-2 bg-slate-700 border border-slate-600 rounded text-white'
                />
              </div>

              {/* Preview for NEW uploaded image */}
              {formData.imageUrl && (
                <div className="mt-3">
                  <p className="text-sm text-lime-400">New Photo Preview:</p>
                  <img src={formData.imageUrl} alt="preview" className="mt-2 w-full max-h-48 object-cover rounded" />
                </div>
              )}

              {/* Current photo when editing */}
              {currentProject?.imageUrl && !formData.imageUrl && (
                <div className="mt-3">
                  <p className="text-sm text-gray-400">Current Photo:</p>
                  <img src={currentProject.imageUrl} alt="current" className="mt-2 w-full max-h-48 object-cover rounded" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={closeModal} className="text-white px-4 py-2">Cancel</button>
              <button onClick={handleAddOrUpdate} className="bg-lime-400 text-slate-900 px-6 py-2 rounded font-medium">Save Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;