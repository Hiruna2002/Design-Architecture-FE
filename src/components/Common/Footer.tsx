import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#a3e635] rotate-45 flex items-center justify-center">
                <span className="text-[#0f172a] -rotate-45 text-xl">LS</span>
              </div>
              <span className="text-xl">LAHIRU SRIMAL</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional Architectural Designer creating innovative spaces and structural solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#a3e635] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#a3e635] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#a3e635] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4 text-[#a3e635]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#a3e635] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#a3e635] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#a3e635] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-[#a3e635] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#a3e635] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-4 text-[#a3e635]">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="mt-1 text-[#a3e635] flex-shrink-0" />
                <span className="text-gray-400">0761 380 569</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="mt-1 text-[#a3e635] flex-shrink-0" />
                <span className="text-gray-400 break-all">Lahiru.cadstoral@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 text-[#a3e635] flex-shrink-0" />
                <span className="text-gray-400">
                  No 67/H/1, Samagi Mawatha,<br />
                  Kuludewala, Panadura
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#334155] mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Lahiru Srimal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
