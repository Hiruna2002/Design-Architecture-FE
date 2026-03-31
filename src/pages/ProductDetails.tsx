// import axios from "axios";
// import { motion, AnimatePresence } from "motion/react"
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom";

// interface Project {
//     id: string;
//     name: string;
//     description: string;
//     imageUrl: string;
//     subImageUrls: string[];
//     // category: string;
//     cost: string;
//     area: string;
// }

// const ProductDetails = () => {
//     const [project, setProject] = useState<Project>()
//     const { id } = useParams()
//     const [selectedImage, setSelectedImage] = useState<string | null>(null);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         console.log("Navigate Project Details form")
//         fetchProduct();
//     }, [id]);

//     const fetchProduct = async () => {
//         try {
//             const res = await axios.get(`https://design-architecture-be.vercel.app/api/projects/${id}`);
//             setProject(res.data);
//             console.log("sub images is: ", res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     return (
//         <div className="min-h-screen relative">
//             {/* Glass box / Lightbox Modal */}
//             <AnimatePresence>
//                 {selectedImage && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-8"
//                         onClick={() => setSelectedImage(null)}
//                     >
//                         <button
//                             className="absolute top-6 right-6 text-white text-5xl hover:text-lime-400 transition-colors z-[60]"
//                             onClick={() => setSelectedImage(null)}
//                         >
//                             &times;
//                         </button>
//                         <motion.img
//                             initial={{ scale: 0.9, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             exit={{ scale: 0.9, opacity: 0 }}
//                             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                             src={selectedImage}
//                             className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/20 z-50"
//                             onClick={(e) => e.stopPropagation()}
//                             onContextMenu={(e) => e.preventDefault()}
//                             draggable={false}
//                         />
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Hero Section */}
//             <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-5">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="text-center"
//                     >
//                         <h1 className="text-5xl md:text-6xl mb-4">Product Details</h1>
//                         <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-6"></div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Grid Section */}
//             <section className="py-12 bg-slate-800">
//                 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex items-center justify-center">
//                     <img
//                         src={project?.imageUrl}
//                         alt={project?.name}
//                         className="w-[400px] h-auto object-cover rounded-xl shadow-xl border border-slate-600 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
//                         onClick={() => project?.imageUrl && setSelectedImage(project.imageUrl)}
//                         onContextMenu={(e) => e.preventDefault()}
//                         draggable={false}
//                     />
//                 </div>
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ml-80">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
//                         {project?.subImageUrls?.map((subImageUrl, idx) => (
//                             <div
//                                 key={idx}
//                                 className="group bg-slate-700/40 backdrop-blur-sm border border-slate-600 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 cursor-pointer"
//                                 onClick={() => setSelectedImage(subImageUrl)}
//                             >
//                                 <div className="relative overflow-hidden h-64">
//                                     <img
//                                         src={subImageUrl}
//                                         alt={project?.name}
//                                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                         onContextMenu={(e) => e.preventDefault()}
//                                         draggable={false}
//                                     />
//                                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
//                                         <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
//                                             View Image
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="bg-white w-[840px] h-auto mt-10 ml-[250px]">
//                     <p className="text-black">{project?.description}</p>
//                     <span className="flex gap-8 mt-2">
//                         <p>Bedrooms: 3</p>
//                         <p>Bathrooms: 2</p>
//                         <p>Kitchen: 2</p>
//                         <p>Dining Room: 1</p>
//                         <p>Living Room: 1</p>
//                     </span>
                    
//                     <span className="flex gap-20 mt-2">
//                         <p>Area: {project?.area}ft</p>
//                         <p className="mb-3">Cost: Rs. {project?.cost}</p>
//                     </span>
                    
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default ProductDetails


import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  subImageUrls: string[];
  cost: string;
  area: string;
}

const ProductDetails = () => {
  const [project, setProject] = useState<Project>();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Navigate Project Details form");
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://design-architecture-be.vercel.app/api/projects/${id}`
      );
      setProject(res.data);
      console.log("sub images is: ", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-4xl sm:text-5xl hover:text-[#a3e635] transition-colors z-[60]"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20 z-50"
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b] py-14 sm:py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#a3e635]/30 bg-[#a3e635]/10 px-4 py-2 text-sm text-[#a3e635] mb-5">
              Project Showcase
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-4">
              Product Details
            </h1>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-3 sm:p-6 shadow-2xl shadow-black/20">
            <div className="w-full flex justify-center">
              <img
                src={project?.imageUrl}
                alt={project?.name}
                className="w-full max-w-4xl h-[240px] sm:h-[380px] md:h-[520px] object-cover rounded-2xl shadow-xl border border-white/10 cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                onClick={() => project?.imageUrl && setSelectedImage(project.imageUrl)}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
            </div>
          </div>

          {/* Content Grid */}
          <div className="mt-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Details Card */}
            <div className="xl:col-span-4 order-2 xl:order-1">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-[#0f172a] px-5 sm:px-6 py-5">
                  <h2 className="text-2xl font-semibold text-white">
                    Project Overview
                  </h2>
                  <p className="text-white/70 text-sm mt-1">
                    Key information about this project
                  </p>
                </div>

                <div className="p-5 sm:p-6 space-y-5 text-[#0f172a]">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                      Description
                    </h3>
                    <p className="text-sm sm:text-base leading-7 text-gray-700">
                      {project?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-[#0f172a] text-white p-4">
                      <p className="text-xs text-white/60">Bedrooms</p>
                      <p className="text-2xl font-semibold mt-1">3</p>
                    </div>
                    <div className="rounded-2xl bg-[#a3e635] text-[#0f172a] p-4">
                      <p className="text-xs text-[#0f172a]/70">Bathrooms</p>
                      <p className="text-2xl font-semibold mt-1">2</p>
                    </div>
                    <div className="rounded-2xl bg-[#f8fafc] border border-slate-200 p-4">
                      <p className="text-xs text-gray-500">Kitchen</p>
                      <p className="text-2xl font-semibold mt-1">2</p>
                    </div>
                    <div className="rounded-2xl bg-[#f8fafc] border border-slate-200 p-4">
                      <p className="text-xs text-gray-500">Living</p>
                      <p className="text-2xl font-semibold mt-1">1</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs text-gray-500">Area</p>
                      <p className="text-lg font-semibold text-[#0f172a] mt-1">
                        {project?.area}ft
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#a3e635]/30 bg-[#a3e635]/10 p-4">
                      <p className="text-xs text-gray-600">Cost</p>
                      <p className="text-lg font-semibold text-[#0f172a] mt-1">
                        Rs. {project?.cost}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="xl:col-span-8 order-1 xl:order-2">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                      Gallery
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                      Tap any image to view larger
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project?.subImageUrls?.map((subImageUrl, idx) => (
                    <div
                      key={idx}
                      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedImage(subImageUrl)}
                    >
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={subImageUrl}
                          alt={project?.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onContextMenu={(e) => e.preventDefault()}
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm">
                            View Image
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;