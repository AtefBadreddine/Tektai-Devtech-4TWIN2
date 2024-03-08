import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DrawerExample from './drawer';

function Footer() {
  const [crmData, setCrmData] = useState({
    aboutUs: '',
    termsOfService: '',
    instagram: '',
    facebook: '',
    github: '',
    linkedin: '',
  });
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const storedCrmData = localStorage.getItem('crm');
    if (storedCrmData) {
      try {
        const parsedCrmData = JSON.parse(storedCrmData);
        setCrmData(parsedCrmData);
      } catch (error) {
        console.error('Error parsing CRM data from local storage:', error);
        // Handle potential parsing errors gracefully (e.g., reset form or display an error message)
      }
    }
  }, []);
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">

          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-2">
              {/* Logo */}
              <Link to="/" className="inline-block" aria-label="Cruip">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="80" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="80" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/><clipPath id="be6fd072f5"><path d="M 15 195 L 75.75 195 L 75.75 205 L 15 205 Z M 15 195 " clip-rule="nonzero"/></clipPath><clipPath id="4401664a78"><path d="M 27 172 L 75.75 172 L 75.75 182 L 27 182 Z M 27 172 " clip-rule="nonzero"/></clipPath><clipPath id="64520df577"><path d="M 52 183 L 75.75 183 L 75.75 194 L 52 194 Z M 52 183 " clip-rule="nonzero"/></clipPath><clipPath id="84c2113452"><path d="M 29 206 L 75.75 206 L 75.75 217 L 29 217 Z M 29 206 " clip-rule="nonzero"/></clipPath><clipPath id="3eb0e7f209"><path d="M 33 218 L 75.75 218 L 75.75 228 L 33 228 Z M 33 218 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#be6fd072f5)"><path fill="#0091ff" d="M 102.460938 195.351562 L 53.4375 195.351562 L 51.347656 198.96875 L 46.5 198.96875 L 44.40625 195.351562 C 42.601562 195.351562 19.980469 195.351562 18.175781 195.351562 L 15.46875 200.039062 L 18.175781 204.730469 C 19.980469 204.730469 42.601562 204.730469 44.40625 204.730469 L 46.5 201.109375 L 51.347656 201.109375 L 53.4375 204.730469 L 102.460938 204.730469 C 103 201.628906 103 198.457031 102.460938 195.351562 Z M 102.460938 195.351562 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#4401664a78)"><path fill="#0091ff" d="M 35.15625 181.671875 L 37.25 178.054688 L 42.097656 178.054688 L 44.191406 181.671875 L 95.875 181.671875 C 86.160156 170.722656 75.265625 172.285156 62.128906 172.285156 L 44.191406 172.285156 L 42.097656 175.90625 L 37.25 175.90625 L 35.15625 172.285156 L 29.742188 172.285156 L 27.035156 176.976562 L 29.742188 181.664062 L 35.15625 181.664062 Z M 35.15625 181.671875 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#64520df577)"><path fill="#0091ff" d="M 67.535156 187.441406 L 62.6875 187.441406 L 60.59375 183.824219 L 55.179688 183.824219 L 52.472656 188.511719 L 55.179688 193.203125 L 60.59375 193.203125 L 62.6875 189.582031 L 67.535156 189.582031 L 69.628906 193.203125 L 102.003906 193.203125 C 101.132812 189.777344 99.613281 186.605469 97.59375 183.8125 L 69.628906 183.8125 Z M 67.535156 187.441406 " fill-opacity="1" fill-rule="nonzero"/></g><path fill="#0091ff" d="M 2.714844 195.351562 L 0.0078125 200.039062 L 2.714844 204.738281 L 8.136719 204.738281 L 10.84375 200.039062 L 8.136719 195.351562 Z M 2.714844 195.351562 " fill-opacity="1" fill-rule="nonzero"/><path fill="#0091ff" d="M 37.007812 188.511719 L 39.714844 193.203125 L 45.140625 193.203125 L 47.847656 188.511719 L 45.140625 183.824219 L 39.714844 183.824219 Z M 37.007812 188.511719 " fill-opacity="1" fill-rule="nonzero"/><path fill="#0091ff" d="M 21.21875 218.40625 L 18.503906 223.105469 L 21.21875 227.792969 L 26.632812 227.792969 L 29.34375 223.105469 L 26.632812 218.40625 Z M 21.21875 218.40625 " fill-opacity="1" fill-rule="nonzero"/><g clip-path="url(#84c2113452)"><path fill="#0091ff" d="M 44.40625 210.496094 L 39.558594 210.496094 L 37.464844 206.878906 L 32.050781 206.878906 L 29.34375 211.566406 L 32.050781 216.257812 L 37.464844 216.257812 L 39.558594 212.636719 L 44.40625 212.636719 L 46.5 216.257812 L 97.585938 216.257812 C 99.605469 213.464844 101.121094 210.292969 101.996094 206.867188 C 85.035156 206.867188 63.449219 206.867188 46.488281 206.867188 Z M 44.40625 210.496094 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#3eb0e7f209)"><path fill="#0091ff" d="M 58.285156 222.035156 L 53.4375 222.035156 L 51.347656 218.414062 C 46.460938 218.414062 41.566406 218.414062 36.671875 218.414062 L 33.964844 223.105469 L 36.671875 227.792969 C 41.566406 227.792969 46.453125 227.792969 51.347656 227.792969 L 53.4375 224.175781 L 58.285156 224.175781 L 60.378906 227.792969 C 74.253906 227.792969 85.910156 229.644531 95.875 218.40625 L 60.378906 218.40625 Z M 58.285156 222.035156 " fill-opacity="1" fill-rule="nonzero"/></g><g fill="#000000" fill-opacity="1"><g transform="translate(108.753517, 217.55056)"><g><path d="M 22.375 0 L 12.3125 0 L 12.3125 -31.328125 L 0.5625 -31.328125 L 0.5625 -39.171875 L 34.125 -39.171875 L 34.125 -31.328125 L 22.375 -31.328125 Z M 22.375 0 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(154.632565, 217.55056)"><g><path d="M 34.40625 0 L 3.359375 0 L 3.359375 -39.171875 L 34.40625 -39.171875 L 34.40625 -31.328125 L 13.421875 -31.328125 L 13.421875 -23.78125 L 29.9375 -23.78125 L 29.9375 -15.953125 L 13.421875 -15.953125 L 13.421875 -7.828125 L 34.40625 -7.828125 Z M 34.40625 0 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(201.350803, 217.55056)"><g><path d="M 13.421875 0 L 3.359375 0 L 3.359375 -39.171875 L 13.421875 -39.171875 L 13.421875 -23.78125 L 18.46875 -23.78125 L 27.1875 -39.171875 L 37.828125 -39.171875 L 26.859375 -19.859375 L 37.765625 0 L 27.140625 0 L 18.46875 -15.953125 L 13.421875 -15.953125 Z M 13.421875 0 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(250.362833, 217.55056)"><g><path d="M 22.375 0 L 12.3125 0 L 12.3125 -31.328125 L 0.5625 -31.328125 L 0.5625 -39.171875 L 34.125 -39.171875 L 34.125 -31.328125 L 22.375 -31.328125 Z M 22.375 0 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(296.241882, 217.55056)"><g><path d="M 10.34375 0 L -0.5625 0 L 14.265625 -39.171875 L 25.453125 -39.171875 L 40.28125 0 L 29.375 0 L 26.859375 -7 L 12.875 -7 Z M 15.390625 -14.265625 L 24.34375 -14.265625 L 19.859375 -27.421875 Z M 15.390625 -14.265625 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(347.156099, 217.55056)"><g><path d="M 21.828125 0 L 1.671875 0 L 1.671875 -7.828125 L 6.71875 -7.828125 L 6.71875 -31.328125 L 1.671875 -31.328125 L 1.671875 -39.171875 L 21.828125 -39.171875 L 21.828125 -31.328125 L 16.78125 -31.328125 L 16.78125 -7.828125 L 21.828125 -7.828125 Z M 21.828125 0 "/></g></g></g><path stroke-linecap="round" transform="matrix(0, 0.75, -0.75, 0, 78.263181, 168.712079)" fill="none" stroke-linejoin="miter" d="M 2.998479 3.00195 L 80.946401 3.00195 " stroke="#0091ff" stroke-width="6" stroke-opacity="1" stroke-miterlimit="4"/></svg>      
               
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              <Link to="/TermsAndConditions" className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Terms</Link> · <Link to="#" className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Privacy Policy</Link>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Products </h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Web Studio</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">DynamicBox Flex</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Programming Forms</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Integrations</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Command-line</Link>
              </li>                            
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Resources</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Documentation</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Tutorials & Guides</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Support Center</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Partners</Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Company</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">About us</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Company values</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Pricing</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 font-medium mb-2">Subscribe</h6>
            <p className="text-sm text-gray-600 mb-4">Get the latest news and articles to your inbox every month.</p>
            <form>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label className="block text-sm sr-only" htmlFor="newsletter">Email</label>
                  <div className="relative flex items-center max-w-xs">
                    <input id="newsletter" type="email" className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm" placeholder="Your email" required />
                    <button type="submit" className="absolute inset-0 left-auto" aria-label="Subscribe">
                      <span className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300" aria-hidden="true"></span>
                      <svg className="w-3 h-3 fill-current text-blue-600 mx-3 flex-shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg>
                    </button>
                  </div>
                  {/* Success message */}
                  {/* <p className="mt-2 text-green-600 text-sm">Thanks for subscribing!</p> */}
                </div>
              </div>
            </form>
          </div>          

        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">

          {/* Social links */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <Link to={crmData.linkedin} className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Twitter">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                </svg>
              </Link>
            </li>
            <li className="ml-4">
              <Link to={crmData.github} className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Github">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </Link>
            </li>
            <li className="ml-4">
              <Link to={crmData.facebook} className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Facebook">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                </svg>
              </Link>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4">      <span className="text-blue-600 hover:underline cursor-pointer">TEKTAI</span>. All rights reserved &copy; {currentYear}.
</div>

<DrawerExample></DrawerExample>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
