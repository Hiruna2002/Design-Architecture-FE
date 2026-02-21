import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
// import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
//   const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
    //   await signIn(email, password);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-md w-full">
    //     {/* Logo/Header */}
    //     <div className="text-center mb-8">
    //       <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
    //         <LogIn className="w-8 h-8 text-white" />
    //       </div>
    //       <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
    //       <p className="mt-2 text-gray-600">Sign in to your account</p>
    //     </div>

    //     {/* Login Form */}
    //     <div className="bg-white rounded-lg shadow-lg p-8">
    //       <form onSubmit={handleSubmit} className="space-y-6">
    //         <div>
    //           <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
    //             Email Address
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //               <Mail className="h-5 w-5 text-gray-400" />
    //             </div>
    //             <input
    //               id="email"
    //               name="email"
    //               type="email"
    //               required
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
    //               placeholder="you@example.com"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
    //             Password
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //               <Lock className="h-5 w-5 text-gray-400" />
    //             </div>
    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               required
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
    //               placeholder="••••••••"
    //             />
    //           </div>
    //         </div>

    //         <div className="flex items-center justify-between">
    //           <div className="flex items-center">
    //             <input
    //               id="remember-me"
    //               name="remember-me"
    //               type="checkbox"
    //               className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
    //             />
    //             <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
    //               Remember me
    //             </label>
    //           </div>

    //           <div className="text-sm">
    //             <a href="#" className="font-medium text-primary hover:text-primary/80">
    //               Forgot password?
    //             </a>
    //           </div>
    //         </div>

    //         <button
    //           type="submit"
    //           disabled={loading}
    //           className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
    //         >
    //           {loading ? 'Signing in...' : 'Sign In'}
    //         </button>
    //       </form>

    //       <div className="mt-6">
    //         <div className="relative">
    //           <div className="absolute inset-0 flex items-center">
    //             <div className="w-full border-t border-gray-300"></div>
    //           </div>
    //           <div className="relative flex justify-center text-sm">
    //             <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
    //           </div>
    //         </div>

    //         <div className="mt-6">
    //           <Link
    //             to="/signup"
    //             className="w-full flex justify-center py-3 px-4 border-2 border-primary rounded-md shadow-sm text-sm font-semibold text-primary bg-white hover:bg-gray-50"
    //           >
    //             Create New Account
    //           </Link>
    //         </div>
    //       </div>
    //     </div>

    //     <p className="mt-8 text-center text-sm text-gray-600">
    //       <Link to="/" className="font-medium text-primary hover:text-primary/80">
    //         ← Back to Home
    //       </Link>
    //     </p>
    //   </div>
    // </div>


//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
//     <div className="max-w-md w-full">
      
//       {/* Logo/Header */}
//       <div className="text-center mb-8">
//         <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl mb-6 border border-white/30">
//           <LogIn className="w-9 h-9 text-white" />
//         </div>
//         <h2 className="text-4xl font-extrabold text-white tracking-tight">
//           Welcome Back
//         </h2>
//         <p className="mt-2 text-white/80 text-sm">
//           Sign in to continue your journey
//         </p>
//       </div>

//       {/* Login Form */}
//       <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8">
//         <form onSubmit={handleSubmit} className="space-y-6">
          
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-white mb-2">
//               Email Address
//             </label>
//             <div className="relative group">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 group-focus-within:text-white transition" />
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/40 outline-none transition-all duration-300"
//                 placeholder="you@example.com"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-semibold text-white mb-2">
//               Password
//             </label>
//             <div className="relative group">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 group-focus-within:text-white transition" />
//               <input
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/40 outline-none transition-all duration-300"
//                 placeholder="••••••••"
//               />
//             </div>
//           </div>

//           {/* Remember + Forgot */}
//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center text-white/80">
//               <input
//                 type="checkbox"
//                 className="h-4 w-4 rounded border-white/40 bg-white/10 text-white focus:ring-white"
//               />
//               <span className="ml-2">Remember me</span>
//             </label>

//             <a href="#" className="text-white font-medium hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl bg-white text-purple-600 font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="mt-8 text-center">
//           <p className="text-white/80 text-sm">
//             Don't have an account?
//           </p>
//           <Link
//             to="/signup"
//             className="mt-3 inline-block w-full py-3 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
//           >
//             Create New Account
//           </Link>
//         </div>
//       </div>

//       <p className="mt-8 text-center text-sm text-white/80">
//         <Link to="/" className="hover:underline">
//           ← Back to Home
//         </Link>
//       </p>
//     </div>
//   </div>


// </div>

          <div className="min-h-screen bg-[#0f172a] relative flex items-center justify-center px-4 overflow-hidden">

    {/* Background Accent Glow */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#86d91c] opacity-20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#86d91c] opacity-10 rounded-full blur-3xl"></div>

    <div className="max-w-md w-full relative z-10">

      {/* Logo/Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#86d91c] rounded-2xl shadow-xl mb-6">
          <LogIn className="w-9 h-9 text-[#0f172a]" />
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-gray-400 text-sm">
          Sign in to your account
        </p>
      </div>

      {/* Login Form */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#86d91c] transition" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f172a] text-white placeholder-gray-500 border border-gray-700 focus:border-[#86d91c] focus:ring-2 focus:ring-[#86d91c]/40 outline-none transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#86d91c] transition" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f172a] text-white placeholder-gray-500 border border-gray-700 focus:border-[#86d91c] focus:ring-2 focus:ring-[#86d91c]/40 outline-none transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-[#0f172a] text-[#86d91c] focus:ring-[#86d91c]"
              />
              <span className="ml-2">Remember me</span>
            </label>

            <a href="#" className="text-[#86d91c] font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#86d91c] text-[#0f172a] font-bold shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Login...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?
          </p>

          <Link
            to="/signup"
            className="mt-3 inline-block w-full py-3 rounded-xl border border-[#86d91c] text-[#86d91c] font-semibold hover:bg-[#86d91c] hover:text-[#0f172a] transition-all duration-300"
          >
            Create New Account
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
