import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Ruler, Hammer, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from '../assets/111.png';
import image from '../assets/bg.jpg';


interface Project {
  _id: string;
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

interface Feedback {
  _id: string;
  name: string;
  message: string;
  rating: number;
  createdAt?: string;
}

function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects();
    getAllServices();
    fetchFeedbacks();
    checkAuth();
  }, []);

  const getAllServices = async () => {
    try {
      const res = await axios.get('https://design-architecture-be.vercel.app/api/services')
      setServices(res.data);
    } catch (error) {
      console.error(error)
    }
  }

  const getAllProjects = async () => {
    try {
      const res = await axios.get('https://design-architecture-be.vercel.app/api/projects')
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get<Feedback[]>(
        "https://design-architecture-be.vercel.app/api/feedback"
      );
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  const handleServices = (id: string) => {
    console.log("Clicked ID:", id);
    navigate(`/services/${id}`)
  }

  const handleProject = (id: string) => {
    navigate(`/projects/${id}`)
  }

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token is: ", token)

      const res = await axios.get(
        "https://design-architecture-be.vercel.app/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User logged in:", res.data);
      return true;

    } catch (err) {
      console.log("Not logged in");
      return false;
    }
  }

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[100svh] md:min-h-screen overflow-hidden pt-16 sm:pt-20 md:pt-24 flex items-start md:items-center justify-center bg-[#0f172a]">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Architectural background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#03002e]/75"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#03002e]/40 to-[#0f172a]/90"></div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-white mt-6 md:mt-0">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-center text-center md:text-center gap-4"
          >

            {/* Logo */}
            <img
              src={logo}
              alt="Logo"
              className="mt-10 w-[500px] sm:w-52 sm:h-52 md:mt-0 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
            />

            {/* Title */}
            <p className="text-3xl sm:text-2xl md:text-3xl lg:text-5xl text-[#a3e635] font-semibold leading-tight">
              Architectural Designer
            </p>

            {/* Subtitle */}
            <p className="text-xl sm:text-lg md:text-2xl lg:text-4xl italic max-w-md sm:max-w-2xl md:max-w-3xl leading-relaxed">
              "We design your vision into reality!"
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-12">

              <Link
                to="/projects"
                className="w-full sm:w-auto bg-[#a3e635] text-[#0f172a] px-6 py-3.5 
                  rounded-lg text-base font-medium flex items-center justify-center gap-2 
                  hover:bg-[#bef264] transition-all"
              >
                View Projects
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="mt-4 w-full sm:w-auto border-2 border-[#a3e635] text-[#a3e635] px-6 
                  py-3.5 rounded-lg text-base font-medium flex items-center justify-center 
                  hover:bg-[#a3e635] hover:text-[#0f172a] transition-all md:mt-0"
              >
                Get a Quote
              </Link>

            </div>

          </motion.div>
        </div>

        {/* Decorative shapes (ONLY desktop) */}
        <div className="hidden md:block absolute top-24 left-10 w-16 h-16 border-4 border-[#a3e635]/30 rotate-45"></div>
        <div className="hidden md:block absolute bottom-24 right-10 w-14 h-14 border-4 border-[#a3e635]/20 rotate-12"></div>

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
              <Building2 className="w-12 h-12 xl:w-20 xl:h-20 mx-auto mb-4 text-[#0f172a]" />
              <h3 className="text-xl xl:text-3xl mb-2">Modern Architectural Excellence</h3>
              <p className="text-gray-600 xl:text-xl">Contemporary designs that blend aesthetics with functionality</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-gray-50 rounded-lg border-l-4 border-[#a3e635]"
            >
              <Ruler className="w-12 h-12 xl:w-20 xl:h-20 mx-auto mb-4 text-[#0f172a]" />
              <h3 className="text-xl xl:text-3xl mb-2">Innovative Structural Solutions</h3>
              <p className="text-gray-600 xl:text-xl">Engineering precision in every project we undertake</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-6 bg-gray-50 rounded-lg border-l-4 border-[#a3e635]"
            >
              <Hammer className="w-12 h-12 xl:w-20 xl:h-20 mx-auto mb-4 text-[#0f172a]" />
              <h3 className="text-xl xl:text-3xl mb-2">Professional Construction Planning</h3>
              <p className="text-gray-600 xl:text-xl">Seamless execution from concept to completion</p>
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
            <h2 className="text-4xl xl:text-6xl text-white mb-4">Our Services</h2>
            <div className="w-24 h-1 xl:w-48 xl:h-2 bg-[#a3e635] mx-auto"></div>
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
                <h3 className="text-xl xl:text-3xl text-white mb-2">{service.name}</h3>
                <p className="text-gray-400 xl:text-xl">{service.desc}</p>
              </motion.div>
            ))}
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
            <h2 className="text-4xl xl:text-6xl mb-4">Featured Projects</h2>
            <div className="w-24 h-1 xl:w-48 xl:h-2 bg-[#a3e635] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:h-[400px]">
            {Array.isArray(projects) ? (
              projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project._id}
                  onClick={() => handleProject(project._id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full xl:w-full xl:h-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl xl:text-3xl">{project.name}</h3>
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
              className="bg-[#0f172a] text-white px-8 py-3 rounded hover:bg-[#1e293b] transition-all inline-flex items-center xl:h-16 xl:text-2xl"
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
            <h2 className="text-4xl xl:text-6xl mb-4">Client Testimonials</h2>
            <div className="w-24 h-1 xl:w-48 xl:h-2 bg-[#a3e635] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:h-[300px]">
            {feedbacks.slice(0, 3).map((f, index) => (
              // <motion.div
              //   key={index}
              //   initial={{ opacity: 0, y: 20 }}
              //   whileInView={{ opacity: 1, y: 0 }}
              //   viewport={{ once: true }}
              //   transition={{ delay: index * 0.1 }}
              //   className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#a3e635]"
              // >
              //   <div className="flex mb-4">
              //     {[...Array(f.rating)].map((_, i) => (
              //       <Star
              //         key={i}
              //         className="w-5 h-5 xl:w-10 xl:h-10 text-[#a3e635] fill-[#a3e635]"
              //       />
              //     ))}
              //   </div>

              //   <p className="text-gray-600 mb-4 italic xl:text-2xl">"{f.message}"</p>
              //   <p className="text-[#0f172a] xl:text-3xl">- {f.name}</p>
              // </motion.div>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white p-6 rounded-lg shadow-md border-t-4 border-[#a3e635]"
              >
                <div className="flex mb-4">
                  {[...Array(f.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 xl:w-10 xl:h-10 text-[#a3e635] fill-[#a3e635]"
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-4 italic xl:text-2xl">
                  "{f.message}"
                </p>
                <p className="text-[#0f172a] xl:text-3xl">
                  - {f.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home