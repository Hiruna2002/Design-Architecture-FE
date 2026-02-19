import { motion } from 'motion/react';
import { Award, Target, Users, Lightbulb, CheckCircle } from 'lucide-react';

export default function About() {
  const skills = [
    'Architectural Planning',
    '3D Visualization',
    'Structural Accuracy',
    'Modern Design Techniques',
    'CAD Software Expertise',
    'Project Management',
    'Construction Documentation',
    'Building Code Compliance'
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
            <h1 className="text-5xl md:text-6xl mb-4">About Lahiru Srimal</h1>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional Architectural Designer with a passion for creating innovative spaces
              that blend functionality with aesthetic excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1769147339214-076740872485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJ1Y3R1cmFsJTIwZW5naW5lZXJpbmclMjBibHVlcHJpbnR8ZW58MXx8fHwxNzcxMzQ3MDE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Architectural Design"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#a3e635] rounded-lg -z-10"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl mb-6">Professional Profile</h2>
              <p className="text-gray-600 mb-4">
                With years of experience in architectural design and planning, I specialize in
                transforming client visions into tangible, structurally sound, and aesthetically
                pleasing architectural solutions.
              </p>
              <p className="text-gray-600 mb-4">
                My approach combines technical expertise with creative innovation, ensuring every
                project meets the highest standards of design excellence and structural integrity.
              </p>
              <p className="text-gray-600">
                From initial concept development to final construction documentation, I provide
                comprehensive architectural services that exceed client expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-white mb-4">Core Values & Expertise</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1e293b] p-6 rounded-lg text-center hover:bg-[#334155] transition-colors"
            >
              <Award className="w-12 h-12 text-[#a3e635] mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">Experience</h3>
              <p className="text-gray-400">
                Years of professional practice delivering exceptional architectural solutions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#1e293b] p-6 rounded-lg text-center hover:bg-[#334155] transition-colors"
            >
              <Target className="w-12 h-12 text-[#a3e635] mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">Design Philosophy</h3>
              <p className="text-gray-400">
                Creating spaces that harmonize form, function, and sustainability
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#1e293b] p-6 rounded-lg text-center hover:bg-[#334155] transition-colors"
            >
              <Users className="w-12 h-12 text-[#a3e635] mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">Client-Focused</h3>
              <p className="text-gray-400">
                Collaborative approach ensuring your vision is realized perfectly
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#1e293b] p-6 rounded-lg text-center hover:bg-[#334155] transition-colors"
            >
              <Lightbulb className="w-12 h-12 text-[#a3e635] mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">Innovation</h3>
              <p className="text-gray-400">
                Embracing modern design trends and cutting-edge technologies
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">Skills & Expertise</h2>
              <p className="text-gray-600 mb-8">
                Comprehensive architectural capabilities combining technical precision with
                creative vision to deliver outstanding results on every project.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-[#a3e635] flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1758998202918-d921125a700f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcxMzQ3MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern Interior"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6">Commitment to Quality & Innovation</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 mb-6">
              Every project is approached with meticulous attention to detail, ensuring that
              design integrity, structural soundness, and client satisfaction are never compromised.
            </p>
            <p className="text-lg text-gray-400">
              By staying current with industry trends and leveraging the latest design technologies,
              I deliver architectural solutions that are both timeless and forward-thinking.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
