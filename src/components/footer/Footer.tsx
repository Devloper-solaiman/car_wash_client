import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';

type TFooterProps = object;

const Footer: FC<TFooterProps> = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-10 border-t mt-10 border-default-200`}>
      <div className="container mx-auto px-4">
        {/* Logo and Description */}
        <motion.div
          className="flex flex-col items-center md:flex-row justify-center md:justify-start gap-5 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
          <p className="mt-4 sm:mt-0 text-center  md:text-left max-w-md">
            Providing top-notch car wash services with the best products and
            professionals in the industry.
          </p>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="flex flex-col items-center justify-center md:flex-row md:justify-between md:items-start gap-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center md:flex-col md:justify-between md:items-start">
            <h4 className="font-semibold mb-4">Services</h4>
            <Link
              to="/services"
              className="block hover:text-warning font-normal mb-2"
            >
              Services
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-col md:justify-between md:items-start">
            <h4 className="font-semibold mb-4">Company</h4>
            <Link
              to="/aboutUs"
              className="block hover:text-warning font-normal mb-2"
            >
              About Us
            </Link>
            <Link
              to="/dashboard/dashboard"
              className="block hover:text-warning font-normal mb-2"
            >
              Dashboard
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-col md:justify-between md:items-start">
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center sm:justify-start gap-4">
              <Link
                className="border border-default-100 rounded-full p-2 "
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl hover:text-warning" />
              </Link>
              <Link
                className="border border-default-100 rounded-full p-2 "
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl hover:text-warning" />
              </Link>
              <Link
                className="border border-default-100 rounded-full p-2 "
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl hover:text-warning" />
              </Link>
              <Link
                className="border border-default-100 rounded-full p-2 "
                to="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-xl hover:text-warning" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className={`text-center border-t pt-6 ${
            theme === 'dark' ? 'border-gray-50 border-opacity-15' : ''
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; {currentYear} Car Wash Company. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
