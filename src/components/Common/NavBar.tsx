// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Projects', path: '/projects' },
//     { name: 'Process', path: '/process' },
//     { name: 'Contact', path: '/contact' },
//     { name: 'Feedback', path: '/feedback' }
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <nav className="bg-[#0f172a] text-white sticky top-0 z-50 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3">
//             {/* Logo can be placed here */}
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`px-4 py-2 rounded transition-all duration-300 relative ${
//                   isActive(link.path)
//                     ? 'text-[#a3e635]'
//                     : 'text-white hover:text-[#a3e635]'
//                 }`}
//               >
//                 {link.name}
//                 {isActive(link.path) && (
//                   <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a3e635]"></span>
//                 )}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Buttons */}
//           {!isLoggedIn && (
//             <div className="hidden md:flex items-center gap-2">
//               <Link
//                 to="/login"
//                 className="px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md hover:bg-[#86d91c] transition-colors"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md hover:bg-[#86d91c] transition-colors"
//               >
//                 SignUp
//               </Link>
//             </div>
//           )}

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 rounded hover:bg-[#1e293b] transition-colors"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <div className="md:hidden bg-[#1e293b] border-t border-[#334155]">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`block px-3 py-2 rounded transition-colors ${
//                   isActive(link.path)
//                     ? 'bg-[#a3e635] text-[#0f172a]'
//                     : 'text-white hover:bg-[#334155]'
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {!isLoggedIn && (
//               <div className="pt-3 mt-3 border-t border-[#334155] flex flex-col gap-2">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="block w-full text-center px-3 py-2 bg-[#a3e635] text-[#0f172a] rounded-md hover:bg-[#86d91c] transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   onClick={() => setIsOpen(false)}
//                   className="block w-full text-center px-3 py-2 bg-[#a3e635] text-[#0f172a] rounded-md hover:bg-[#86d91c] transition-colors"
//                 >
//                   SignUp
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';

// interface NavbarProps {
//   isLoggedIn: boolean;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     return !!localStorage.getItem("token");
//   });
//   const location = useLocation();

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Projects', path: '/projects' },
//     { name: 'Process', path: '/process' },
//     { name: 'Contact', path: '/contact' },
//     { name: 'Feedback', path: '/feedback' }
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   // ✅ Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//   };

//   return (
//     <nav className="bg-[#0f172a] text-white sticky top-0 z-50 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           <div></div>
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`px-4 py-2 rounded transition-all duration-300 relative ${
//                   isActive(link.path)
//                     ? 'text-[#a3e635]'
//                     : 'text-white hover:text-[#a3e635]'
//                 }`}
//               >
//                 {link.name}
//                 {isActive(link.path) && (
//                   <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a3e635]"></span>
//                 )}
//               </Link>
//             ))}
//           </div>

//           {/* ✅ Desktop Auth Buttons */}
//           <div className="hidden md:flex items-center gap-2">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md hover:bg-[#86d91c]"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md hover:bg-[#86d91c]"
//                 >
//                   SignUp
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 rounded hover:bg-[#1e293b]"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* ✅ Mobile Sidebar */}
//       {isOpen && (
//         <div className="md:hidden bg-[#1e293b] border-t border-[#334155]">
//           <div className="px-2 pt-2 pb-3 space-y-1">

//             {/* Nav links */}
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`block px-3 py-2 rounded ${
//                   isActive(link.path)
//                     ? 'bg-[#a3e635] text-[#0f172a]'
//                     : 'text-white hover:bg-[#334155]'
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {/* ✅ Auth Buttons inside mobile */}
//             <div className="pt-3 mt-3 border-t border-[#334155] flex flex-col gap-2">
//               {!isLoggedIn ? (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={() => setIsOpen(false)}
//                     className="text-center px-3 py-2 bg-[#a3e635] text-[#0f172a] rounded-md"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     onClick={() => setIsOpen(false)}
//                     className="text-center px-3 py-2 bg-[#a3e635] text-[#0f172a] rounded-md"
//                   >
//                     SignUp
//                   </Link>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsOpen(false);
//                   }}
//                   className="px-3 py-2 bg-red-500 text-white rounded-md"
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>

//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ isLoggedIn, setIsLoggedIn }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' },
    { name: 'Feedback', path: '/feedback' }
  ];

  const isActive = (path: string) => location.pathname === path;

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 🔥 update global state
  };

  return (
    <nav className="bg-[#0f172a] text-white sticky top-0 z-50 shadow-lg xl:px-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex justify-between items-center h-20">
          <div></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 xl:text-3xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded transition-all duration-300 relative ${
                  isActive(link.path)
                    ? 'text-[#a3e635]'
                    : 'text-white hover:text-[#a3e635]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a3e635"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md xl:text-3xl">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md xl:text-3xl">
                  SignUp
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:bg-[#1e293b]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#1e293b] border-t border-[#334155]">
          <div className="px-2 pt-2 pb-3 space-y-1">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded ${
                  isActive(link.path)
                    ? 'bg-[#a3e635] text-[#0f172a]'
                    : 'text-white hover:bg-[#334155]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-[#334155] flex flex-col gap-2">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-center px-3 py-2 bg-[#a3e635] text-[#0f172a] rounded-md">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="text-center px-3 py-2 bg-[#a3e635] text-[#0f172a] rounded-md">
                    SignUp
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded-md"
                >
                  Logout
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}

