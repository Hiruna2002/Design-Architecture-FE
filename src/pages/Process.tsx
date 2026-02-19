import { motion } from 'motion/react';
import { MessageSquare, Lightbulb, PenTool, CheckCircle, Hammer } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      number: '01',
      icon: <MessageSquare className="w-12 h-12" />,
      title: 'Consultation',
      description: 'Initial meeting to understand your vision, requirements, budget, and timeline. We discuss your goals and explore possibilities for your project.',
      details: [
        'Understanding client needs and expectations',
        'Site visit and assessment',
        'Budget discussion and feasibility analysis',
        'Timeline planning'
      ]
    },
    {
      number: '02',
      icon: <Lightbulb className="w-12 h-12" />,
      title: 'Concept Planning',
      description: 'Development of initial design concepts based on your requirements. We create preliminary sketches and spatial layouts to visualize the project.',
      details: [
        'Conceptual sketches and mood boards',
        'Space planning and layout options',
        'Material and finish recommendations',
        'Client feedback and refinement'
      ]
    },
    {
      number: '03',
      icon: <PenTool className="w-12 h-12" />,
      title: '2D & 3D Design',
      description: 'Detailed architectural drawings and photorealistic 3D visualizations. This stage brings your project to life with accurate plans and stunning renderings.',
      details: [
        'Detailed 2D floor plans and elevations',
        'Photorealistic 3D renderings',
        'Virtual walkthroughs',
        'Technical specifications and documentation'
      ]
    },
    {
      number: '04',
      icon: <CheckCircle className="w-12 h-12" />,
      title: 'Structural Approval',
      description: 'Engineering calculations and structural design ensuring safety and compliance. We prepare all necessary documentation for regulatory approvals.',
      details: [
        'Structural engineering calculations',
        'Building code compliance review',
        'Submission of plans for approval',
        'Coordination with local authorities'
      ]
    },
    {
      number: '05',
      icon: <Hammer className="w-12 h-12" />,
      title: 'Construction Execution',
      description: 'Professional construction management ensuring your design is built to perfection. We oversee quality, timeline, and coordination throughout the build.',
      details: [
        'Contractor coordination and management',
        'Quality control and site supervision',
        'Progress monitoring and reporting',
        'Final inspection and handover'
      ]
    }
  ];

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
            <h1 className="text-5xl md:text-6xl mb-4">Design Process</h1>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our systematic approach ensures your project moves smoothly from initial concept
              to final construction, with quality and precision at every stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#a3e635]/30"></div>

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative mb-16 last:mb-0"
              >
                <div className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg border-t-4 border-[#a3e635]">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl text-[#a3e635]/20">{step.number}</span>
                        <h3 className="text-2xl">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-[#a3e635] mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#a3e635] rounded-full flex items-center justify-center text-[#0f172a] shadow-lg">
                      {step.icon}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Benefits */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-white mb-4">Why Our Process Works</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1e293b] p-8 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-[#a3e635] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#0f172a]" />
              </div>
              <h3 className="text-xl text-white mb-3">Transparent Communication</h3>
              <p className="text-gray-400">
                Stay informed at every stage with regular updates and clear communication
                throughout the entire process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#1e293b] p-8 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-[#a3e635] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-[#0f172a]" />
              </div>
              <h3 className="text-xl text-white mb-3">Quality Assurance</h3>
              <p className="text-gray-400">
                Rigorous quality control measures ensure your project meets the highest
                standards of design and construction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#1e293b] p-8 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-[#a3e635] rounded-full flex items-center justify-center mx-auto mb-4">
                <Hammer className="w-8 h-8 text-[#0f172a]" />
              </div>
              <h3 className="text-xl text-white mb-3">On-Time Delivery</h3>
              <p className="text-gray-400">
                Structured workflow and efficient project management ensure timely completion
                without compromising quality.
              </p>
            </motion.div>
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
            <h2 className="text-4xl mb-6">Ready to Begin?</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 mb-8">
              Let's start the journey of transforming your architectural vision into reality.
              Contact us today for an initial consultation.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#a3e635] text-[#0f172a] px-8 py-4 rounded hover:bg-[#bef264] transition-all duration-300"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
