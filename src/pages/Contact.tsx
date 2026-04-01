import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import emailjs from "@emailjs/browser";
import axios from 'axios';
import Swal from 'sweetalert2';

interface User {
  name: string;
  email: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const res = await axios.get(
        "https://design-architecture-be.vercel.app/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentUser(res.data);
      return res.data;
    } catch (err) {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = await checkAuth();

    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must login to submit feedback!',
        confirmButtonColor: '#a3e635',
      });
      setFormData((prev) => ({
        ...prev,
        subject: '',
        message: ''
      }));
      return;
    }

    try {
      const templateParams = {
        ...formData,
        name: user.name,
        email: user.email
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_KEY,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);

      setFormData({
        name: user.name,
        email: user.email,
        subject: '',
        message: ''
      });

      Swal.fire({
        icon: 'success',
        title: 'Email sent successfully!',
        text: 'Thank you for reaching out ❤️',
        confirmButtonColor: '#a3e635',
      });

    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: 'error',
        title: 'Failed to send email',
        text: 'Please try again later.',
        confirmButtonColor: '#a3e635',
      });
    }
  };

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
            <h1 className="text-5xl md:text-6xl xl:text-6xl mb-4">Contact Us</h1>
            <div className="w-24 h-1 xl:w-40 xl:h-2 bg-[#a3e635] mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto xl:text-2xl">
              Get in touch with us to discuss your architectural project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl xl:text-4xl mb-8">Get In Touch</h2>
              {/* Phone, Email, Address, Hours */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#a3e635] rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 xl:w-10 xl:h-10 text-[#0f172a]" />
                  </div>
                  <div>
                    <h3 className="text-lg xl:text-2xl mb-1">Phone</h3>
                    <p className="text-gray-600 xl:text-2xl">0761 380 569</p>
                    <a 
                      href="tel:0761380569"
                      className="inline-block mt-2 bg-[#a3e635] text-[#0f172a] px-4 py-2 rounded hover:bg-[#bef264] transition-colors
                      block lg:hidden"  
                    >
                      Call Now
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#a3e635] rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 xl:w-10 xl:h-10 text-[#0f172a]" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 xl:text-2xl">Email</h3>
                    <p className="text-gray-600 xl:text-2xl">lahirucadstore1@gmail.com</p>
                  </div>
                </div>
              </div>
              {/* ✅ using currentUser (avoid unused error) */}
              {currentUser && (
                <p className="mt-6 text-green-600">
                  Logged in as: {currentUser.name}
                </p>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl xl:text-4xl mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-500">
                      Thank you for reaching out. We&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="subject" className="block mb-2 text-gray-700 xl:text-2xl">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635] bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="architectural-design">Architectural Design</option>
                        <option value="renovation">Renovation Design</option>
                        <option value="estimate">Estimate Preparation</option>
                        <option value="structural">Structural Design</option>
                        <option value="construction">Construction</option>
                        <option value="consultation">General Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block mb-2 text-gray-700 xl:text-2xl">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635] resize-none bg-white"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#a3e635] text-[#0f172a] py-4 rounded-lg hover:bg-[#bef264] transition-all duration-300 flex items-center justify-center space-x-2 group xl:text-2xl"
                    >
                      <span>Send Message</span>
                      <Send className="w-5 h-5 xl:w-6 xl:h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
