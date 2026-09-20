'use client';

import axios from 'axios';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Project {
  _id: string;
  name: string;
  description: string;

  imageUrl: string;
  subImageUrls: string[];

  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  living: number;

  area: number;
  cost: number;
}

const ProductDetails = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [project, setProject] = useState<Project | null>(null);

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://design-architecture-be.vercel.app';

  // ==========================================
  // FETCH PROJECT
  // ==========================================

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!id) {
      return;
    }

    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await axios.get<Project>(
          `${API_URL}/api/projects/${id}`
        );

        setProject(res.data);

        console.log(
          'Project details:',
          res.data
        );
      } catch (error) {
        console.error(
          'Error fetching project:',
          error
        );

        setError(
          'Unable to load project details. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, API_URL]);

  // ==========================================
  // FORMAT COST
  // ==========================================

  const formatCost = (
    cost?: number
  ) => {
    if (
      cost === undefined ||
      cost === null
    ) {
      return 'N/A';
    }

    return new Intl.NumberFormat(
      'en-LK'
    ).format(cost);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-white/20 border-t-[#a3e635] rounded-full animate-spin mx-auto mb-4" />

          <p className="text-white/70">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4">

        <div className="text-center max-w-lg">

          <h1 className="text-3xl font-semibold mb-4">
            Project Not Found
          </h1>

          <p className="text-white/60">
            {error ||
              'The requested project could not be found.'}
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative">

      {/* ================================= */}
      {/* LIGHTBOX MODAL */}
      {/* ================================= */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-8"
            onClick={() =>
              setSelectedImage(null)
            }
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              aria-label="Close image"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-4xl sm:text-5xl hover:text-[#a3e635] transition-colors z-[60]"
              onClick={() =>
                setSelectedImage(null)
              }
            >
              &times;
            </button>

            {/* SELECTED IMAGE */}

            <motion.img
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              src={selectedImage}
              alt={`${project.name} enlarged view`}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20 z-50"
              onClick={(e) =>
                e.stopPropagation()
              }
              onContextMenu={(e) =>
                e.preventDefault()
              }
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================= */}
      {/* HERO SECTION */}
      {/* ================================= */}

      <section className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b] py-14 sm:py-16 border-b border-white/10">

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

            <div className="inline-flex items-center gap-2 rounded-full border border-[#a3e635]/30 bg-[#a3e635]/10 px-4 py-2 text-sm text-[#a3e635] mb-5">
              Project Showcase
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-4">
              {project.name}
            </h1>

            <div className="w-24 h-1 bg-[#a3e635] mx-auto rounded-full" />

          </motion.div>
        </div>
      </section>

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <section className="py-8 sm:py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ================================= */}
          {/* FEATURED IMAGE */}
          {/* ================================= */}

          {project.imageUrl && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-3 sm:p-6 shadow-2xl shadow-black/20">

              <div className="w-full flex justify-center">

                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full max-w-4xl h-[240px] sm:h-[380px] md:h-[520px] object-cover rounded-2xl shadow-xl border border-white/10 cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                  onClick={() =>
                    setSelectedImage(
                      project.imageUrl
                    )
                  }
                  onContextMenu={(e) =>
                    e.preventDefault()
                  }
                  draggable={false}
                />

              </div>
            </div>
          )}

          {/* ================================= */}
          {/* CONTENT GRID */}
          {/* ================================= */}

          <div className="mt-8 grid grid-cols-1 xl:grid-cols-12 gap-8">

            {/* ================================= */}
            {/* PROJECT OVERVIEW */}
            {/* ================================= */}

            <div className="xl:col-span-4 order-2 xl:order-1">

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* CARD HEADER */}

                <div className="bg-[#0f172a] px-5 sm:px-6 py-5">

                  <h2 className="text-2xl font-semibold text-white">
                    Project Overview
                  </h2>

                  <p className="text-white/70 text-sm mt-1">
                    Key information about this project
                  </p>

                </div>

                {/* CARD CONTENT */}

                <div className="p-5 sm:p-6 space-y-5 text-[#0f172a]">

                  {/* DESCRIPTION */}

                  <div>

                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                      Description
                    </h3>

                    <p className="text-sm sm:text-base leading-7 text-gray-700">
                      {project.description}
                    </p>

                  </div>

                  {/* ================================= */}
                  {/* HOUSE DETAILS */}
                  {/* ================================= */}

                  <div className="grid grid-cols-2 gap-3">

                    {/* BEDROOMS */}

                    <div className="rounded-2xl bg-[#0f172a] text-white p-4">

                      <p className="text-xs text-white/60">
                        Bedrooms
                      </p>

                      <p className="text-2xl font-semibold mt-1">
                        {project.bedrooms ?? 0}
                      </p>

                    </div>

                    {/* BATHROOMS */}

                    <div className="rounded-2xl bg-[#a3e635] text-[#0f172a] p-4">

                      <p className="text-xs text-[#0f172a]/70">
                        Bathrooms
                      </p>

                      <p className="text-2xl font-semibold mt-1">
                        {project.bathrooms ?? 0}
                      </p>

                    </div>

                    {/* KITCHEN */}

                    <div className="rounded-2xl bg-[#f8fafc] border border-slate-200 p-4">

                      <p className="text-xs text-gray-500">
                        Kitchen
                      </p>

                      <p className="text-2xl font-semibold mt-1">
                        {project.kitchen ?? 0}
                      </p>

                    </div>

                    {/* LIVING */}

                    <div className="rounded-2xl bg-[#f8fafc] border border-slate-200 p-4">

                      <p className="text-xs text-gray-500">
                        Living
                      </p>

                      <p className="text-2xl font-semibold mt-1">
                        {project.living ?? 0}
                      </p>

                    </div>

                  </div>

                  {/* ================================= */}
                  {/* AREA + COST */}
                  {/* ================================= */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    {/* AREA */}

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                      <p className="text-xs text-gray-500">
                        Area
                      </p>

                      <p className="text-lg font-semibold text-[#0f172a] mt-1">
                        {project.area
                          ? `${project.area.toLocaleString()} sq ft`
                          : 'N/A'}
                      </p>

                    </div>

                    {/* COST */}

                    <div className="rounded-2xl border border-[#a3e635]/30 bg-[#a3e635]/10 p-4">

                      <p className="text-xs text-gray-600">
                        Cost
                      </p>

                      <p className="text-lg font-semibold text-[#0f172a] mt-1">
                        Rs. {formatCost(project.cost)}
                      </p>

                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* ================================= */}
            {/* GALLERY */}
            {/* ================================= */}

            <div className="xl:col-span-8 order-1 xl:order-2">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/20">

                {/* GALLERY HEADER */}

                <div className="flex items-center justify-between mb-5">

                  <div>

                    <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                      Gallery
                    </h2>

                    <p className="text-sm text-white/60 mt-1">
                      Tap any image to view larger
                    </p>

                  </div>

                </div>

                {/* ================================= */}
                {/* GALLERY IMAGES */}
                {/* ================================= */}

                {project.subImageUrls &&
                project.subImageUrls.length > 0 ? (

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {project.subImageUrls.map(
                      (
                        subImageUrl,
                        idx
                      ) => (

                        <div
                          key={`${subImageUrl}-${idx}`}
                          className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 cursor-pointer"
                          onClick={() =>
                            setSelectedImage(
                              subImageUrl
                            )
                          }
                        >

                          <div className="relative overflow-hidden aspect-[4/3]">

                            <img
                              src={
                                subImageUrl
                              }
                              alt={`${project.name} gallery image ${
                                idx + 1
                              }`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onContextMenu={(
                                e
                              ) =>
                                e.preventDefault()
                              }
                              draggable={
                                false
                              }
                            />

                            {/* HOVER OVERLAY */}

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">

                              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm">
                                View Image
                              </span>

                            </div>

                          </div>
                        </div>
                      )
                    )}

                  </div>

                ) : (

                  /* EMPTY GALLERY */

                  <div className="min-h-[200px] flex items-center justify-center border border-dashed border-white/10 rounded-2xl">

                    <div className="text-center px-4">

                      <p className="text-white/50">
                        No gallery images available for this project.
                      </p>

                    </div>

                  </div>

                )}

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductDetails;