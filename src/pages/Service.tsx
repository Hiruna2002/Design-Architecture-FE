import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Service {
    _id: string;
    name: string;
    desc: string;
    exp: number;
    benifits: string[];
}

export default function Services() {
  const {id} = useParams();
  const [service, setService] = useState<Service>()

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
      console.log("Service id is: ", id)
      const res = await axios.get(
        `https://design-architecture-be.vercel.app/api/services/${id}`
      );
      setService(res.data);
  };

  if (!service) return <p>Loading...</p>;

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
            <h1 className="text-5xl md:text-6xl mb-4">Our Services</h1>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive architectural and construction services designed to bring your vision to life
              with precision, creativity, and professionalism.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {service && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* Service Info */}
                <div>
                  <div className="bg-[#0f172a] text-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-3xl mb-4">{service.name}</h2>
                    <p className="text-gray-300 mb-6">{service.desc}</p>

                    <h3 className="text-xl text-[#a3e635] mb-4">
                      Benefits to Clients:
                    </h3>

                    <ul className="space-y-3">
                      {service.benifits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#a3e635] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
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
            <h2 className="text-4xl mb-6">Ready to Start Your Project?</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can transform your architectural vision into reality.
              Contact us today for a consultation.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#a3e635] text-[#0f172a] px-8 py-4 rounded hover:bg-[#bef264] transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}