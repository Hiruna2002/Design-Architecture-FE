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
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center md:items-start justify-center bg-cover bg-center">

        <div className='absolute overflow-hidden w-full h-full'>
          <img src={image} className='w-full -z-10' alt="" />
        </div>

        <div className='bg-[#03002e80] w-full h-full z-10 absolute'></div>

        <div className="absolute z-20 inset-0 bg-gradient-to-b from-transparent to-[#0f172a]/50"></div>
        <div className="relative z-30 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center mx-auto xl:mt-8">
                <img src={logo} alt='Logo' className=" w-80 h-80 xl:w-[500px] xl:h-[500px]" />
              </div>
            </div>
            {/* <h1 className="text-5xl md:text-7xl mb-4 tracking-tight">
              LS MASTER BUILDERS
            </h1> */}
            <p className="text-xl md:text-2xl xl:text-5xl mb-3 text-[#a3e635]">
              Architectural Designer
            </p>
            <p className="text-2xl md:text-3xl xl:text-6xl mb-8 italic">
              "We design your vision into reality!"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center xl:w-[500px] mx-auto">
              <Link
                to="/projects"
                className="bg-[#a3e635] text-[#0f172a] px-8 py-4 rounded hover:bg-[#bef264] transition-all duration-300 inline-flex items-center justify-center group xl:text-2xl"
              >
                View Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-[#a3e635] text-[#a3e635] px-8 py-4 rounded hover:bg-[#a3e635] hover:text-[#0f172a] transition-all duration-300 inline-flex items-center justify-center xl:text-2xl"
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#a3e635]"
              >
                <div className="flex mb-4">
                  {[...Array(f.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 xl:w-10 xl:h-10 text-[#a3e635] fill-[#a3e635]"
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-4 italic xl:text-2xl">"{f.message}"</p>
                <p className="text-[#0f172a] xl:text-3xl">- {f.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home


// import { Link } from 'react-router-dom';
// import { ArrowRight, Building2, Ruler, Hammer, Star } from 'lucide-react';
// import { motion } from 'motion/react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import logo from '../assets/111.png';
// import image from '../assets/bg.jpg';

// interface Project {
//   _id: string;
//   name: string;
//   imageUrl: string;
// }

// interface Service {
//   _id: string;
//   name: string;
//   desc: string;
//   exp: number;
//   benifits: string[];
// }

// interface Feedback {
//   _id: string;
//   name: string;
//   message: string;
//   rating: number;
//   createdAt?: string;
// }

// function Home() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [services, setServices] = useState<Service[]>([]);
//   const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllProjects();
//     getAllServices();
//     fetchFeedbacks();
//     checkAuth();
//   }, []);

//   const getAllServices = async () => {
//     try {
//       const res = await axios.get('https://design-architecture-be.vercel.app/api/services')
//       setServices(res.data);
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const getAllProjects = async () => {
//     try {
//       const res = await axios.get('https://design-architecture-be.vercel.app/api/projects')
//       setProjects(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const fetchFeedbacks = async () => {
//     try {
//       const res = await axios.get<Feedback[]>(
//         "https://design-architecture-be.vercel.app/api/feedback"
//       );
//       setFeedbacks(res.data);
//     } catch (err) {
//       console.error("Error fetching feedbacks:", err);
//     }
//   };

//   const handleServices = (id: string) => {
//     navigate(`/services/${id}`)
//   }

//   const handleProject = (id: string) => {
//     navigate(`/projects/${id}`)
//   }

//   const checkAuth = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.get(
//         "https://design-architecture-be.vercel.app/api/users/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return true;
//     } catch (err) {
//       return false;
//     }
//   }

//   return (
//     <div className="min-h-screen">

//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center bg-cover bg-center">

//         <div className='absolute overflow-hidden w-full h-full'>
//           <img src={image} className='w-full h-full object-cover -z-10' alt="" />
//         </div>

//         <div className='bg-[#03002e80] w-full h-full z-10 absolute'></div>
//         <div className="absolute z-20 inset-0 bg-gradient-to-b from-transparent to-[#0f172a]/50"></div>

//         {/* ONLY xl & 2xl updated */}
//         <div className="relative z-30 text-center text-white px-4 max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="inline-block mb-6">
//               <div className="flex items-center justify-center mx-auto">
//                 <img src={logo} alt='Logo'
//                   className="w-40 xl:w-80 2xl:w-[30rem] h-auto" />
//               </div>
//             </div>

//             <p className="text-lg xl:text-3xl 2xl:text-4xl mb-3 text-[#a3e635]">
//               Architectural Designer
//             </p>

//             <p className="text-xl xl:text-3xl 2xl:text-5xl mb-8 italic">
//               "We design your vision into reality!"
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/projects"
//                 className="bg-[#a3e635] text-[#0f172a] px-6 py-3 xl:px-10 xl:py-5 2xl:px-12 2xl:py-6 rounded hover:bg-[#bef264]"
//               >
//                 View Projects
//                 <ArrowRight className="ml-2 inline" size={20} />
//               </Link>

//               <Link
//                 to="/contact"
//                 className="border-2 border-[#a3e635] text-[#a3e635] px-6 py-3 xl:px-10 xl:py-5 2xl:px-12 2xl:py-6 rounded hover:bg-[#a3e635] hover:text-[#0f172a]"
//               >
//                 Get a Quote
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Highlights */}
//       <section className="bg-white py-16 xl:py-24 2xl:py-32">
//         <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4">

//           <div className="grid grid-cols-1 md:grid-cols-3 xl:gap-12 2xl:gap-16 gap-8">

//             {[Building2, Ruler, Hammer].map((Icon, i) => (
//               <div key={i} className="text-center p-6 bg-gray-50 rounded-lg">
//                 <Icon className="w-10 h-10 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 mx-auto mb-4 text-[#0f172a]" />
//                 <h3 className="text-lg xl:text-2xl 2xl:text-3xl mb-2">
//                   {["Modern Architectural Excellence", "Innovative Structural Solutions", "Professional Construction Planning"][i]}
//                 </h3>
//                 <p className="text-gray-600 xl:text-lg 2xl:text-xl">
//                   {["Contemporary designs that blend aesthetics with functionality", "Engineering precision in every project we undertake", "Seamless execution from concept to completion"][i]}
//                 </p>
//               </div>
//             ))}

//           </div>
//         </div>
//       </section>

//       {/* Services */}
//       <section className="bg-[#0f172a] py-16 xl:py-24 2xl:py-32">
//         <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4">

//           <h2 className="text-3xl xl:text-5xl 2xl:text-6xl text-white text-center mb-12">
//             Our Services
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
//             {services.map((service) => (
//               <div
//                 key={service._id}
//                 onClick={() => handleServices(service._id)}
//                 className="bg-[#1e293b] p-6 xl:p-8 2xl:p-10 rounded-lg cursor-pointer border hover:border-[#a3e635]"
//               >
//                 <h3 className="text-white xl:text-xl 2xl:text-2xl mb-2">{service.name}</h3>
//                 <p className="text-gray-400 xl:text-lg">{service.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Projects */}
//       <section className="bg-white py-16 xl:py-24 2xl:py-32">
//         <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4">

//           <h2 className="text-3xl xl:text-5xl 2xl:text-6xl text-center mb-12">
//             Featured Projects
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {projects.slice(0, 4).map((project) => (
//               <div key={project._id} className="cursor-pointer" onClick={() => handleProject(project._id)}>
//                 <img
//                   src={project.imageUrl}
//                   className="w-full h-60 xl:h-80 2xl:h-96 object-cover rounded"
//                 />
//                 <h3 className="mt-2 xl:text-xl 2xl:text-2xl">{project.name}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="bg-gray-50 py-16 xl:py-24 2xl:py-32">
//         <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4">

//           <h2 className="text-3xl xl:text-5xl 2xl:text-6xl text-center mb-12">
//             Client Testimonials
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
//             {feedbacks.slice(0, 4).map((f, index) => (
//               <div key={index} className="bg-white p-6 xl:p-8 2xl:p-10 rounded-lg shadow-md">
//                 <div className="flex mb-4">
//                   {[...Array(f.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-[#a3e635] fill-[#a3e635]" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 xl:text-lg 2xl:text-xl mb-4 italic">"{f.message}"</p>
//                 <p className="text-[#0f172a] xl:text-lg 2xl:text-xl">- {f.name}</p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// }

// export default Home;