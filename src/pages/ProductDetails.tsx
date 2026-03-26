import axios from "axios";
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"; 

interface Project{
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
    const {id} = useParams()

    useEffect(() => {
        console.log("Navigate Project Details form")
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try{
            const res = await axios.get(`http://localhost:9000/api/projects/${id}`);
            setProject(res.data);
            console.log("sub images is: ", res.data);
        } catch (error){
            console.error(error);
        }
    }

  return (
    <div className="min-h-screen">
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
        <section className="py-16 bg-gray-500">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <img 
                    src={project?.imageUrl}
                    alt={project?.name}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="relative overflow-hidden h-64">
                        {project?.subImageUrls.map((subImageUrl, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-white rounded-lg overflow-hidden mt-5 "
                            >
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={subImageUrl}
                                        alt={project.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default ProductDetails