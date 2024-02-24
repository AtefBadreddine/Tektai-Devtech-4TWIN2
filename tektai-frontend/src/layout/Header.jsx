import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../auth/AuthProvider"; // Import AuthContext
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faDatabase, faMedal } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const { user, login, logout } = useContext(AuthContext); // Access authentication context
  const [top, setTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 bg-white transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 mr-4">
            <Link to="/" className="flex gap-x-1" aria-label="Cruip">
              <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
              </svg>
              <h1 className="font-bold text-xl">TEKTAI</h1>
            </Link>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
              </svg>
            </button>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4">
                Home
              </Link>
              <Link to="/challenges" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4">
                Challenges
              </Link>
              <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4">
                Datasets
              </Link>
              <Link to="/ranking" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4">
                Rankings
              </Link>
            </div>
            <div className="flex items-center">
              <input type="text" placeholder="Search..." className="border border-gray-300 rounded-lg py-1 px-3 mr-4 focus:outline-none focus:border-indigo-500"/>
              {!user ? (
                <div>
                  <Link to="/signin" className="text-gray-700 hover:text-gray-900 mr-4">
                    Sign in
                  </Link>
                  <Link to="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800">
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center">
                  <h1 className="text-gray-700 mr-4">Welcome, {user.role === 'challenger' ? user.username : user.companyName}</h1>
                  <button onClick={logout} className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800">
                    Log out
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className={`lg:hidden absolute top-16 left-0 w-full bg-white z-20 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="text-sm">
              <Link to="/" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
              <Link to="/challenges" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center">
                <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                Challenges
              </Link>
              <Link to="/" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center">
                <FontAwesomeIcon icon={faDatabase} className="mr-2" />
                Datasets
              </Link>
              <Link to="/ranking" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center">
                <FontAwesomeIcon icon={faMedal} className="mr-2" />
                Rankings
              </Link>
              <Link to="/signin" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center mr-4">
                Sign in
              </Link>
              <Link to="/signup" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center bg-gray-900 text-white hover:bg-gray-800">
                Sign up
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
