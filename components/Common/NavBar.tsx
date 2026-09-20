'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  React.useEffect(() => { setIsLoggedIn(!!localStorage.getItem('token')); }, []);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' },
    { name: 'Feedback', path: '/feedback' }
  ];

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Left Spacer / Logo area */}
          <div></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm lg:text-base font-medium transition duration-300 ${
                  isActive(link.path)
                    ? 'text-[#a3e635]'
                    : 'text-white hover:text-[#a3e635]'
                }`}
              >
                {link.name}

                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#a3e635] rounded"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md text-sm font-medium hover:bg-[#bef264] transition"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md text-sm font-medium hover:bg-[#bef264] transition"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:opacity-90 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#1e293b] transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1e293b] border-t border-[#334155]">
          <div className="px-4 py-4 space-y-2">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md transition ${
                  isActive(link.path)
                    ? 'bg-[#a3e635] text-[#0f172a]'
                    : 'text-white hover:bg-[#334155]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-[#334155] flex flex-col gap-2">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md font-medium"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="text-center px-4 py-2 bg-[#a3e635] text-[#0f172a] rounded-md font-medium"
                  >
                    SignUp
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-md font-medium"
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