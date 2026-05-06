"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import StarRating from "../components/user/StarRating";
import Swal from 'sweetalert2';
import { motion } from "motion/react";
import { Trash2 } from "lucide-react";

interface Feedback {
  _id: string;
  name: string;
  message: string;
  rating: number;
  createdAt?: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>( null);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 0,
  });

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get<Feedback[]>(
        "https://design-architecture-be.vercel.app/api/feedback"
      );
      setFeedbacks(res.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: 'Failed to fetch feedback!',
        confirmButtonColor: '#a3e635',
      });
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const averageRating = useMemo(() => {
    if (feedbacks.length === 0) return 0;
    const total = feedbacks.reduce((sum, item) => sum + item.rating, 0);
    return total / feedbacks.length;
  }, [feedbacks]);

  const openModal = () => {

    setFormData({
      name: "",
      message: "",
      rating: 0,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
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
    if (!formData.rating) {
      Swal.fire({
        icon: 'warning',
        title: 'Rating Required',
        text: 'You must select rating to submit feedback!',
        confirmButtonColor: '#a3e635',
      });
      return;
    }

    try {
      await axios.post("https://design-architecture-be.vercel.app/api/feedback", {
        name: currentUser.name || '',
        message: formData.message,
        rating: formData.rating,
      });

      Swal.fire({
        icon: 'success',
        title: 'Feedback Submitted!',
        text: 'Thank you for your feedback ❤️',
        confirmButtonColor: '#a3e635',
      });

      setFormData({
        name: "",
        message: "",
        rating: 0,
      });
      closeModal();
      fetchFeedbacks();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        text: 'Failed to submit feedback!',
        confirmButtonColor: '#a3e635',
      });
    }
  }

  const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token is: ", token)
  
        const res = await axios.get(
          "https://design-architecture-be.vercel.app/api/users/profile",
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

    const handleRemove = (index: number) => {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'This will permanently delete the feedback!',
      }).then((result) => {
        if (result.isConfirmed) {
          const updated = [...feedbacks];
          updated.splice(index, 1);
          setFeedbacks(updated);
        }
      });
    };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl xl:text-6xl mb-4">Feedbacks</h1>
            <div className="w-24 h-1 xl:w-40 xl:h-2 bg-[#a3e635] mx-auto mb-6"></div>
          </motion.div>
        </div>
     </section>
      <div className="p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold xl:text-4xl">Feedbacks</h2>
            <p className="text-gray-400 mt-1 xl:text-2xl">
              Average Rating: {averageRating.toFixed(1)} / 5
            </p>
          </div>

          <button
            onClick={openModal}
            className="bg-lime-400 text-slate-900 px-4 py-2 rounded hover:bg-lime-500 font-medium xl:text-2xl"
          >
            Add Feedback
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.length === 0 ? (
              <div className="bg-slate-800 border border-slate-700 rounded p-4 text-gray-400 xl:text-2xl">
                No feedback yet
              </div>
              ) : (
                feedbacks.map((f) => (
                  <div
                    key={f._id}
                    className="relative bg-white p-6 rounded-lg shadow-md border-t-4 border-[#a3e635] xl:text-2xl"
                  >
                    {/* ✅ Dustbin Icon */}
                    {currentUser?.role === "admin" && (
                      <button
                        onClick={() => handleRemove(feedbacks.indexOf(f))}
                        className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 transition"
                      >
                        <Trash2 className="w-5 h-5 xl:w-7 xl:h-7" />
                      </button>
                    )}

                    <div className="flex items-center justify-between gap-4 xl:gap-8">
                      <div>
                        <p className="font-semibold text-black xl:text-2xl">
                          {f.name || "Anonymous"}
                        </p>
                        <p className="text-sm text-gray-400 xl:text-2xl">
                          {f.createdAt
                            ? new Date(f.createdAt).toLocaleDateString()
                            : ""}
                        </p>
                      </div>

                      <div className="text-yellow-400 text-lg">
                        {"★".repeat(f.rating)}
                        {"☆".repeat(5 - f.rating)}
                      </div>
                    </div>

                    <p className="mt-3 text-gray-600 mb-4 italic xl:text-2xl">
                      "{f.message}"
                    </p>
                  </div>
                ))
              )}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-slate-800 p-6 rounded w-full max-w-md border border-slate-700">
              <h3 className="text-xl mb-4 font-semibold xl:text-2xl">Give Feedback</h3>

              {/* <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full mb-3 p-2 bg-slate-700 text-white rounded border border-slate-600 outline-none"
              /> */}

              <textarea
                placeholder="Your Feedback"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full mb-3 p-2 bg-slate-700 text-white rounded border border-slate-600 outline-none min-h-[120px]"
              />

              <p className="mb-2 text-sm text-gray-300 xl:text-2xl">Rate us:</p>
              <StarRating
                rating={formData.rating}
                setRating={(value: number) =>
                  setFormData({ ...formData, rating: value })
                }
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="text-white px-4 py-2 rounded border border-slate-600 xl:text-2xl"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-lime-400 text-slate-900 px-5 py-2 rounded font-medium xl:text-2xl"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;