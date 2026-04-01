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
            {/* <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <span>
                  <img 
                  src={logo}
                  alt="Logo"
                  className='rounded-full object-cover'
                />
                </span>
              </div>
              <span className="text-xl">LS MASTER BUILDERS</span>
            </div> */}
            <p className="text-gray-400 mb-4 xl:text-xl">
              Professional Architectural Designer creating innovative spaces and structural solutions.
            </p>
            <div className="flex space-x-4 xl:space-x-6 xl:w-20 xl:h-20">
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
            <h3 className="text-lg mb-4 text-[#a3e635] xl:text-2xl">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#a3e635] transition-colors xl:text-2xl">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#a3e635] transition-colors xl:text-2xl">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#a3e635] transition-colors xl:text-2xl">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-[#a3e635] transition-colors xl:text-2xl">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#a3e635] transition-colors xl:text-2xl">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-4 text-[#a3e635] xl:text-2xl">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="mt-1 text-[#a3e635] flex-shrink-0" />
                <span className="text-gray-400 xl:text-2xl">0761 380 569</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="mt-1 text-[#a3e635] flex-shrink-0" />
                <span className="text-gray-400 break-all xl:text-2xl">lahirucadstore1@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 text-[#a3e635] flex-shrink-0" />
                <span className="text-gray-400 xl:text-2xl">
                  No 67/H/1, Samagi Mawatha,<br />
                  Kuludewala, Panadura
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#334155] mt-8 pt-8 text-center">
          <p className="text-gray-400 xl:text-2xl">
            &copy; {currentYear} Lahiru Srimal. All rights reserved.
          </p>
          <p>
            <a 
              href='https://www.dev09solutions.com/' 
              target="_blank" 
              rel="noopener noreferrer"
              className='xl:text-2xl'
            >
              Develop by DEV09 Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
