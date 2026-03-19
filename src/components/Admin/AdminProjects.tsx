// import { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Project {
//   _id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
//   category: string;
//   cost: string;
//   area: string;
// }

// const AdminProjects = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentProject, setCurrentProject] = useState<Project | null>(null);
//   const [formData, setFormData] = useState({ imageUrl: '',name: '', description: '', category: '', area: '', cost: '' });
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [image, setImage] = useState<File | null>(null);

//   // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = e.target.files?.[0];
//   //   if (!file) return;

//   //   // const formData = new FormData();
//   //   // formData.append("preview", file);

//   //   const uploadFormData = new FormData();           // renamed to avoid conflict
//   //   uploadFormData.append("image", file);

//   //   try {
//   //     await axios.post<{ imageUrl: string }>( `http://localhost:9000/api/upload`, formData,
//   //       { headers: { "Content-Type": "multipart/form-data" } }
//   //     );

//   //     // setProductData(prev => ({
//   //     //   ...prev,
//   //     //   images: [...prev.images, { url: data.imageUrl, altText: "" }],
//   //     // }));

//   //     setFormData(prev => ({ ...prev, preview: res.data.imageUrl }));

//   //     e.target.value = '';
//   //   } catch (error) {
//   //     console.error("Upload failed:", error);
//   //     alert("Image upload failed. Please try again.");
//   //   }
//   // };

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const fd = new FormData();
//     fd.append("image", file);        // ← must match backend .single("image")

//     try {
//       const res = await axios.post<{ imageUrl: string }>(
//         "http://localhost:9000/api/upload",
//         fd,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setFormData((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
//       alert("Image uploaded to Cloudinary ✅");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

// // When saving the form
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   await axios.post("/api/projects", formData);   // imageUrl is already inside
//   // or for update: axios.put(`/api/projects/${id}`, formData)
// };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get('http://localhost:9000/api/projects');
//       setProjects(res.data);
//       console.log("Projects is:- ", projects)
//     } catch (err) {
//       console.error('Error fetching projects:', err);
//     }
//   };

//   const handleAddOrUpdate = async () => {
//     try {
//       // const data = {}
//       // data.append('name', formData.name);
//       // data.append('description', formData.description);
//       // data.append('category', formData.category);
//       // data.append('area', formData.area);
//       // data.append('cost', formData.cost);
//       // if (image) {
//       //   data.append('imageUrl', image);
//       // }

//       // const data = {
//       //   name: formData.name,
//       //   description: formData.description,
//       //   category: formData.category,
//       //   area: formData.area,
//       //   cost: formData.cost,
//       //   imageUrl: formData.preview
//       // };

//       if (currentProject) {
//         const res = await axios.put(`http://localhost:9000/api/projects/${currentProject._id}`, formData);
//         console.log(res)
//       } else {
//         const res = await axios.post('http://localhost:9000/api/projects', formData);
//         console.log(res)
//       }
//       fetchProjects();
//       closeModal();
//     } catch (err) {
//       console.error('Error saving project:', err);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure?')) {
//       try {
//         await axios.delete(`http://localhost:9000/api/projects/${id}`);
//         fetchProjects();
//       } catch (err) {
//         console.error('Error deleting project:', err);
//       }
//     }
//   };

//   const handleFileUpload = (event: { target: { files: (arg0: number) => any; }; }) => {
//     const file = event.target.files(0)

//     if(!file) return

//     const formData = new FormData;
//     formData.append("file", file)

//     console.log(file)
//   }

//   // const pickImage = async () => {
//   //   try {
//   //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
//   //     if (status !== "granted") {
//   //       Alert.alert("Permission denied", "We need permission to access your gallery")
//   //       return
//   //     }

//   //     const result = await ImagePicker.launchImageLibraryAsync({
//   //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   //       allowsEditing: true,
//   //       aspect: [1, 1],
//   //       quality: 0.8,
//   //     })

//   //     if (!result.canceled) {
//   //       const uri = result.assets[0].uri
//   //       setImage(uri)
//   //     }
//   //   } catch (err: any) {
//   //     console.error("pickImage error", err)
//   //     Alert.alert("Error", "Could not pick image")
//   //   }
//   // }

//   const openModal = (project?: Project) => {
//     setCurrentProject(project || null);
//     setFormData(project ? { 
//         imageUrl: project.imageUrl, 
//         name: project.name, 
//         description: project.description, 
//         category: project.category, 
//         area: project.area, 
//         cost: project.cost 
//     } : {
//         imageUrl: '', 
//         name: '', 
//         description: '', 
//         category: '', 
//         area: '', 
//         cost: ''
//     });
//     setSelectedFile(null);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files && e.target.files[0]) {
//   //     setSelectedFile(e.target.files[0]);
//   //   }
//   // };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold">Projects</h2>
//         <button
//           onClick={() => openModal()}
//           className="bg-lime-400 text-slate-900 px-4 py-2 rounded hover:bg-lime-500"
//         >
//           Add Project
//         </button>
//       </div>

//       {/* Responsive Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-slate-800 border border-slate-700">
//           <thead>
//             <tr>
//               <th className='py-2 px-4 border-b border-slate-700 text-left'>Preview</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Name</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Description</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Category</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Area</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Cost</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(projects) ? (
//                 projects.map((project) => (
//                 <tr key={project._id}>
//                     <td className="py-2 px-4 border-b border-slate-700">
//                       {project.imageUrl ? (
//                         <img
//                           src={project.imageUrl}
//                           alt={project.name}
//                           className="w-16 h-16 object-cover rounded"
//                           onError={(e) => {
//                             e.currentTarget.src = "https://via.placeholder.com/64x64/333/fff?text=No+Image";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-16 h-16 bg-slate-700 rounded flex items-center justify-center">
//                           <span className="text-xs text-gray-400">No Image</span>
//                         </div>
//                       )}
//                     </td>
//                     <td className="py-2 px-4 border-b border-slate-700">{project.name}</td>
//                     <td className="py-2 px-4 border-b border-slate-700">{project.description}</td>
//                     <td className="py-2 px-4 border-b border-slate-700">{project.category}</td>
//                     <td className="py-2 px-4 border-b border-slate-700">{project.area}</td>
//                     <td className="py-2 px-4 border-b border-slate-700">{project.cost}</td>
//                     <td className="py-2 px-4 border-b border-slate-700">
//                     <button
//                         onClick={() => openModal(project)}
//                         className="text-lime-400 hover:underline mr-2"
//                     >
//                         Edit
//                     </button>
//                     <button
//                         onClick={() => handleDelete(project._id)}
//                         className="text-red-400 hover:underline"
//                     >
//                         Delete
//                     </button>
//                     </td>
//                 </tr>
//                 ))
//             ) : (
//                 <tr>
//                 <td colSpan={3} className="py-2 px-4 text-center">
//                     No projects available or invalid data.
//                 </td>
//                 </tr>
//             )}
//             </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {/* {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-slate-800 p-6 rounded w-full max-w-md">
//             <h3 className="text-xl mb-4">{currentProject ? 'Update Project' : 'Add Project'}</h3>
//             <input
//               type="text"
//               placeholder="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
//             />
//             <textarea
//               placeholder="Description"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
//             />
//             <div className="flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="text-white mr-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddOrUpdate}
//                 className="bg-lime-400 text-slate-900 px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )} */}

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-slate-800 p-6 rounded w-full max-w-md overflow-y-auto max-h-[80vh]">
//             <h3 className="text-xl mb-4">{currentProject ? 'Update Project' : 'Add Project'}</h3>
//             <input
//               type="text"
//               placeholder="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
//             />
//             <textarea
//               placeholder="Description"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
//             />
//             <input
//               type="text"
//               placeholder="Category (e.g., Residential, Commercial)"
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
//             />
//             <input
//               type="number"
//               placeholder="Area (sq ft)"
//               value={formData.area}
//               onChange={(e) => setFormData({ ...formData, area: e.target.value })}
//               className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
//             />
//             <input
//               type="number"
//               placeholder="Cost (USD)"
//               value={formData.cost}
//               onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
//               className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white"
//             />
//             <div className="mb-4">
//               <label className="block mb-2 text-white">Upload Photo</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
//               />
//               {/* {formData.imageUrl && (
//                 <img src={formData.imageUrl} alt="preview" className="w-40 h-40 object-cover mt-2" />
//               )} */}
//               {currentProject?.imageUrl && !selectedFile && (
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-400">Current Photo:</p>
//                   <img
//                     src={currentProject?.imageUrl}          // ← CHANGED TO THIS
//                     alt="Current project"
//                     className="mt-2 max-w-full h-auto rounded"
//                   />
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-end">
//               <button onClick={closeModal} className="text-white mr-2">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddOrUpdate}
//                 className="bg-lime-400 text-slate-900 px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProjects;


import { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
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
      if (currentProject) {
        await axios.put(`https://design-architecture-be.vercel.app/api/projects/${currentProject._id}`, formData);
      } else {
        await axios.post('https://design-architecture-be.vercel.app/api/projects', formData);
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
      name: project.name,
      description: project.description,
      // category: project.category,
      area: project.area,
      cost: project.cost
    } : {
      imageUrl: '',
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
            {/* <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" /> */}
            <input 
              type="number" 
              placeholder="Area (sq ft)" 
              value={formData.area} 
              onChange={(e) => setFormData({ ...formData, area: e.target.value })} 
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />
            <input 
              type="number" 
              placeholder="Cost (Rs.)" 
              value={formData.cost} 
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })} 
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />

            <div className="mb-4">
              <label className="block mb-2 text-white">Upload Photo</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white" />

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