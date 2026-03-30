"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import StarRating from "../components/user/StarRating";

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
      console.error("Error fetching feedbacks:", err);
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
      alert("You must login to submit feedback!");
      return;
    }
    if (!formData.rating) {
      alert("Please select rating");
      return;
    }

    try {
      await axios.post("https://design-architecture-be.vercel.app/api/feedback", {
        name: currentUser.name || '',
        message: formData.message,
        rating: formData.rating,
      });

      alert("Feedback submitted ❤️");
      setFormData({
        name: "",
        message: "",
        rating: 0,
      });
      closeModal();
      fetchFeedbacks();
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback");
    }
  }

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
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Feedbacks</h2>
          <p className="text-gray-400 mt-1">
            Average Rating: {averageRating.toFixed(1)} / 5
          </p>
        </div>

        <button
          onClick={openModal}
          className="bg-lime-400 text-slate-900 px-4 py-2 rounded hover:bg-lime-500 font-medium"
        >
          Add Feedback
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {feedbacks.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded p-4 text-gray-400">
              No feedback yet
            </div>
            ) : (
              feedbacks.map((f) => (
                <div
                  key={f._id}
                  className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#a3e635]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-black">
                        {f.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-400">
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

                  <p className="mt-3 text-gray-600 mb-4 italic">"{f.message}"</p>
                </div>
              ))
            )}
        
      </div>

      

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-800 p-6 rounded w-full max-w-md border border-slate-700">
            <h3 className="text-xl mb-4 font-semibold">Give Feedback</h3>

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

            <p className="mb-2 text-sm text-gray-300">Rate us:</p>
            <StarRating
              rating={formData.rating}
              setRating={(value: number) =>
                setFormData({ ...formData, rating: value })
              }
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="text-white px-4 py-2 rounded border border-slate-600"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-lime-400 text-slate-900 px-5 py-2 rounded font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;