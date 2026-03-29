import axios from "axios";
import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

interface Project {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    subImageUrls: string[];
    // category: string;
    cost: string;
    area: string;
}

const ProductDetails = () => {
    const [project, setProject] = useState<Project>()
    const { id } = useParams()
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log("Navigate Project Details form")
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`https://design-architecture-be.vercel.app/api/projects/${id}`);
            setProject(res.data);
            console.log("sub images is: ", res.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen relative">
            {/* Glass box / Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white text-5xl hover:text-lime-400 transition-colors z-[60]"
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
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/20 z-50"
                            onClick={(e) => e.stopPropagation()}
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl mb-4">Product Details</h1>
                        <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-6"></div>
                    </motion.div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-12 bg-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex items-center justify-center">
                    <img
                        src={project?.imageUrl}
                        alt={project?.name}
                        className="w-[400px] h-auto object-cover rounded-xl shadow-xl border border-slate-600 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                        onClick={() => project?.imageUrl && setSelectedImage(project.imageUrl)}
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ml-80">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {project?.subImageUrls?.map((subImageUrl, idx) => (
                            <div
                                key={idx}
                                className="group bg-slate-700/40 backdrop-blur-sm border border-slate-600 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 cursor-pointer"
                                onClick={() => setSelectedImage(subImageUrl)}
                            >
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={subImageUrl}
                                        alt={project?.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onContextMenu={(e) => e.preventDefault()}
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                            View Image
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white w-[840px] h-auto mt-10 ml-[250px]">
                    <p className="text-black">{project?.description}</p>
                    <span className="flex gap-8 mt-2">
                        <p>Bedrooms: 3</p>
                        <p>Bathrooms: 2</p>
                        <p>Kitchen: 2</p>
                        <p>Dining Room: 1</p>
                        <p>Living Room: 1</p>
                    </span>
                    
                    <span className="flex gap-20 mt-2">
                        <p>Area: {project?.area}ft</p>
                        <p className="mb-3">Cost: Rs. {project?.cost}</p>
                    </span>
                    
                </div>
            </section>
        </div>
    )
}

export default ProductDetails