import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../../../shared/api'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    api.post('/user/logout')
      .then(() => navigate('/login'))
      .catch((err) => console.log(err));
  };

  return (
    <nav className={`bg-gray-900 p-4 ${isOpen ? 'mobile-open' : ''}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-semibold">
          Logo
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
        <div className="hidden lg:flex items-center">
          <Link
            to="/"
            className="text-white hover:text-violet-500 font-semibold mr-8"
          >
            About
          </Link>
          <Link
            to="/"
            className="text-white hover:text-violet-500 font-semibold mr-8"
          >
            News
          </Link>
          <button
            className="btn border-white border-2 text-white"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
      <div className={`lg:hidden mobile-menu ${isOpen ? 'open' : 'closed'}`}>
        <ul className="mt-5">
          <li>
            <Link
              to="/"
              className="block text-white hover:text-violet-500 font-semibold p-3"
            >
              About
            </Link>
          </li>
          <Link
            to="/"
            className="block text-white hover:text-violet-500 font-semibold p-3"
          >
            News
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
