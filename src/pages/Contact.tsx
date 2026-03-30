import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import emailjs from "@emailjs/browser";
import axios from 'axios';
import Swal from 'sweetalert2';

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export default function Contact() {

  useEffect(()=> {
      emailjs.init("jZQU_K7Z5Jj3iM9vZ");
    }, []);

  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const loggedIn = await checkAuth();
    
    if(!loggedIn || !currentUser){
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must login to submit feedback!',
        confirmButtonColor: '#a3e635',
      });
      return;
    }
    const form = e.currentTarget;

    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ 
        name: currentUser?.name || '', 
        email: currentUser?.email || '', 
        subject: '', 
        message: '' 
      });
    }, 3000);

    try {
      const response = await emailjs.send(
        "service_4jhbtbl",
        "template_yew9n6a",
        formData,
        "jZQU_K7Z5Jj3iM9vZ"
      );

      console.log("✅ Email sent successfully!", response);

      Swal.fire({
        icon: 'success',
        title: '✅ Email sent successfully!',
        text: 'Thank you for choosing us ❤️',
        confirmButtonColor: '#a3e635',
      });
      setIsSubmitted(true)

      form.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: '❌ Failed to send email!',
        confirmButtonColor: '#a3e635',
      });
    }
  };

  const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token is: ", token)
  
        const res = await axios.get(
          "http://localhost:9000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("User logged in:", res.data);
        setCurrentUser(res.data);
        return true;
  
      } catch (err) {
        console.log("Not logged in");
        return false;
      }
    }

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
            <h1 className="text-5xl md:text-6xl mb-4">Contact Us</h1>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with us to discuss your architectural project.
              We're here to answer your questions and bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl mb-8">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#a3e635] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#0f172a]" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">0761 380 569</p>
                    <a 
                      href="tel:0761380569"
                      className="inline-block mt-2 bg-[#a3e635] text-[#0f172a] px-4 py-2 rounded hover:bg-[#bef264] transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#a3e635] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#0f172a]" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">Email</h3>
                    <p className="text-gray-600 break-all">Lahirucadstore1@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#a3e635] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#0f172a]" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">Address</h3>
                    <p className="text-gray-600">
                      No 67/H/1, Samagi Mawatha,<br />
                      Kuludewala, Panadura
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#a3e635] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#0f172a]" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg overflow-hidden h-64">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-[#a3e635]" />
                    <p className="text-sm">Map Location</p>
                    <p className="text-xs text-gray-400 mt-2">Kuludewala, Panadura</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl mb-6">Send Us a Message</h2>
                
                {/* {submitted && (
                  <div className="mb-6 p-4 bg-[#a3e635] text-[#0f172a] rounded-lg">
                    Thank you! Your message has been sent successfully.
                  </div>
                )} */}

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you within 24
                      hours.
                    </p>
                  </motion.div>
                ) : (

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* <div>
                    <label htmlFor="name" className="block mb-2 text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635] bg-white"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635] bg-white"
                      placeholder="your@email.com"
                    />
                  </div> */}

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-gray-700">
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
                    <label htmlFor="message" className="block mb-2 text-gray-700">
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
                    className="w-full bg-[#a3e635] text-[#0f172a] py-4 rounded-lg hover:bg-[#bef264] transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-white mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-[#a3e635] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center text-white"
            >
              <div className="w-16 h-16 bg-[#a3e635] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-[#0f172a]">✓</span>
              </div>
              <h3 className="text-xl mb-3">Professional Expertise</h3>
              <p className="text-gray-400">
                Years of experience delivering exceptional architectural solutions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center text-white"
            >
              <div className="w-16 h-16 bg-[#a3e635] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-[#0f172a]">✓</span>
              </div>
              <h3 className="text-xl mb-3">Client Satisfaction</h3>
              <p className="text-gray-400">
                Dedicated to exceeding expectations on every project
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center text-white"
            >
              <div className="w-16 h-16 bg-[#a3e635] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-[#0f172a]">✓</span>
              </div>
              <h3 className="text-xl mb-3">Quality Assurance</h3>
              <p className="text-gray-400">
                Meticulous attention to detail ensuring superior results
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
