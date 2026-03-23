import axios from "axios";
import { useState } from "react";

interface Service {
    _id: string;
    name: string;
    desc: string;
    exp: number;
    benifits: string[];
}

export const AdminServices = () => {
    const [service, setService] = useState<Service[]>([])
    const [currentService, setCurrentService] = useState<Service | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [formData, setFormData] = useState ({
        name: '',
        desc: '',
        exp:0 ,
        benifits: [] as string[]
    });

    const openModal = (service?: Service) => {
    setCurrentService(service || null);
    setFormData(service ? {
      name: service.name || '',
      desc: service.desc || '',
      exp: service.exp || 0 ,
      benifits: service.benifits || ''
    } : {
      name: '',
      desc: '',
      exp: 0,
      benifits: []
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchService = async () => {
    try {
      const res = await axios.get('https://design-architecture-be.vercel.app/api/services');
      setService(res.data);
      console.log("Service loaded:", res.data);
    } catch (err) {
      console.error('Error fetching Service:', err);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (currentService) {
        await axios.put(`https://design-architecture-be.vercel.app/api/services/${currentService._id}`, formData);
      } else {
        await axios.post('https://design-architecture-be.vercel.app/api/services', formData);
      }
      fetchService();
      closeModal();
    } catch (err) {
      console.error('Error saving Service:', err);
      alert("Failed to save Service");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this Service?')) {
      try {
        await axios.delete(`https://design-architecture-be.vercel.app/api/services/${id}`);
        fetchService();
      } catch (err) {
        console.error('Error deleting:', err);
      }
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Services</h2>
        <button
          onClick={() => openModal()}
          className="bg-lime-400 text-slate-900 px-4 py-2 rounded hover:bg-lime-500"
        >
          Add Service
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 border border-slate-700">
          <thead>
            <tr>
              <th className='py-2 px-4 border-b border-slate-700 text-left'>Name</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Description</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Experience</th>
              <th className="py-2 px-4 border-b border-slate-700 text-left">Benifits</th>
            </tr>
          </thead>
          <tbody>
            {service.map((services) => (
              <tr key={services._id}>
                <td className="py-2 px-4 border-b border-slate-700">{services.name}</td>
                <td className="py-2 px-4 border-b border-slate-700">{services.desc}</td>
                <td className="py-2 px-4 border-b border-slate-700">{services.exp}</td>
                <td className="py-2 px-4 border-b border-slate-700">{services.benifits}</td>
                <td className="py-2 px-4 border-b border-slate-700">
                  <button onClick={() => openModal(services)} className="text-lime-400 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(services._id)} className="text-red-400 hover:underline">Delete</button>
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
            <h3 className="text-xl mb-4">{currentService ? 'Update service' : 'Add Service'}</h3>
            <input 
              type="text" 
              placeholder="Name" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              className="w-[300px] mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />
            <input
              type="number" 
              placeholder="Enter Experience(Years)" 
              value={formData.exp} 
              onChange={(e) => setFormData({ ...formData, exp: Number(e.target.value) })} 
              className="w-[300px] ml-5 mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />
            <textarea  
              placeholder="Description" 
              value={formData.desc} 
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })} 
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />
                    
            <textarea  
              placeholder="Benifits of Customers" 
              value={formData.benifits} 
              onChange={(e) => setFormData({ ...formData, benifits: e.target.value.split(",") })} 
              className="w-full mb-4 p-2 bg-slate-700 border border-slate-600 rounded text-white" 
            />

            <div className="flex justify-end gap-3">
              <button onClick={closeModal} className="text-white px-4 py-2">Cancel</button>
              <button onClick={handleAddOrUpdate} className="bg-lime-400 text-slate-900 px-6 py-2 rounded font-medium">Save Service</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default AdminServices;
