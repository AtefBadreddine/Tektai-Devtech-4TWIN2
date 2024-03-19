  import React, { useState, useEffect, useContext } from 'react';
  import { Link } from 'react-router-dom';
  import { AuthContext } from "../auth/AuthProvider"; // Import AuthContext
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import {
  faHome,
  faChartBar,
  faDatabase,
  faMedal,
  faAngleDown,
  faCog,
  faUser,
  faSignIn, faSignInAlt
  } from '@fortawesome/free-solid-svg-icons';
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="150"
                zoomAndPan="magnify"
                viewBox="0 0 375 374.999991"
                height="150"
                preserveAspectRatio="xMidYMid meet"
                version="1.0"
              >
                <defs>
                  <g />
                  <clipPath id="be6fd072f5">
                    <path
                      d="M 15 195 L 75.75 195 L 75.75 205 L 15 205 Z M 15 195 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                  <clipPath id="4401664a78">
                    <path
                      d="M 27 172 L 75.75 172 L 75.75 182 L 27 182 Z M 27 172 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                  <clipPath id="64520df577">
                    <path
                      d="M 52 183 L 75.75 183 L 75.75 194 L 52 194 Z M 52 183 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                  <clipPath id="84c2113452">
                    <path
                      d="M 29 206 L 75.75 206 L 75.75 217 L 29 217 Z M 29 206 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                  <clipPath id="3eb0e7f209">
                    <path
                      d="M 33 218 L 75.75 218 L 75.75 228 L 33 228 Z M 33 218 "
                      clip-rule="nonzero"
                    />
                  </clipPath>
                </defs>
                <g clip-path="url(#be6fd072f5)">
                  <path
                    fill="#0091ff"
                    d="M 102.460938 195.351562 L 53.4375 195.351562 L 51.347656 198.96875 L 46.5 198.96875 L 44.40625 195.351562 C 42.601562 195.351562 19.980469 195.351562 18.175781 195.351562 L 15.46875 200.039062 L 18.175781 204.730469 C 19.980469 204.730469 42.601562 204.730469 44.40625 204.730469 L 46.5 201.109375 L 51.347656 201.109375 L 53.4375 204.730469 L 102.460938 204.730469 C 103 201.628906 103 198.457031 102.460938 195.351562 Z M 102.460938 195.351562 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
                <g clip-path="url(#4401664a78)">
                  <path
                    fill="#0091ff"
                    d="M 35.15625 181.671875 L 37.25 178.054688 L 42.097656 178.054688 L 44.191406 181.671875 L 95.875 181.671875 C 86.160156 170.722656 75.265625 172.285156 62.128906 172.285156 L 44.191406 172.285156 L 42.097656 175.90625 L 37.25 175.90625 L 35.15625 172.285156 L 29.742188 172.285156 L 27.035156 176.976562 L 29.742188 181.664062 L 35.15625 181.664062 Z M 35.15625 181.671875 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
                <g clip-path="url(#64520df577)">
                  <path
                    fill="#0091ff"
                    d="M 67.535156 187.441406 L 62.6875 187.441406 L 60.59375 183.824219 L 55.179688 183.824219 L 52.472656 188.511719 L 55.179688 193.203125 L 60.59375 193.203125 L 62.6875 189.582031 L 67.535156 189.582031 L 69.628906 193.203125 L 102.003906 193.203125 C 101.132812 189.777344 99.613281 186.605469 97.59375 183.8125 L 69.628906 183.8125 Z M 67.535156 187.441406 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
                <path
                  fill="#0091ff"
                  d="M 2.714844 195.351562 L 0.0078125 200.039062 L 2.714844 204.738281 L 8.136719 204.738281 L 10.84375 200.039062 L 8.136719 195.351562 Z M 2.714844 195.351562 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
                <path
                  fill="#0091ff"
                  d="M 37.007812 188.511719 L 39.714844 193.203125 L 45.140625 193.203125 L 47.847656 188.511719 L 45.140625 183.824219 L 39.714844 183.824219 Z M 37.007812 188.511719 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
                <path
                  fill="#0091ff"
                  d="M 21.21875 218.40625 L 18.503906 223.105469 L 21.21875 227.792969 L 26.632812 227.792969 L 29.34375 223.105469 L 26.632812 218.40625 Z M 21.21875 218.40625 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
                <g clip-path="url(#84c2113452)">
                  <path
                    fill="#0091ff"
                    d="M 44.40625 210.496094 L 39.558594 210.496094 L 37.464844 206.878906 L 32.050781 206.878906 L 29.34375 211.566406 L 32.050781 216.257812 L 37.464844 216.257812 L 39.558594 212.636719 L 44.40625 212.636719 L 46.5 216.257812 L 97.585938 216.257812 C 99.605469 213.464844 101.121094 210.292969 101.996094 206.867188 C 85.035156 206.867188 63.449219 206.867188 46.488281 206.867188 Z M 44.40625 210.496094 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
                <g clip-path="url(#3eb0e7f209)">
                  <path
                    fill="#0091ff"
                    d="M 58.285156 222.035156 L 53.4375 222.035156 L 51.347656 218.414062 C 46.460938 218.414062 41.566406 218.414062 36.671875 218.414062 L 33.964844 223.105469 L 36.671875 227.792969 C 41.566406 227.792969 46.453125 227.792969 51.347656 227.792969 L 53.4375 224.175781 L 58.285156 224.175781 L 60.378906 227.792969 C 74.253906 227.792969 85.910156 229.644531 95.875 218.40625 L 60.378906 218.40625 Z M 58.285156 222.035156 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
                <g fill="#000000" fill-opacity="1">
                  <g transform="translate(108.753517, 217.55056)">
                    <g>
                      <path d="M 22.375 0 L 12.3125 0 L 12.3125 -31.328125 L 0.5625 -31.328125 L 0.5625 -39.171875 L 34.125 -39.171875 L 34.125 -31.328125 L 22.375 -31.328125 Z M 22.375 0 " />
                    </g>
                  </g>
                </g>
                <g fill="#000000" fill-opacity="1">
                  <g transform="translate(154.632565, 217.55056)">
                    <g>
                      <path d="M 34.40625 0 L 3.359375 0 L 3.359375 -39.171875 L 34.40625 -39.171875 L 34.40625 -31.328125 L 13.421875 -31.328125 L 13.421875 -23.78125 L 29.9375 -23.78125 L 29.9375 -15.953125 L 13.421875 -15.953125 L 13.421875 -7.828125 L 34.40625 -7.828125 Z M 34.40625 0 " />
                    </g>
                  </g>
                </g>
                <g fill="#000000" fill-opacity="1">
                  <g transform="translate(201.350803, 217.55056)">
                    <g>
                      <path d="M 13.421875 0 L 3.359375 0 L 3.359375 -39.171875 L 13.421875 -39.171875 L 13.421875 -23.78125 L 18.46875 -23.78125 L 27.1875 -39.171875 L 37.828125 -39.171875 L 26.859375 -19.859375 L 37.765625 0 L 27.140625 0 L 18.46875 -15.953125 L 13.421875 -15.953125 Z M 13.421875 0 " />
                    </g>
                  </g>
                </g>
                <g fill="#000000" fill-opacity="1">
                  <g transform="translate(250.362833, 217.55056)">
                    <g>
                      <path d="M 22.375 0 L 12.3125 0 L 12.3125 -31.328125 L 0.5625 -31.328125 L 0.5625 -39.171875 L 34.125 -39.171875 L 34.125 -31.328125 L 22.375 -31.328125 Z M 22.375 0 " />
                    </g>
                  </g>
                </g>
                <g fill="#000000" fill-opacity="1">
                  <g transform="translate(296.241882, 217.55056)">
                    <g>
                      <path d="M 10.34375 0 L -0.5625 0 L 14.265625 -39.171875 L 25.453125 -39.171875 L 40.28125 0 L 29.375 0 L 26.859375 -7 L 12.875 -7 Z M 15.390625 -14.265625 L 24.34375 -14.265625 L 19.859375 -27.421875 Z M 15.390625 -14.265625 " />
                    </g>
                  </g>
                </g>
                <g fill="#000000" fill-opacity="1">
                  <g transform="translate(347.156099, 217.55056)">
                    <g>
                      <path d="M 21.828125 0 L 1.671875 0 L 1.671875 -7.828125 L 6.71875 -7.828125 L 6.71875 -31.328125 L 1.671875 -31.328125 L 1.671875 -39.171875 L 21.828125 -39.171875 L 21.828125 -31.328125 L 16.78125 -31.328125 L 16.78125 -7.828125 L 21.828125 -7.828125 Z M 21.828125 0 " />
                    </g>
                  </g>
                </g>
                <path
                  stroke-linecap="round"
                  transform="matrix(0, 0.75, -0.75, 0, 78.263181, 168.712079)"
                  fill="none"
                  stroke-linejoin="miter"
                  d="M 2.998479 3.00195 L 80.946401 3.00195 "
                  stroke="#0091ff"
                  stroke-width="6"
                  stroke-opacity="1"
                  stroke-miterlimit="4"
                />
              </svg>{" "}
        {/* <h1 className="font-bold text-xl">TEKTAI</h1> */}
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
          <div className="flex  justify-end">
            <Link to="/signin" className="block py-2  text-gray-700 hover:text-gray-900 transition duration-300 flex items-center">
              <FontAwesomeIcon icon={faSignIn} className="mr-2" />
              <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>Sign in</span>
            </Link>
            <Link to="/signip" className="block py-2 px-4 text-gray-700 hover:text-gray-900 transition duration-300 flex items-center">
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>Sign up</span>
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
