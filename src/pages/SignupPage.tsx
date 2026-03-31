import React, { useState } from 'react';
import { Link } from 'react-router';
import { UserPlus, Mail, Lock, User, Phone } from 'lucide-react';
// import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface SignUpProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


export const SignUp: React.FC<SignUpProps> = ({ setIsLoggedIn }) => { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const userRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        text: 'Password and Confirm Password mismatch',
        confirmButtonColor: '#a3e635',
      });
      return;
    }

    if (formData.password.length < 6) {
      console.error("Password should be at least 6 characters");
      Swal.fire({
        icon: 'error',
        text: 'Password should be at least 6 characters',
        confirmButtonColor: '#a3e635',
      });
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      };

      const res = await axios.post("https://design-architecture-be.vercel.app/api/users", payload);
      console.log("Response from server:", res.data);

      Swal.fire({
        icon: 'success',
        title: 'Successfully!',
        text: 'Account create successfully!',
        confirmButtonColor: '#a3e635',
      });

      localStorage.setItem("token", res.data.token);

      setIsLoggedIn(true)

      navigate('/');
    } catch (error: any) {
      console.log("FULL ERROR:", error);
      console.log("SERVER ERROR:", error.response?.data);

      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message || 'Account not create!',
        confirmButtonColor: '#a3e635',
  });
    }
  };

  return (
  <div className="min-h-screen bg-[#0f172a] relative flex items-center justify-center px-4 overflow-hidden">

    {/* Background Accent Glow */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#86d91c] opacity-20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#86d91c] opacity-10 rounded-full blur-3xl"></div>

    <div className="max-w-md w-full relative z-10">

      {/* Logo/Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#86d91c] rounded-2xl shadow-xl mb-6">
          <UserPlus className="w-9 h-9 text-[#0f172a]" />
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Create Account
        </h2>
        <p className="mt-2 text-gray-400 text-sm">
          Join us today
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        <form className="space-y-6" onSubmit={userRegister}>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Full Name *
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#86d91c] transition" />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f172a] text-white placeholder-gray-500 border border-gray-700 focus:border-[#86d91c] focus:ring-2 focus:ring-[#86d91c]/40 outline-none transition-all duration-300"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address *
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#86d91c] transition" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f172a] text-white placeholder-gray-500 border border-gray-700 focus:border-[#86d91c] focus:ring-2 focus:ring-[#86d91c]/40 outline-none transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Phone Number *
            </label>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#86d91c] transition" />
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f172a] text-white placeholder-gray-500 border border-gray-700 focus:border-[#86d91c] focus:ring-2 focus:ring-[#86d91c]/40 outline-none transition-all duration-300"
                placeholder="0712345678"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password *
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#86d91c] transition" />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f172a] text-white placeholder-gray-500 border border-gray-700 focus:border-[#86d91c] focus:ring-2 focus:ring-[#86d91c]/40 outline-none transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Confirm Password *
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#86d91c] transition" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f172a] text-white placeholder-gray-500 border border-gray-700 focus:border-[#86d91c] focus:ring-2 focus:ring-[#86d91c]/40 outline-none transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#86d91c] text-[#0f172a] font-bold shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
          >            
              Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="mt-3 inline-block w-full py-3 rounded-xl border border-[#86d91c] text-[#86d91c] font-semibold hover:bg-[#86d91c] hover:text-[#0f172a] transition-all duration-300"
          >
            Sign In Instead
          </Link>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        <Link to="/" className="hover:text-[#86d91c] transition">
          ← Back to Home
        </Link>
      </p>

    </div>
  </div>
);
};
