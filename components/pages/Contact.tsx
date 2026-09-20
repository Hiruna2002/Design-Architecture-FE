// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'motion/react';
// import { Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
// import emailjs from '@emailjs/browser';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// interface User {
//   name: string;
//   email: string;
// }

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isSending, setIsSending] = useState(false);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   // Initialize EmailJS
//   useEffect(() => {
//     const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

//     if (!publicKey) {
//       console.error(
//         'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is not configured'
//       );
//       return;
//     }

//     emailjs.init(publicKey);
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Check whether the user is logged in
//   const checkAuth = async (): Promise<User | null> => {
//     try {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         return null;
//       }

//       const apiUrl =
//         process.env.NEXT_PUBLIC_API_URL ||
//         'https://design-architecture-be.vercel.app';

//       const res = await axios.get<User>(
//         `${apiUrl}/api/users/profile`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCurrentUser(res.data);

//       return res.data;
//     } catch (error) {
//       console.error('Authentication check failed:', error);

//       setCurrentUser(null);

//       return null;
//     }
//   };

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (isSending) {
//       return;
//     }

//     const user = await checkAuth();

//     if (!user) {
//       await Swal.fire({
//         icon: 'warning',
//         title: 'Login Required',
//         text: 'You must login to submit feedback!',
//         confirmButtonColor: '#a3e635',
//       });

//       setFormData((prev) => ({
//         ...prev,
//         subject: '',
//         message: '',
//       }));

//       return;
//     }

//     // Read EmailJS environment variables
//     const serviceId =
//       process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY;

//     const templateId =
//       process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

//     const publicKey =
//       process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

//     // Validate environment variables before using EmailJS
//     if (!serviceId || !templateId || !publicKey) {
//       console.error('EmailJS environment variables are missing', {
//         serviceId: !!serviceId,
//         templateId: !!templateId,
//         publicKey: !!publicKey,
//       });

//       await Swal.fire({
//         icon: 'error',
//         title: 'Configuration Error',
//         text: 'Email service is not configured correctly. Please try again later.',
//         confirmButtonColor: '#a3e635',
//       });

//       return;
//     }

//     try {
//       setIsSending(true);

//       const templateParams = {
//         ...formData,
//         name: user.name,
//         email: user.email,
//       };

//       await emailjs.send(
//         serviceId,
//         templateId,
//         templateParams,
//         publicKey
//       );

//       setCurrentUser(user);
//       setIsSubmitted(true);

//       setFormData({
//         name: user.name,
//         email: user.email,
//         subject: '',
//         message: '',
//       });

//       await Swal.fire({
//         icon: 'success',
//         title: 'Email sent successfully!',
//         text: 'Thank you for reaching out ❤️',
//         confirmButtonColor: '#a3e635',
//       });
//     } catch (error) {
//       console.error('Failed to send EmailJS email:', error);

//       await Swal.fire({
//         icon: 'error',
//         title: 'Failed to send email',
//         text: 'Please try again later.',
//         confirmButtonColor: '#a3e635',
//       });
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <h1 className="text-5xl md:text-6xl xl:text-6xl mb-4">
//               Contact Us
//             </h1>

//             <div className="w-24 h-1 xl:w-40 xl:h-2 bg-[#a3e635] mx-auto mb-6" />

//             <p className="text-xl text-gray-300 max-w-3xl mx-auto xl:text-2xl">
//               Get in touch with us to discuss your architectural
//               project.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

//             {/* Contact Information */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="text-3xl xl:text-4xl mb-8">
//                 Get In Touch
//               </h2>

//               <div className="space-y-6 mb-8">

//                 {/* Phone */}
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-[#a3e635] rounded-lg flex items-center justify-center">
//                     <Phone className="w-6 h-6 xl:w-10 xl:h-10 text-[#0f172a]" />
//                   </div>

//                   <div>
//                     <h3 className="text-lg xl:text-2xl mb-1">
//                       Phone
//                     </h3>

//                     <p className="text-gray-600 xl:text-2xl">
//                       0761 380 569
//                     </p>

//                     <a
//                       href="tel:0761380569"
//                       className="inline-block mt-2 bg-[#a3e635] text-[#0f172a] px-4 py-2 rounded hover:bg-[#bef264] transition-colors block lg:hidden"
//                     >
//                       Call Now
//                     </a>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-[#a3e635] rounded-lg flex items-center justify-center">
//                     <Mail className="w-6 h-6 xl:w-10 xl:h-10 text-[#0f172a]" />
//                   </div>

//                   <div>
//                     <h3 className="text-lg mb-1 xl:text-2xl">
//                       Email
//                     </h3>

//                     <a
//                       href="mailto:lahirucadstore1@gmail.com"
//                       className="text-gray-600 xl:text-2xl hover:text-[#84cc16] transition-colors"
//                     >
//                       lahirucadstore1@gmail.com
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {currentUser && (
//                 <p className="mt-6 text-green-600">
//                   Logged in as: {currentUser.name}
//                 </p>
//               )}
//             </motion.div>

//             {/* Contact Form */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
//                 <h2 className="text-3xl xl:text-4xl mb-6">
//                   Send Us a Message
//                 </h2>

//                 {isSubmitted ? (
//                   <motion.div
//                     initial={{
//                       opacity: 0,
//                       scale: 0.9,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                     }}
//                     className="text-center py-12"
//                   >
//                     <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
//                       <CheckCircle2 className="w-8 h-8 text-primary" />
//                     </div>

//                     <h3 className="text-2xl font-bold mb-2">
//                       Message Sent!
//                     </h3>

//                     <p className="text-gray-500">
//                       Thank you for reaching out. We&apos;ll get
//                       back to you soon.
//                     </p>
//                   </motion.div>
//                 ) : (
//                   <form
//                     onSubmit={handleSubmit}
//                     className="space-y-6"
//                   >
//                     {/* Subject */}
//                     <div>
//                       <label
//                         htmlFor="subject"
//                         className="block mb-2 text-gray-700 xl:text-2xl"
//                       >
//                         Subject *
//                       </label>

//                       <select
//                         id="subject"
//                         name="subject"
//                         value={formData.subject}
//                         onChange={handleChange}
//                         required
//                         disabled={isSending}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635] bg-white disabled:opacity-60"
//                       >
//                         <option value="">
//                           Select a subject
//                         </option>

//                         <option value="architectural-design">
//                           Architectural Design
//                         </option>

//                         <option value="renovation">
//                           Renovation Design
//                         </option>

//                         <option value="estimate">
//                           Estimate Preparation
//                         </option>

//                         <option value="structural">
//                           Structural Design
//                         </option>

//                         <option value="construction">
//                           Construction
//                         </option>

//                         <option value="consultation">
//                           General Consultation
//                         </option>

//                         <option value="other">
//                           Other
//                         </option>
//                       </select>
//                     </div>

//                     {/* Message */}
//                     <div>
//                       <label
//                         htmlFor="message"
//                         className="block mb-2 text-gray-700 xl:text-2xl"
//                       >
//                         Message *
//                       </label>

//                       <textarea
//                         id="message"
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         required
//                         disabled={isSending}
//                         rows={6}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635] resize-none bg-white disabled:opacity-60"
//                         placeholder="Tell us about your project..."
//                       />
//                     </div>

//                     {/* Submit */}
//                     <button
//                       type="submit"
//                       disabled={isSending}
//                       className="w-full bg-[#a3e635] text-[#0f172a] py-4 rounded-lg hover:bg-[#bef264] transition-all duration-300 flex items-center justify-center space-x-2 group xl:text-2xl disabled:opacity-60 disabled:cursor-not-allowed"
//                     >
//                       <span>
//                         {isSending
//                           ? 'Sending...'
//                           : 'Send Message'}
//                       </span>

//                       <Send
//                         className={`w-5 h-5 xl:w-6 xl:h-6 transition-transform ${
//                           !isSending
//                             ? 'group-hover:translate-x-1'
//                             : ''
//                         }`}
//                       />
//                     </button>
//                   </form>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  Mail,
  Send,
  CheckCircle2,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
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
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // ==========================================
  // WHATSAPP SETTINGS
  // ==========================================

  const whatsappNumber = '94761380569';

  const whatsappMessage =
    'Hello, I found your website and I would like to discuss an architectural project with you.';

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // ==========================================
  // INITIALIZE EMAILJS
  // ==========================================

  useEffect(() => {
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!publicKey) {
      console.error(
        'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is not configured'
      );
      return;
    }

    emailjs.init(publicKey);
  }, []);

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // CHECK AUTH
  // ==========================================

  const checkAuth = async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return null;
      }

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        'https://design-architecture-be.vercel.app';

      const res = await axios.get<User>(
        `${apiUrl}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentUser(res.data);

      return res.data;
    } catch (error) {
      console.error(
        'Authentication check failed:',
        error
      );

      setCurrentUser(null);

      return null;
    }
  };

  // ==========================================
  // SEND EMAIL
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSending) {
      return;
    }

    const user = await checkAuth();

    if (!user) {
      await Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must login to submit feedback!',
        confirmButtonColor: '#a3e635',
      });

      setFormData((prev) => ({
        ...prev,
        subject: '',
        message: '',
      }));

      return;
    }

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY;

    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        'EmailJS environment variables are missing',
        {
          serviceId: !!serviceId,
          templateId: !!templateId,
          publicKey: !!publicKey,
        }
      );

      await Swal.fire({
        icon: 'error',
        title: 'Configuration Error',
        text: 'Email service is not configured correctly. Please try again later.',
        confirmButtonColor: '#a3e635',
      });

      return;
    }

    try {
      setIsSending(true);

      const templateParams = {
        ...formData,
        name: user.name,
        email: user.email,
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setCurrentUser(user);
      setIsSubmitted(true);

      setFormData({
        name: user.name,
        email: user.email,
        subject: '',
        message: '',
      });

      await Swal.fire({
        icon: 'success',
        title: 'Email sent successfully!',
        text: 'Thank you for reaching out ❤️',
        confirmButtonColor: '#a3e635',
      });
    } catch (error) {
      console.error(
        'Failed to send EmailJS email:',
        error
      );

      await Swal.fire({
        icon: 'error',
        title: 'Failed to send email',
        text: 'Please try again later.',
        confirmButtonColor: '#a3e635',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen">

      {/* ====================================== */}
      {/* HERO SECTION */}
      {/* ====================================== */}

      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >

            <h1 className="text-5xl md:text-6xl xl:text-6xl mb-4">
              Contact Us
            </h1>

            <div className="w-24 h-1 xl:w-40 xl:h-2 bg-[#a3e635] mx-auto mb-6" />

            <p className="text-xl text-gray-300 max-w-3xl mx-auto xl:text-2xl">
              Get in touch with us to discuss your architectural
              project.
            </p>

          </motion.div>

        </div>

      </section>

      {/* ====================================== */}
      {/* CONTACT SECTION */}
      {/* ====================================== */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ====================================== */}
            {/* CONTACT INFORMATION */}
            {/* ====================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >

              <h2 className="text-3xl xl:text-4xl mb-8">
                Get In Touch
              </h2>

              <div className="space-y-7 mb-8">

                {/* ============================== */}
                {/* PHONE */}
                {/* ============================== */}

                <div className="flex items-start space-x-4">

                  <div className="w-12 h-12 shrink-0 bg-[#a3e635] rounded-lg flex items-center justify-center">

                    <Phone className="w-6 h-6 xl:w-8 xl:h-8 text-[#0f172a]" />

                  </div>

                  <div>

                    <h3 className="text-lg xl:text-2xl mb-1">
                      Phone
                    </h3>

                    <a
                      href="tel:+94761380569"
                      className="text-gray-600 xl:text-2xl hover:text-[#84cc16] transition-colors"
                    >
                      0761 380 569
                    </a>

                    <div className="mt-3 lg:hidden">

                      <a
                        href="tel:+94761380569"
                        className="inline-flex items-center gap-2 bg-[#a3e635] text-[#0f172a] px-4 py-2 rounded-lg font-medium hover:bg-[#bef264] transition-colors"
                      >

                        <Phone className="w-4 h-4" />

                        <span>
                          Call Now
                        </span>

                      </a>

                    </div>

                  </div>

                </div>

                {/* ============================== */}
                {/* EMAIL */}
                {/* ============================== */}

                <div className="flex items-start space-x-4">

                  <div className="w-12 h-12 shrink-0 bg-[#a3e635] rounded-lg flex items-center justify-center">

                    <Mail className="w-6 h-6 xl:w-8 xl:h-8 text-[#0f172a]" />

                  </div>

                  <div>

                    <h3 className="text-lg mb-1 xl:text-2xl">
                      Email
                    </h3>

                    <a
                      href="mailto:lahirucadstore1@gmail.com"
                      className="text-gray-600 xl:text-2xl hover:text-[#84cc16] transition-colors break-all"
                    >
                      lahirucadstore1@gmail.com
                    </a>

                  </div>

                </div>

                {/* ============================== */}
                {/* WHATSAPP */}
                {/* ============================== */}

                <div className="flex items-start space-x-4">

                  {/* WhatsApp Icon */}

                  <div className="w-12 h-12 shrink-0 bg-[#25D366] rounded-lg flex items-center justify-center">

                    <svg
                      viewBox="0 0 32 32"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-7 h-7 text-white"
                    >
                      <path d="M19.11 17.44c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.09-.4-2.08-1.29-.77-.68-1.29-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.8-1.94-.21-.51-.43-.44-.59-.45h-.5c-.17 0-.46.07-.7.33-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.17 1.83 2.79 4.43 3.91.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3z" />

                      <path d="M16.03 3C8.85 3 3 8.82 3 15.98c0 2.29.6 4.52 1.74 6.49L3 29l6.71-1.76a13 13 0 0 0 6.31 1.61h.01C23.21 28.85 29 23.03 29 15.87 29 8.72 23.21 3 16.03 3zm0 23.66h-.01a10.78 10.78 0 0 1-5.49-1.5l-.39-.23-3.98 1.04 1.06-3.87-.25-.4a10.71 10.71 0 0 1-1.65-5.72c0-5.96 4.86-10.8 10.83-10.8 2.89 0 5.6 1.12 7.64 3.16a10.7 10.7 0 0 1 3.17 7.63c-.01 5.95-4.86 10.79-10.93 10.79z" />
                    </svg>

                  </div>

                  <div className="flex-1">

                    <h3 className="text-lg mb-1 xl:text-2xl">
                      WhatsApp
                    </h3>

                    <p className="text-gray-600 xl:text-xl mb-3">
                      Chat with us directly on WhatsApp
                    </p>

                    {/* WhatsApp Button */}

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat with us on WhatsApp"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#20bd5a] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                    >

                      <svg
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M19.11 17.44c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.09-.4-2.08-1.29-.77-.68-1.29-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.8-1.94-.21-.51-.43-.44-.59-.45h-.5c-.17 0-.46.07-.7.33-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.17 1.83 2.79 4.43 3.91.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3z" />

                        <path d="M16.03 3C8.85 3 3 8.82 3 15.98c0 2.29.6 4.52 1.74 6.49L3 29l6.71-1.76a13 13 0 0 0 6.31 1.61h.01C23.21 28.85 29 23.03 29 15.87 29 8.72 23.21 3 16.03 3zm0 23.66h-.01a10.78 10.78 0 0 1-5.49-1.5l-.39-.23-3.98 1.04 1.06-3.87-.25-.4a10.71 10.71 0 0 1-1.65-5.72c0-5.96 4.86-10.8 10.83-10.8 2.89 0 5.6 1.12 7.64 3.16a10.7 10.7 0 0 1 3.17 7.63c-.01 5.95-4.86 10.79-10.93 10.79z" />
                      </svg>

                      <span>
                        Chat on WhatsApp
                      </span>

                    </a>

                  </div>

                </div>

              </div>

              {/* ====================================== */}
              {/* LOGGED USER */}
              {/* ====================================== */}

              {currentUser && (
                <div className="mt-6 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg">

                  <CheckCircle2 className="w-4 h-4" />

                  <span>
                    Logged in as: {currentUser.name}
                  </span>

                </div>
              )}

            </motion.div>

            {/* ====================================== */}
            {/* CONTACT FORM */}
            {/* ====================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >

              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">

                <h2 className="text-3xl xl:text-4xl mb-6">
                  Send Us a Message
                </h2>

                {isSubmitted ? (

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="text-center py-12"
                  >

                    <div className="w-16 h-16 rounded-full bg-[#a3e635]/10 flex items-center justify-center mx-auto mb-6">

                      <CheckCircle2 className="w-8 h-8 text-[#84cc16]" />

                    </div>

                    <h3 className="text-2xl font-bold mb-2">
                      Message Sent!
                    </h3>

                    <p className="text-gray-500">
                      Thank you for reaching out. We&apos;ll get
                      back to you soon.
                    </p>

                  </motion.div>

                ) : (

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >

                    {/* ====================================== */}
                    {/* SUBJECT */}
                    {/* ====================================== */}

                    <div>

                      <label
                        htmlFor="subject"
                        className="block mb-2 text-gray-700 xl:text-2xl"
                      >
                        Subject *
                      </label>

                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={isSending}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635] bg-white disabled:opacity-60"
                      >

                        <option value="">
                          Select a subject
                        </option>

                        <option value="architectural-design">
                          Architectural Design
                        </option>

                        <option value="renovation">
                          Renovation Design
                        </option>

                        <option value="estimate">
                          Estimate Preparation
                        </option>

                        <option value="structural">
                          Structural Design
                        </option>

                        <option value="construction">
                          Construction
                        </option>

                        <option value="consultation">
                          General Consultation
                        </option>

                        <option value="other">
                          Other
                        </option>

                      </select>

                    </div>

                    {/* ====================================== */}
                    {/* MESSAGE */}
                    {/* ====================================== */}

                    <div>

                      <label
                        htmlFor="message"
                        className="block mb-2 text-gray-700 xl:text-2xl"
                      >
                        Message *
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSending}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635] resize-none bg-white disabled:opacity-60"
                        placeholder="Tell us about your project..."
                      />

                    </div>

                    {/* ====================================== */}
                    {/* SEND BUTTON */}
                    {/* ====================================== */}

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-[#a3e635] text-[#0f172a] py-4 rounded-lg hover:bg-[#bef264] transition-all duration-300 flex items-center justify-center space-x-2 group xl:text-2xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >

                      <span>
                        {isSending
                          ? 'Sending...'
                          : 'Send Message'}
                      </span>

                      <Send
                        className={`w-5 h-5 xl:w-6 xl:h-6 transition-transform ${
                          !isSending
                            ? 'group-hover:translate-x-1'
                            : ''
                        }`}
                      />

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