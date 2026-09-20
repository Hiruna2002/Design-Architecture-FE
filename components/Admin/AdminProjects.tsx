// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as pdfjsLib from 'pdfjs-dist';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;


// interface Project {
//   _id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
//   subImageUrls: string[];
//   // category: string;
//   cost: string;
//   area: string;
// }

// const AdminProjects = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentProject, setCurrentProject] = useState<Project | null>(null);
  
//   const [formData, setFormData] = useState({
//     imageUrl: '',
//     subImageUrls: [] as string[],
//     name: '',
//     description: '',
//     // category: '',
//     area: '',
//     cost: ''
//   });

//   const convertPdfToImages = async (file: File): Promise<File[]> => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.onload = async function() {
//         try {
//           const typedArray = new Uint8Array(this.result as ArrayBuffer);
//           const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
//           const numPages = pdf.numPages;
//           const imageFiles: File[] = [];

//           for (let i = 1; i <= numPages; i++) {
//             const page = await pdf.getPage(i);
//             const viewport = page.getViewport({ scale: 1.5 });
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');
//             if (!context) throw new Error('Could not get canvas context');
            
//             canvas.height = viewport.height;
//             canvas.width = viewport.width;
            
//             const renderContext = {
//               canvasContext: context,
//               viewport: viewport,
//               canvas: canvas,
//             };
            
//             await page.render(renderContext).promise;
            
//             const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/jpeg', 0.9));
//             if (blob) {
//               const fileName = numPages > 1 ? file.name.replace('.pdf', `_page_${i}.jpg`) : file.name.replace('.pdf', '.jpg');
//               const imageFile = new File([blob], fileName, { type: 'image/jpeg' });
//               imageFiles.push(imageFile);
//             }
//           }
          
//           resolve(imageFiles);
//         } catch (error) {
//           reject(error);
//         }
//       };
      
//       fileReader.onerror = () => {
//         reject(new Error("Failed to read file"));
//       }

//       fileReader.readAsArrayBuffer(file);
//     });
//   };

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     let file = e.target.files?.[0];
//     if (!file) return;

//     if (file.type === 'application/pdf') {
//       try {
//         const extractedImages = await convertPdfToImages(file);
//         if (extractedImages.length > 0) {
//           file = extractedImages[0]; // For main image, just use the first page
//         }
//       } catch (err) {
//         console.error("PDF to image conversion failed:", err);
//         alert("Failed to extract image from PDF");
//         return;
//       }
//     }

//     const fd = new FormData();
//     fd.append("image", file); 

//     try {
//       const res = await axios.post<{ imageUrl: string }>(
//         "https://design-architecture-be.vercel.app/api/upload",
//         fd,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setFormData((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
//       console.log(" Cloudinary URL received:", res.data.imageUrl);
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Image upload failed. Please try again.");
//     }
//   };

//   const handleSubImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const fd = new FormData();

//     for (let i = 0; i < files.length; i++) {
//       let file = files[i];
//       if (file.type === 'application/pdf') {
//         try {
//           const extractedImages = await convertPdfToImages(file);
//           extractedImages.forEach(img => fd.append("images", img));
//         } catch (err) {
//           console.error("PDF to image conversion failed:", err);
//           alert(`Failed to extract images from PDF: ${file.name}`);
//         }
//       } else {
//         // If it's a regular image file, use the previous method and append it directly
//         fd.append("images", file); 
//       }
//     }

//     try {
//       const res = await axios.post<{ imageUrls: string[] }>(
//         "https://design-architecture-be.vercel.app/api/subImagesUpload",
//         fd,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setFormData((prev) => ({
//       ...prev,
//       subImageUrls: [...prev.subImageUrls, ...res.data.imageUrls],
//     }));
//       console.log(" Cloudinary URL received:", res.data.imageUrls);
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Image upload failed. Please try again.");
//     }
//   }

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get('https://design-architecture-be.vercel.app/api/projects');
//       setProjects(res.data);
//       console.log("Projects loaded:", res.data);
//     } catch (err) {
//       console.error('Error fetching projects:', err);
//     }
//   };

//   const handleAddOrUpdate = async () => {
//     try {
//       const payload = {
//         ...formData,
//         subImageUrls: formData.subImageUrls,
//       };

//       if (currentProject) {
//         await axios.put(`https://design-architecture-be.vercel.app/api/projects/${currentProject._id}`, payload);
//       } else {
//         console.log("form data is: ", payload)
//         await axios.post('https://design-architecture-be.vercel.app/api/projects', payload);
//       }
//       fetchProjects();
//       closeModal();
//     } catch (err) {
//       console.error('Error saving project:', err);
//       alert("Failed to save project");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Delete this project?')) {
//       try {
//         await axios.delete(`https://design-architecture-be.vercel.app/api/projects/${id}`);
//         fetchProjects();
//       } catch (err) {
//         console.error('Error deleting:', err);
//       }
//     }
//   };

//   const openModal = (project?: Project) => {
//     setCurrentProject(project || null);
//     setFormData(project ? {
//       imageUrl: project.imageUrl || '',
//       subImageUrls: project.subImageUrls || [],
//       name: project.name,
//       description: project.description,
//       // category: project.category,
//       area: project.area,
//       cost: project.cost
//     } : {
//       imageUrl: '',
//       subImageUrls: [],
//       name: '',
//       description: '',
//       // category: '',
//       area: '',
//       cost: ''
//     });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

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

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-slate-800 border border-slate-700">
//           <thead>
//             <tr>
//               <th className='py-2 px-4 border-b border-slate-700 text-left'>Preview</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Name</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Description</th>
//               {/* <th className="py-2 px-4 border-b border-slate-700 text-left">Category</th> */}
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Area</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Cost</th>
//               <th className="py-2 px-4 border-b border-slate-700 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((project) => (
//               <tr key={project._id}>
//                 <td className="py-2 px-4 border-b border-slate-700">
//                   {project.imageUrl ? (
//                     <img
//                       src={project.imageUrl}
//                       alt={project.name}
//                       className="w-16 h-16 object-cover rounded"
//                       // onError={(e) => {
//                       //   // e.currentTarget.src = "https://via.placeholder.com/64x64/333/fff?text=No+Image";
//                       //   e.currentTarget.onerror = null;
//                       //   e.currentTarget.src = "/no-image.png";
//                       // }}
//                     />
//                   ) : (
//                     <div className="w-16 h-16 bg-slate-700 rounded flex items-center justify-center">
//                       <span className="text-xs text-gray-400">No Image</span>
//                     </div>
//                   )}
//                 </td>
//                 <td className="py-2 px-4 border-b border-slate-700">{project.name}</td>
//                 <td className="py-2 px-4 border-b border-slate-700">{project.description}</td>
//                 {/* <td className="py-2 px-4 border-b border-slate-700">{project.category}</td> */}
//                 <td className="py-2 px-4 border-b border-slate-700">{project.area}</td>
//                 <td className="py-2 px-4 border-b border-slate-700">{project.cost}</td>
//                 <td className="py-2 px-4 border-b border-slate-700">
//                   <button onClick={() => openModal(project)} className="text-lime-400 hover:underline mr-2">Edit</button>
//                   <button onClick={() => handleDelete(project._id)} className="text-red-400 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-slate-800 p-6 rounded w-full max-w-2xl overflow-y-auto max-h-[80vh]">
//             <h3 className="text-xl mb-4">{currentProject ? 'Update Project' : 'Add Project'}</h3>
//             <span>
//             <input 
//               type="text" 
//               placeholder="Name" 
//               value={formData.name} 
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
//               className="w-[300px] mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
//             />
//             <input 
//               type="number" 
//               placeholder="Area (sq ft)" 
//               value={formData.area} 
//               onChange={(e) => setFormData({ ...formData, area: e.target.value })} 
//               className="w-[288px] ml-5 mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
//             />
//             </span>
//             <textarea 
//               placeholder="Discription" 
//               value={formData.description} 
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
//               className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
//             />
            
//             {/* <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" /> */}
            
//             <input 
//               type="number" 
//               placeholder="Cost (Rs.)" 
//               value={formData.cost} 
//               onChange={(e) => setFormData({ ...formData, cost: e.target.value })} 
//               className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
//             />
//             {/* <input 
//               type="number" 
//               placeholder="Bedrooms" 
//               value={formData.bedrooms} 
//               onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} 
//               className="w-[288px] ml-5 mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
//             /> */}

//             <div className="mb-4">
//               <label className="block mb-2 text-white">Upload Photo</label>
//               <input 
//                 type="file" 
//                 accept="image/*,application/pdf" 
//                 onChange={handleImageChange} 
//                 className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white" 
//               />

//               <div className='mt-4'>
//                 <label className='block mb-2 text-white'>Upload Sub Photo</label>
//                 <input 
//                   type='file'
//                   accept='image/*,application/pdf'
//                   multiple
//                   onChange={handleSubImageChange}
//                   className='w-full p-2 bg-slate-700 border border-slate-600 rounded text-white'
//                 />
//               </div>

//               {/* Preview for NEW uploaded image */}
//               {formData.imageUrl && (
//                 <div className="mt-3">
//                   <p className="text-sm text-lime-400">New Photo Preview:</p>
//                   <img src={formData.imageUrl} alt="preview" className="mt-2 w-full max-h-48 object-cover rounded" />
//                 </div>
//               )}

//               {/* Current photo when editing */}
//               {currentProject?.imageUrl && !formData.imageUrl && (
//                 <div className="mt-3">
//                   <p className="text-sm text-gray-400">Current Photo:</p>
//                   <img src={currentProject.imageUrl} alt="current" className="mt-2 w-full max-h-48 object-cover rounded" />
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end gap-3">
//               <button onClick={closeModal} className="text-white px-4 py-2">Cancel</button>
//               <button onClick={handleAddOrUpdate} className="bg-lime-400 text-slate-900 px-6 py-2 rounded font-medium">Save Project</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProjects;



'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface Project {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  subImageUrls: string[];

  bedrooms: string;
  bathrooms: string;
  kitchen: string;
  living: string;

  area: string;
  cost: string;
}

interface ProjectFormData {
  imageUrl: string;
  subImageUrls: string[];

  name: string;
  description: string;

  bedrooms: string;
  bathrooms: string;
  kitchen: string;
  living: string;

  area: string;
  cost: string;
}

const initialFormData: ProjectFormData = {
  imageUrl: '',
  subImageUrls: [],

  name: '',
  description: '',

  bedrooms: '',
  bathrooms: '',
  kitchen: '',
  living: '',

  area: '',
  cost: '',
};

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentProject, setCurrentProject] =
    useState<Project | null>(null);

  const [formData, setFormData] =
    useState<ProjectFormData>(initialFormData);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isUploadingSub, setIsUploadingSub] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://design-architecture-be.vercel.app';

  // =========================================================
  // PDF -> IMAGE
  // =========================================================

  const convertPdfToImages = async (
    file: File
  ): Promise<File[]> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        try {
          const typedArray = new Uint8Array(
            this.result as ArrayBuffer
          );

          const pdf = await pdfjsLib.getDocument({
            data: typedArray,
          }).promise;

          const numPages = pdf.numPages;

          const imageFiles: File[] = [];

          for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);

            const viewport = page.getViewport({
              scale: 1.5,
            });

            const canvas =
              document.createElement('canvas');

            const context = canvas.getContext('2d');

            if (!context) {
              throw new Error(
                'Could not get canvas context'
              );
            }

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
              canvasContext: context,
              viewport,
              canvas,
            }).promise;

            const blob =
              await new Promise<Blob | null>(
                (res) =>
                  canvas.toBlob(
                    res,
                    'image/jpeg',
                    0.9
                  )
              );

            if (blob) {
              const fileName =
                numPages > 1
                  ? file.name.replace(
                      /\.pdf$/i,
                      `_page_${i}.jpg`
                    )
                  : file.name.replace(
                      /\.pdf$/i,
                      '.jpg'
                    );

              const imageFile = new File(
                [blob],
                fileName,
                {
                  type: 'image/jpeg',
                }
              );

              imageFiles.push(imageFile);
            }
          }

          resolve(imageFiles);
        } catch (error) {
          reject(error);
        }
      };

      fileReader.onerror = () => {
        reject(
          new Error('Failed to read PDF file')
        );
      };

      fileReader.readAsArrayBuffer(file);
    });
  };

  // =========================================================
  // MAIN IMAGE UPLOAD
  // =========================================================

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let file = e.target.files?.[0];

    if (!file) return;

    try {
      setIsUploadingMain(true);

      if (file.type === 'application/pdf') {
        const extractedImages =
          await convertPdfToImages(file);

        if (extractedImages.length === 0) {
          alert(
            'No image could be extracted from the PDF.'
          );

          return;
        }

        // First PDF page becomes main image
        file = extractedImages[0];
      }

      const fd = new FormData();

      fd.append('image', file);

      const res = await axios.post<{
        imageUrl: string;
      }>(
        `${API_URL}/api/upload`,
        fd,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        imageUrl: res.data.imageUrl,
      }));

      console.log(
        'Main image uploaded:',
        res.data.imageUrl
      );
    } catch (error) {
      console.error(
        'Main image upload failed:',
        error
      );

      alert(
        'Image upload failed. Please try again.'
      );
    } finally {
      setIsUploadingMain(false);
    }
  };

  // =========================================================
  // SUB IMAGES UPLOAD
  // =========================================================

  const handleSubImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    try {
      setIsUploadingSub(true);

      const fd = new FormData();

      for (
        let i = 0;
        i < files.length;
        i++
      ) {
        const file = files[i];

        if (file.type === 'application/pdf') {
          try {
            const extractedImages =
              await convertPdfToImages(file);

            extractedImages.forEach(
              (image) => {
                fd.append(
                  'images',
                  image
                );
              }
            );
          } catch (error) {
            console.error(
              `PDF conversion failed: ${file.name}`,
              error
            );

            alert(
              `Failed to extract images from PDF: ${file.name}`
            );
          }
        } else {
          fd.append(
            'images',
            file
          );
        }
      }

      const res = await axios.post<{
        imageUrls: string[];
      }>(
        `${API_URL}/api/subImagesUpload`,
        fd,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      );

      setFormData((prev) => ({
        ...prev,

        subImageUrls: [
          ...prev.subImageUrls,
          ...res.data.imageUrls,
        ],
      }));

      console.log(
        'Sub images uploaded:',
        res.data.imageUrls
      );
    } catch (error) {
      console.error(
        'Sub image upload failed:',
        error
      );

      alert(
        'Sub image upload failed. Please try again.'
      );
    } finally {
      setIsUploadingSub(false);
    }
  };

  // =========================================================
  // FETCH PROJECTS
  // =========================================================

  const fetchProjects = async () => {
    try {
      const res =
        await axios.get<Project[]>(
          `${API_URL}/api/projects`
        );

      setProjects(res.data);

      console.log(
        'Projects loaded:',
        res.data
      );
    } catch (error) {
      console.error(
        'Error fetching projects:',
        error
      );
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // =========================================================
  // ADD / UPDATE PROJECT
  // =========================================================

  const handleAddOrUpdate = async () => {
    if (!formData.name.trim()) {
      alert(
        'Please enter project name.'
      );

      return;
    }

    if (!formData.description.trim()) {
      alert(
        'Please enter project description.'
      );

      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        name: formData.name.trim(),

        description:
          formData.description.trim(),

        imageUrl:
          formData.imageUrl,

        subImageUrls:
          formData.subImageUrls,

        bedrooms:
          formData.bedrooms,

        bathrooms:
          formData.bathrooms,

        kitchen:
          formData.kitchen,

        living:
          formData.living,

        area:
          formData.area,

        cost:
          formData.cost,
      };

      console.log(
        'Project payload:',
        payload
      );

      if (currentProject) {
        await axios.put(
          `${API_URL}/api/projects/${currentProject._id}`,
          payload
        );
      } else {
        await axios.post(
          `${API_URL}/api/projects`,
          payload
        );
      }

      await fetchProjects();

      closeModal();
    } catch (error) {
      console.error(
        'Error saving project:',
        error
      );

      if (axios.isAxiosError(error)) {
        console.error(
          'Backend response:',
          error.response?.data
        );
      }

      alert(
        'Failed to save project.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  // =========================================================
  // DELETE PROJECT
  // =========================================================

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        'Delete this project?'
      );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/projects/${id}`
      );

      await fetchProjects();
    } catch (error) {
      console.error(
        'Error deleting project:',
        error
      );

      alert(
        'Failed to delete project.'
      );
    }
  };

  // =========================================================
  // MODAL
  // =========================================================

  const openModal = (
    project?: Project
  ) => {
    if (project) {
      setCurrentProject(project);

      setFormData({
        imageUrl:
          project.imageUrl || '',

        subImageUrls:
          project.subImageUrls || [],

        name:
          project.name || '',

        description:
          project.description || '',

        bedrooms:
          project.bedrooms?.toString() ||
          '',

        bathrooms:
          project.bathrooms?.toString() ||
          '',

        kitchen:
          project.kitchen?.toString() ||
          '',

        living:
          project.living?.toString() ||
          '',

        area:
          project.area?.toString() ||
          '',

        cost:
          project.cost?.toString() ||
          '',
      });
    } else {
      setCurrentProject(null);

      setFormData({
        ...initialFormData,
        subImageUrls: [],
      });
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    setCurrentProject(null);

    setFormData({
      ...initialFormData,
      subImageUrls: [],
    });
  };

  // =========================================================
  // REMOVE SUB IMAGE
  // =========================================================

  const removeSubImage = (
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,

      subImageUrls:
        prev.subImageUrls.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div>
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Projects
        </h2>

        <button
          onClick={() =>
            openModal()
          }
          className="bg-lime-400 text-slate-900 px-4 py-2 rounded hover:bg-lime-500"
        >
          Add Project
        </button>
      </div>

      {/* PROJECT TABLE */}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 border border-slate-700">

          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Preview
              </th>

              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Name
              </th>

              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Description
              </th>

              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Bedrooms
              </th>

              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Bathrooms
              </th>

              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Kitchen
              </th>

              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Living
              </th>

              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Area
              </th>

              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Cost
              </th>

              <th className="py-2 px-4 border-b border-slate-700 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {projects.map(
              (project) => (
                <tr
                  key={
                    project._id
                  }
                >
                  {/* IMAGE */}

                  <td className="py-2 px-4 border-b border-slate-700">
                    {project.imageUrl ? (
                      <img
                        src={
                          project.imageUrl
                        }
                        alt={
                          project.name
                        }
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-slate-700 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-400">
                          No Image
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="py-2 px-4 border-b border-slate-700">
                    {
                      project.name
                    }
                  </td>

                  <td className="py-2 px-4 border-b border-slate-700 max-w-xs">
                    <p className="line-clamp-3">
                      {
                        project.description
                      }
                    </p>
                  </td>

                  <td className="py-2 px-4 border-b border-slate-700">
                    {project.bedrooms ||
                      '-'}
                  </td>

                  <td className="py-2 px-4 border-b border-slate-700">
                    {project.bathrooms ||
                      '-'}
                  </td>

                  <td className="py-2 px-4 border-b border-slate-700">
                    {project.kitchen ||
                      '-'}
                  </td>

                  <td className="py-2 px-4 border-b border-slate-700">
                    {project.living ||
                      '-'}
                  </td>

                  <td className="py-2 px-4 border-b border-slate-700">
                    {project.area ||
                      '-'}
                  </td>

                  <td className="py-2 px-4 border-b border-slate-700">
                    {project.cost ||
                      '-'}
                  </td>

                  <td className="py-2 px-4 border-b border-slate-700 whitespace-nowrap">
                    <button
                      onClick={() =>
                        openModal(
                          project
                        )
                      }
                      className="text-lime-400 hover:underline mr-3"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          project._id
                        )
                      }
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}

            {projects.length ===
              0 && (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-10 text-gray-400"
                >
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================================================= */}
      {/* ADD / UPDATE MODAL */}
      {/* ================================================= */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

          <div className="bg-slate-800 p-6 rounded-xl w-full max-w-3xl overflow-y-auto max-h-[90vh] shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-2xl font-semibold text-white">
                {currentProject
                  ? 'Update Project'
                  : 'Add Project'}
              </h3>

              <button
                type="button"
                onClick={
                  closeModal
                }
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* NAME */}

            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-300">
                Project Name *
              </label>

              <input
                type="text"
                placeholder="Project Name"
                value={
                  formData.name
                }
                onChange={(e) =>
                  setFormData(
                    (prev) => ({
                      ...prev,
                      name: e
                        .target
                        .value,
                    })
                  )
                }
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white outline-none focus:border-lime-400"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-300">
                Description *
              </label>

              <textarea
                placeholder="Project Description"
                value={
                  formData.description
                }
                rows={4}
                onChange={(e) =>
                  setFormData(
                    (prev) => ({
                      ...prev,
                      description:
                        e.target
                          .value,
                    })
                  )
                }
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white outline-none focus:border-lime-400 resize-none"
              />
            </div>

            {/* PROJECT DETAILS */}

            <h4 className="text-lg font-semibold text-white mb-4">
              Project Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

              {/* BEDROOMS */}

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Bedrooms
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 3"
                  value={
                    formData.bedrooms
                  }
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        bedrooms:
                          e.target
                            .value,
                      })
                    )
                  }
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white outline-none focus:border-lime-400"
                />
              </div>

              {/* BATHROOMS */}

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Bathrooms
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 2"
                  value={
                    formData.bathrooms
                  }
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        bathrooms:
                          e.target
                            .value,
                      })
                    )
                  }
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white outline-none focus:border-lime-400"
                />
              </div>

              {/* KITCHEN */}

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Kitchen
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 2"
                  value={
                    formData.kitchen
                  }
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        kitchen:
                          e.target
                            .value,
                      })
                    )
                  }
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white outline-none focus:border-lime-400"
                />
              </div>

              {/* LIVING */}

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Living
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 1"
                  value={
                    formData.living
                  }
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        living:
                          e.target
                            .value,
                      })
                    )
                  }
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white outline-none focus:border-lime-400"
                />
              </div>

              {/* AREA */}

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Area
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 40000"
                  value={
                    formData.area
                  }
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        area: e
                          .target
                          .value,
                      })
                    )
                  }
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white outline-none focus:border-lime-400"
                />
              </div>

              {/* COST */}

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Cost (Rs.)
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 10000000"
                  value={
                    formData.cost
                  }
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        cost: e
                          .target
                          .value,
                      })
                    )
                  }
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white outline-none focus:border-lime-400"
                />
              </div>
            </div>

            {/* MAIN IMAGE */}

            <div className="mb-6">
              <label className="block mb-2 text-white font-medium">
                Main Project Photo
              </label>

              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={
                  handleImageChange
                }
                disabled={
                  isUploadingMain
                }
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white"
              />

              {isUploadingMain && (
                <p className="text-lime-400 text-sm mt-2">
                  Uploading main
                  image...
                </p>
              )}

              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm text-lime-400 mb-2">
                    Main Photo Preview
                  </p>

                  <img
                    src={
                      formData.imageUrl
                    }
                    alt="Main project preview"
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* SUB IMAGES */}

            <div className="mb-6">
              <label className="block mb-2 text-white font-medium">
                Gallery / Sub Photos
              </label>

              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={
                  handleSubImageChange
                }
                disabled={
                  isUploadingSub
                }
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white"
              />

              {isUploadingSub && (
                <p className="text-lime-400 text-sm mt-2">
                  Uploading gallery
                  images...
                </p>
              )}

              {formData
                .subImageUrls
                .length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">

                  {formData.subImageUrls.map(
                    (
                      image,
                      index
                    ) => (
                      <div
                        key={`${image}-${index}`}
                        className="relative group"
                      >
                        <img
                          src={
                            image
                          }
                          alt={`Gallery image ${
                            index +
                            1
                          }`}
                          className="w-full h-32 object-cover rounded-lg"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeSubImage(
                              index
                            )
                          }
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">

              <button
                type="button"
                onClick={
                  closeModal
                }
                disabled={
                  isSaving
                }
                className="text-white px-5 py-2 rounded hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleAddOrUpdate
                }
                disabled={
                  isSaving ||
                  isUploadingMain ||
                  isUploadingSub
                }
                className="bg-lime-400 hover:bg-lime-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 px-6 py-2 rounded font-medium"
              >
                {isSaving
                  ? 'Saving...'
                  : currentProject
                  ? 'Update Project'
                  : 'Save Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;