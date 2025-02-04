import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="fixed w-screen">
      <nav className="bg-blue-700 text-white py-4 px-6 md:px-12 flex items-center justify-between shadow-md">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">ROBO LAB</Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="bg-transparent border text-gray-100 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-transparent hover:text-white border border-white transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
