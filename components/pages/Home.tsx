'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Ruler,
  Hammer,
  Star,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const logo = '/images/111.png';
const image = '/images/bg.jpg';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://design-architecture-be.vercel.app';

// =====================================================
// INTERFACES
// =====================================================

interface Project {
  _id: string;
  name: string;
  imageUrl: string;
}

interface Service {
  _id: string;
  name: string;
  desc: string;
  exp: number;
  benifits: string[];
}

interface Feedback {
  _id: string;
  name: string;
  message: string;
  rating: number;
  createdAt?: string;
}

// =====================================================
// HOME COMPONENT
// =====================================================

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const [servicesLoading, setServicesLoading] =
    useState(true);

  const [projectsLoading, setProjectsLoading] =
    useState(true);

  const [feedbacksLoading, setFeedbacksLoading] =
    useState(true);

  const router = useRouter();

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    const loadHomeData = async () => {
      await Promise.allSettled([
        getAllServices(),
        getAllProjects(),
        fetchFeedbacks(),
      ]);
    };

    loadHomeData();
    checkAuth();
  }, []);

  // =====================================================
  // GET SERVICES
  // =====================================================

  const getAllServices = async () => {
    try {
      setServicesLoading(true);

      const response = await axios.get<Service[]>(
        `${API_URL}/api/services`
      );

      if (Array.isArray(response.data)) {
        setServices(response.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error(
        'Error fetching services:',
        error
      );

      setServices([]);
    } finally {
      setServicesLoading(false);
    }
  };

  // =====================================================
  // GET PROJECTS
  // =====================================================

  const getAllProjects = async () => {
    try {
      setProjectsLoading(true);

      const response = await axios.get<Project[]>(
        `${API_URL}/api/projects`
      );

      if (Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error(
        'Error fetching projects:',
        error
      );

      setProjects([]);
    } finally {
      setProjectsLoading(false);
    }
  };

  // =====================================================
  // GET FEEDBACKS
  // =====================================================

  const fetchFeedbacks = async () => {
    try {
      setFeedbacksLoading(true);

      const response = await axios.get<Feedback[]>(
        `${API_URL}/api/feedback`
      );

      if (Array.isArray(response.data)) {
        setFeedbacks(response.data);
      } else {
        setFeedbacks([]);
      }
    } catch (error) {
      console.error(
        'Error fetching feedbacks:',
        error
      );

      setFeedbacks([]);
    } finally {
      setFeedbacksLoading(false);
    }
  };

  // =====================================================
  // CHECK AUTH
  // =====================================================

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');

      // User not logged in -> don't send request
      if (!token) {
        return false;
      }

      const response = await axios.get(
        `${API_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        'User logged in:',
        response.data
      );

      return true;
    } catch (error) {
      console.log('Not logged in');

      return false;
    }
  };

  // =====================================================
  // PROJECT NAVIGATION
  // =====================================================

  const handleProject = (id: string) => {
    router.push(`/projects/${id}`);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen">

      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}

      <section className="relative min-h-[100svh] md:min-h-screen overflow-hidden pt-16 sm:pt-20 md:pt-24 flex items-start md:items-center justify-center bg-[#0f172a]">

        {/* Background */}

        <div className="absolute inset-0">
          <img
            src={image}
            alt="Architectural background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Overlay */}

        <div className="absolute inset-0 bg-[#03002e]/75" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#03002e]/40 to-[#0f172a]/90" />

        {/* Hero Content */}

        <div className="relative z-20 w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-white mt-6 md:mt-0">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex flex-col items-center text-center gap-4"
          >

            {/* Logo */}

            <img
              src={logo}
              alt="Logo"
              className="mt-10 w-[500px] sm:w-52 sm:h-52 md:mt-0 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
            />

            {/* Title */}

            <p className="text-3xl sm:text-2xl md:text-3xl lg:text-5xl text-[#a3e635] font-semibold leading-tight">
              Architectural Designer
            </p>

            {/* Subtitle */}

            <p className="text-xl sm:text-lg md:text-2xl lg:text-4xl italic max-w-md sm:max-w-2xl md:max-w-3xl leading-relaxed">
              &quot;We design your vision into reality!&quot;
            </p>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-12">

              <Link
                href="/projects"
                prefetch={true}
                className="
                  w-full
                  sm:w-auto
                  bg-[#a3e635]
                  text-[#0f172a]
                  px-6
                  py-3.5
                  rounded-lg
                  text-base
                  font-medium
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-[#bef264]
                  transition-all
                "
              >
                View Projects

                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                prefetch={true}
                className="
                  mt-4
                  w-full
                  sm:w-auto
                  border-2
                  border-[#a3e635]
                  text-[#a3e635]
                  px-6
                  py-3.5
                  rounded-lg
                  text-base
                  font-medium
                  flex
                  items-center
                  justify-center
                  hover:bg-[#a3e635]
                  hover:text-[#0f172a]
                  transition-all
                  md:mt-0
                "
              >
                Get a Quote
              </Link>

            </div>

          </motion.div>

        </div>

        {/* Decorative Shapes */}

        <div className="hidden md:block absolute top-24 left-10 w-16 h-16 border-4 border-[#a3e635]/30 rotate-45" />

        <div className="hidden md:block absolute bottom-24 right-10 w-14 h-14 border-4 border-[#a3e635]/20 rotate-12" />

      </section>

      {/* ================================================= */}
      {/* HIGHLIGHTS SECTION */}
      {/* ================================================= */}

      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Highlight 01 */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
              }}
              className="text-center p-6 bg-gray-50 rounded-lg border-l-4 border-[#a3e635]"
            >

              <Building2 className="w-12 h-12 xl:w-20 xl:h-20 mx-auto mb-4 text-[#0f172a]" />

              <h3 className="text-xl xl:text-3xl mb-2">
                Modern Architectural Excellence
              </h3>

              <p className="text-gray-600 xl:text-xl">
                Contemporary designs that blend aesthetics
                with functionality
              </p>

            </motion.div>

            {/* Highlight 02 */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.2,
              }}
              className="text-center p-6 bg-gray-50 rounded-lg border-l-4 border-[#a3e635]"
            >

              <Ruler className="w-12 h-12 xl:w-20 xl:h-20 mx-auto mb-4 text-[#0f172a]" />

              <h3 className="text-xl xl:text-3xl mb-2">
                Innovative Structural Solutions
              </h3>

              <p className="text-gray-600 xl:text-xl">
                Engineering precision in every project we
                undertake
              </p>

            </motion.div>

            {/* Highlight 03 */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.3,
              }}
              className="text-center p-6 bg-gray-50 rounded-lg border-l-4 border-[#a3e635]"
            >

              <Hammer className="w-12 h-12 xl:w-20 xl:h-20 mx-auto mb-4 text-[#0f172a]" />

              <h3 className="text-xl xl:text-3xl mb-2">
                Professional Construction Planning
              </h3>

              <p className="text-gray-600 xl:text-xl">
                Seamless execution from concept to completion
              </p>

            </motion.div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* SERVICES SECTION */}
      {/* ================================================= */}

      <section className="bg-[#0f172a] py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text-center mb-12"
          >

            <h2 className="text-4xl xl:text-6xl text-white mb-4">
              Our Services
            </h2>

            <div className="w-24 h-1 xl:w-48 xl:h-2 bg-[#a3e635] mx-auto" />

          </motion.div>

          {/* Services Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Loading Skeleton */}

            {servicesLoading ? (
              <>
                {[1, 2, 3].map((item) => (

                  <div
                    key={item}
                    className="
                      bg-[#1e293b]
                      p-6
                      rounded-lg
                      border-2
                      border-transparent
                      animate-pulse
                      min-h-[160px]
                    "
                  >

                    <div className="h-7 xl:h-9 bg-slate-600/50 rounded-md w-2/3 mb-5" />

                    <div className="space-y-3">

                      <div className="h-4 bg-slate-600/40 rounded-md w-full" />

                      <div className="h-4 bg-slate-600/40 rounded-md w-5/6" />

                      <div className="h-4 bg-slate-600/40 rounded-md w-3/5" />

                    </div>

                  </div>

                ))}
              </>
            ) : services.length > 0 ? (

              services.map((service, index) => (

                /*
                 * IMPORTANT:
                 * Using Next.js Link instead of router.push().
                 *
                 * This allows Next.js to prefetch the
                 * /services/[id] route before the user clicks it.
                 */

                <Link
                  key={service._id}
                  href={`/services/${service._id}`}
                  prefetch={true}
                  className="block h-full"
                >

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="
                      h-full
                      min-h-[160px]
                      bg-[#1e293b]
                      p-6
                      rounded-lg
                      hover:shadow-xl
                      hover:shadow-[#a3e635]/10
                      transition-all
                      duration-300
                      group
                      cursor-pointer
                      border-2
                      border-transparent
                      hover:border-[#a3e635]
                    "
                  >

                    <h3 className="text-xl xl:text-3xl text-white mb-2 group-hover:text-[#a3e635] transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-gray-400 xl:text-xl">
                      {service.desc}
                    </p>

                    {/* View Service */}

                    <div className="flex items-center gap-2 mt-5 text-[#a3e635] opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                      <span className="text-sm font-medium">
                        View Service
                      </span>

                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />

                    </div>

                  </motion.div>

                </Link>

              ))

            ) : (

              <div className="md:col-span-2 lg:col-span-3 text-center py-10">

                <p className="text-gray-400 text-lg">
                  No services available at the moment.
                </p>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* FEATURED PROJECTS */}
      {/* ================================================= */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text-center mb-12"
          >

            <h2 className="text-4xl xl:text-6xl mb-4">
              Featured Projects
            </h2>

            <div className="w-24 h-1 xl:w-48 xl:h-2 bg-[#a3e635] mx-auto" />

          </motion.div>

          {/* Projects Grid */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:min-h-[400px]">

            {/* Loading */}

            {projectsLoading ? (
              <>
                {[1, 2, 3].map((item) => (

                  <div
                    key={item}
                    className="
                      h-80
                      xl:h-[400px]
                      bg-gray-200
                      rounded-lg
                      animate-pulse
                      overflow-hidden
                    "
                  >
                    <div className="w-full h-full bg-gray-300" />
                  </div>

                ))}
              </>
            ) : projects.length > 0 ? (

              projects
                .slice(0, 3)
                .map((project, index) => (

                  <motion.div
                    key={project._id}
                    onClick={() =>
                      handleProject(project._id)
                    }
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-lg
                      shadow-lg
                      cursor-pointer
                    "
                  >

                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      loading="lazy"
                      className="
                        w-full
                        h-80
                        xl:h-full
                        object-cover
                        group-hover:scale-110
                        transition-transform
                        duration-500
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                        <h3 className="text-2xl xl:text-3xl">
                          {project.name}
                        </h3>

                      </div>

                    </div>

                  </motion.div>

                ))

            ) : (

              <div className="md:col-span-3 text-center py-10">

                <p className="text-gray-500 text-lg">
                  No projects available at the moment.
                </p>

              </div>

            )}

          </div>

          {/* View All Projects */}

          <div className="text-center mt-12">

            <Link
              href="/projects"
              prefetch={true}
              className="
                bg-[#0f172a]
                text-white
                px-8
                py-3
                rounded
                hover:bg-[#1e293b]
                transition-all
                inline-flex
                items-center
                xl:h-16
                xl:text-2xl
              "
            >
              View All Projects

              <ArrowRight
                className="ml-2"
                size={20}
              />
            </Link>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* TESTIMONIALS */}
      {/* ================================================= */}

      <section className="bg-gray-50 py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text-center mb-12"
          >

            <h2 className="text-4xl xl:text-6xl mb-4">
              Client Testimonials
            </h2>

            <div className="w-24 h-1 xl:w-48 xl:h-2 bg-[#a3e635] mx-auto" />

          </motion.div>

          {/* Testimonials Grid */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:min-h-[300px]">

            {/* Loading */}

            {feedbacksLoading ? (
              <>
                {[1, 2, 3].map((item) => (

                  <div
                    key={item}
                    className="
                      bg-white
                      p-6
                      rounded-lg
                      shadow-md
                      border-t-4
                      border-[#a3e635]
                      animate-pulse
                    "
                  >

                    {/* Stars Skeleton */}

                    <div className="flex gap-2 mb-5">

                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <div
                            key={star}
                            className="w-5 h-5 rounded bg-gray-200"
                          />
                        )
                      )}

                    </div>

                    {/* Text Skeleton */}

                    <div className="space-y-3">

                      <div className="h-4 bg-gray-200 rounded w-full" />

                      <div className="h-4 bg-gray-200 rounded w-5/6" />

                      <div className="h-4 bg-gray-200 rounded w-2/3" />

                    </div>

                    {/* Name Skeleton */}

                    <div className="h-5 bg-gray-200 rounded w-1/3 mt-6" />

                  </div>

                ))}
              </>
            ) : feedbacks.length > 0 ? (

              feedbacks
                .slice(0, 3)
                .map((feedback, index) => {

                  const safeRating = Math.max(
                    0,
                    Math.min(
                      5,
                      Math.floor(
                        Number(feedback.rating) || 0
                      )
                    )
                  );

                  return (
                    <motion.div
                      key={feedback._id || index}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.1,
                      }}
                      className="
                        relative
                        bg-white
                        p-6
                        rounded-lg
                        shadow-md
                        border-t-4
                        border-[#a3e635]
                      "
                    >

                      {/* Stars */}

                      <div className="flex mb-4">

                        {Array.from({
                          length: safeRating,
                        }).map((_, i) => (

                          <Star
                            key={i}
                            className="
                              w-5
                              h-5
                              xl:w-10
                              xl:h-10
                              text-[#a3e635]
                              fill-[#a3e635]
                            "
                          />

                        ))}

                      </div>

                      {/* Message */}

                      <p className="text-gray-600 mb-4 italic xl:text-2xl">
                        &quot;{feedback.message}&quot;
                      </p>

                      {/* Name */}

                      <p className="text-[#0f172a] xl:text-3xl">
                        - {feedback.name}
                      </p>

                    </motion.div>
                  );
                })

            ) : (

              <div className="md:col-span-3 text-center py-10">

                <p className="text-gray-500 text-lg">
                  No testimonials available at the moment.
                </p>

              </div>

            )}

          </div>

        </div>

      </section>

    </div>
  );
}