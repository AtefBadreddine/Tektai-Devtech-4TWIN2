  import React, { useState, useEffect, useContext } from 'react';
  import { Link } from 'react-router-dom';
  import { AuthContext } from "../auth/AuthProvider"; // Import AuthContext
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faHome, faChartBar, faDatabase, faMedal, faAngleDown, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
  import DropdownUser from '../components/Header/DropdownUser';
  import './Header.css'; // Import CSS file for Header styles
  import { Tooltip } from '@chakra-ui/react'
  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
  import {useAuth} from "../auth/useAuth";
import UserSearchF from '../pages/usersearch/UsersearchF';
  function Header() {
    const { login, logout } = useContext(AuthContext); // Access authentication context
    const [top, setTop] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const handleLogout = () => {
      logout();
    };
    // detect whether user has scrolled the page down by 10px
    useEffect(() => {
      
      const storedUser = localStorage.getItem('user') || null;

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:');
          setUser(null);
          // Handle the error (e.g., clear invalid data from localStorage)
        }
      }
      setLoading(false); // Set loading to false after checking local storage
      const logo = document.querySelector('.logo');

      // Add bounce animation class to logo on page load
      logo.classList.add('bounce');

      // Remove bounce animation class after animation ends
      const onAnimationEnd = () => {
        logo.classList.remove('bounce');
      };

      logo.addEventListener('animationend', onAnimationEnd);

      return () => {
        logo.removeEventListener('animationend', onAnimationEnd);
      };

      const scrollHandler = () => {
        window.pageYOffset > 10 ? setTop(false) : setTop(true);
      };
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
      <header className={`fixed w-full z-30 md:bg-opacity-90 bg-white transition duration-300 ease-in-out backdrop-blur ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0 mr-4">
            <Link to="/" className="flex gap-x-1 logo" aria-label="Cruip">
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
                <Link to="/challenges" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4">  <Tooltip label='Partake in a coding challenge for glory or money too xoxo'>
                  Challenges              
                  </Tooltip>
                </Link>
                <Link to="/ranking" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4"><Tooltip label='Check all our users scores'>
                  Rankings</Tooltip>
                </Link>
                <Link to="/ranking" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4"><Tooltip label='Check all our users scores'>
                  Datasets</Tooltip>
                </Link>
                <Link to="/aboutUs" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4"><Tooltip label='Check all our users scores'>
                  AboutUs</Tooltip>
                </Link>
                {user?.role === 'admin' && (
                <Link to="/admin" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4">
                  Admin Dashboard
                </Link>
                )}
               
              </div>
              <div className="flex items-center">
                <UserSearchF></UserSearchF>
        {loading ? (
        <div className="spinner" style={{ 
          border: '4px solid rgba(0, 0, 0, 0.1)',
          borderLeftColor: '#7986cb',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          animation: 'spin 1s linear infinite'
        }}></div> // Render spinner animation while loading
          ) : !user ? (
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
            <DropdownUser />
          </div>
        )}
      </div>
            </nav>

            <div className={`lg:hidden absolute top-16 left-0 w-full bg-white z-20 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              <div className="text-sm">
              {loading ? (
        <div className="spinner" style={{ 
          border: '4px solid rgba(0, 0, 0, 0.1)',
          borderLeftColor: '#7986cb',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          animation: 'spin 1s linear infinite'
        }}></div> // Render spinner animation while loading
          ) : !user ? (
          <div>
            <Link to="/signin" className="text-gray-700 hover:text-gray-900 mr-4">
              Sign in
            </Link>
            <Link to="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800">
              Sign up
            </Link>
          </div>
        ) : (
                <div>
<Link to="/profile" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center">
  <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>
    {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
  </span>
</Link>
<button         onClick={handleLogout} // Call handleLogout on button click
 className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
          
          <svg
            className="fill-current"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
              fill=""
            />
            <path
              d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
              fill=""
            />
          </svg>
          Log Out
        </button>
<Link to="/profile" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center">
  <FontAwesomeIcon icon={faUser} className="mr-2" />
  <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>My Profile</span>
</Link>

<Link to="/pages/settings" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center">
  <FontAwesomeIcon icon={faCog} className="mr-2" />
  <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>Account Settings</span>
</Link>
               </div> 
        )}
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
             
              </div>
            </div>

          </div>
        </div>
      </header>
    );
  }

  export default Header;
