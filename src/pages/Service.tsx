import { motion } from 'motion/react';
import { PenTool, Building2, Calculator, Ruler, Hammer, CheckCircle } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <PenTool className="w-12 h-12" />,
      title: 'Architectural Design (2D & 3D)',
      description: 'Comprehensive architectural design services transforming your ideas into detailed plans and realistic 3D visualizations.',
      benefits: [
        'Detailed 2D floor plans and elevations',
        'Photorealistic 3D renderings',
        'Virtual walkthroughs and presentations',
        'Custom design tailored to your needs',
        'Multiple design iterations and revisions'
      ]
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: 'Renovation Design',
      description: 'Expert renovation planning that breathes new life into existing structures while maximizing functionality and aesthetics.',
      benefits: [
        'Space optimization and reconfiguration',
        'Modern design integration',
        'Structural assessment and planning',
        'Material selection guidance',
        'Cost-effective renovation solutions'
      ]
    },
    {
      icon: <Calculator className="w-12 h-12" />,
      title: 'Estimate Preparation',
      description: 'Accurate and detailed cost estimations to help you budget effectively and make informed financial decisions.',
      benefits: [
        'Comprehensive material quantity takeoffs',
        'Labor cost calculations',
        'Market rate analysis',
        'Budget optimization strategies',
        'Transparent pricing breakdown'
      ]
    },
    {
      icon: <Ruler className="w-12 h-12" />,
      title: 'Structural Design',
      description: 'Engineering excellence ensuring your building is safe, durable, and compliant with all structural standards.',
      benefits: [
        'Load-bearing calculations',
        'Foundation design and planning',
        'Beam and column specifications',
        'Building code compliance',
        'Structural integrity analysis'
      ]
    },
    {
      icon: <Hammer className="w-12 h-12" />,
      title: 'Construction',
      description: 'Professional construction services bringing architectural designs to life with precision and quality craftsmanship.',
      benefits: [
        'Experienced construction teams',
        'Project timeline management',
        'Quality control and supervision',
        'Coordination with contractors',
        'On-site problem solving'
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
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Service Info */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="bg-[#0f172a] text-white p-8 rounded-lg shadow-xl">
                    <div className="text-[#a3e635] mb-4">{service.icon}</div>
                    <h2 className="text-3xl mb-4">{service.title}</h2>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    
                    <h3 className="text-xl text-[#a3e635] mb-4">Benefits to Clients:</h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#a3e635] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Service Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-[#a3e635] rounded-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <img
                      src={getServiceImage(index)}
                      alt={service.title}
                      className="relative rounded-lg shadow-2xl w-full h-96 object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
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

function getServiceImage(index: number): string {
  const images = [
    'https://images.unsplash.com/photo-1769147339214-076740872485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJ1Y3R1cmFsJTIwZW5naW5lZXJpbmclMjBibHVlcHJpbnR8ZW58MXx8fHwxNzcxMzQ3MDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1758998202918-d921125a700f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcxMzQ3MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmFsJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NzEyMzkzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1580741753044-b3f303ad361b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcxMzIwNjg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1722421492323-eaf9c401befe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzEzMTc2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];
  return images[index % images.length];
}
