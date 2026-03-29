import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface Project{
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  subImageUrl: [string];
  // category: string;
  cost: string;
  area: string;
}

export default function Projects() {
  // const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);

  const navigate = useNavigate();

  useEffect(()=>{
    getAllProjects();
  },[]);

  const getAllProjects = async () => {
    try{
      const res = await axios.get('https://design-architecture-be.vercel.app/api/projects');
      setProjects(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  const handleProject = (id: string) => {
    navigate(`/projects/${id}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-4">Our Projects</h1>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of completed projects showcasing innovative design solutions
              across residential, commercial, and renovation sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      {/* <section className="bg-white py-8 sticky top-20 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#a3e635] text-[#0f172a]'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(projects) ? (
              projects.map((project, index) => (
                <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleProject(project._id)}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      {/* <p className="text-sm text-[#a3e635] mb-2">{project.category}</p> */}
                      <h3 className="text-xl mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-300">{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {/* <span className="inline-block px-3 py-1 text-xs bg-[#a3e635]/10 text-[#0f172a] rounded-full mb-3">
                    {project.category}
                  </span> */}
                  <h3 className="text-xl mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </motion.div>
              ))
            ) : (
              <p>No projects available or invalid data.</p>
            )}
            </div>
            </div>
            </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6">Start Your Next Project</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 mb-8">
              Ready to transform your architectural vision into reality? 
              Let's discuss your project requirements.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#a3e635] text-[#0f172a] px-8 py-4 rounded hover:bg-[#bef264] transition-all duration-300"
            >
              Contact Us Today
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
