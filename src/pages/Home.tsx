import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Ruler, Hammer, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  imageUrl: string;
}

interface Service {
  _id: string;
  name: string;
  desc: string;
  exp: number;
  benifits: string[];
}

function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const navigate = useNavigate();

  useEffect(()=> {
    getAllProjects();
    getAllServices();
  }, []);

  const getAllServices = async() => {
    try{
      const res = await axios.get('https://design-architecture-be.vercel.app/api/services')
      setServices(res.data);
    } catch(error){
      console.error(error)
    }
  }

  const getAllProjects = async() => {
    try{
      const res = await axios.get('https://design-architecture-be.vercel.app/api/projects')
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const testimonials = [
    {
      name: 'Rajitha Fernando',
      text: 'Exceptional architectural design! Lahiru transformed our vision into reality with perfect precision.',
      rating: 5
    },
    {
      name: 'Nimal Perera',
      text: 'Professional service from start to finish. The 3D visualizations helped us make confident decisions.',
      rating: 5
    },
    {
      name: 'Chamari Silva',
      text: 'Outstanding renovation design work. Highly recommended for anyone seeking quality architectural services.',
      rating: 5
    }
  ];

  const handleServices = (id: string) => {
    console.log("Clicked ID:", id);
    navigate(`/services/${id}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmFsJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NzEyMzkzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]/50"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-[#a3e635] rotate-45 flex items-center justify-center mx-auto">
                <span className="text-[#0f172a] -rotate-45 text-3xl">LS</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl mb-4 tracking-tight">
              LS MASTER BUILDERS
            </h1>
            <p className="text-xl md:text-2xl mb-3 text-[#a3e635]">
              Architectural Designer
            </p>
            <p className="text-2xl md:text-3xl mb-8 italic">
              "We design your vision into reality!"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="bg-[#a3e635] text-[#0f172a] px-8 py-4 rounded hover:bg-[#bef264] transition-all duration-300 inline-flex items-center justify-center group"
              >
                View Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-[#a3e635] text-[#a3e635] px-8 py-4 rounded hover:bg-[#a3e635] hover:text-[#0f172a] transition-all duration-300 inline-flex items-center justify-center"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-[#a3e635]/30 rotate-45"></div>
        <div className="absolute bottom-40 right-20 w-16 h-16 border-4 border-[#a3e635]/20 rotate-12"></div>
      </section>

      {/* Highlights Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 bg-gray-50 rounded-lg border-l-4 border-[#a3e635]"
            >
              <Building2 className="w-12 h-12 mx-auto mb-4 text-[#0f172a]" />
              <h3 className="text-xl mb-2">Modern Architectural Excellence</h3>
              <p className="text-gray-600">Contemporary designs that blend aesthetics with functionality</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-gray-50 rounded-lg border-l-4 border-[#a3e635]"
            >
              <Ruler className="w-12 h-12 mx-auto mb-4 text-[#0f172a]" />
              <h3 className="text-xl mb-2">Innovative Structural Solutions</h3>
              <p className="text-gray-600">Engineering precision in every project we undertake</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-6 bg-gray-50 rounded-lg border-l-4 border-[#a3e635]"
            >
              <Hammer className="w-12 h-12 mx-auto mb-4 text-[#0f172a]" />
              <h3 className="text-xl mb-2">Professional Construction Planning</h3>
              <p className="text-gray-600">Seamless execution from concept to completion</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-white mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                onClick={() => handleServices(service._id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1e293b] p-6 rounded-lg hover:shadow-xl hover:shadow-[#a3e635]/10 transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-[#a3e635]"
              >
                {/* <div className="text-[#a3e635] mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div> */}
                <h3 className="text-xl text-white mb-2">{service.name}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-[#a3e635] text-[#0f172a] px-8 py-3 rounded hover:bg-[#bef264] transition-all inline-flex items-center"
            >
              View All Services
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(projects) ? (
              projects.map((project, index) => (
                <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              >
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl">{project.name}</h3>
                  </div>
                </div>
              </motion.div>
              ))
            ) : (
              <p>No Projects Available</p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="bg-[#0f172a] text-white px-8 py-3 rounded hover:bg-[#1e293b] transition-all inline-flex items-center"
            >
              View All Projects
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Client Testimonials</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#a3e635]"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#a3e635] fill-[#a3e635]" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-[#0f172a]">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home