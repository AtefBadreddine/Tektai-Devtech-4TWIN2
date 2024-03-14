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
              <Link to="/" className="flex gap-x-1 logo" aria-label="Cruip">
           <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" zoomAndPan="magnify" viewBox="0 0 1440 809.999993" height="100" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/><clipPath id="e4043f8345"><path d="M 61 387 L 303 387 L 303 425 L 61 425 Z M 61 387 " clip-rule="nonzero"/></clipPath><clipPath id="339c17b75b"><path d="M 107 294 L 303 294 L 303 333 L 107 333 Z M 107 294 " clip-rule="nonzero"/></clipPath><clipPath id="346aafb448"><path d="M 209 341 L 303 341 L 303 379 L 209 379 Z M 209 341 " clip-rule="nonzero"/></clipPath><clipPath id="2ec500b6ad"><path d="M 116 433 L 303 433 L 303 471 L 116 471 Z M 116 433 " clip-rule="nonzero"/></clipPath><clipPath id="813f78adc9"><path d="M 135 479 L 303 479 L 303 517 L 135 517 Z M 135 479 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#e4043f8345)"><path fill="#0091ff" d="M 408.21875 387.160156 L 212.898438 387.160156 L 204.558594 401.582031 L 185.246094 401.582031 L 176.90625 387.160156 C 169.714844 387.160156 79.597656 387.160156 72.40625 387.160156 L 61.617188 405.84375 L 72.40625 424.527344 C 79.597656 424.527344 169.714844 424.527344 176.90625 424.527344 L 185.246094 410.105469 L 204.558594 410.105469 L 212.898438 424.527344 L 408.21875 424.527344 C 410.371094 412.183594 410.371094 399.542969 408.21875 387.160156 Z M 408.21875 387.160156 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#339c17b75b)"><path fill="#0091ff" d="M 140.058594 332.667969 L 148.398438 318.25 L 167.710938 318.25 L 176.054688 332.667969 L 381.972656 332.667969 C 343.273438 289.039062 299.863281 295.265625 247.523438 295.265625 L 176.054688 295.265625 L 167.710938 309.6875 L 148.398438 309.6875 L 140.058594 295.265625 L 118.484375 295.265625 L 107.695312 313.949219 L 118.484375 332.632812 L 140.058594 332.632812 Z M 140.058594 332.667969 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#346aafb448)"><path fill="#0091ff" d="M 269.058594 355.652344 L 249.746094 355.652344 L 241.40625 341.230469 L 219.832031 341.230469 L 209.042969 359.914062 L 219.832031 378.597656 L 241.40625 378.597656 L 249.746094 364.179688 L 269.058594 364.179688 L 277.402344 378.597656 L 406.402344 378.597656 C 402.917969 364.957031 396.875 352.316406 388.832031 341.195312 L 277.402344 341.195312 Z M 269.058594 355.652344 " fill-opacity="1" fill-rule="nonzero"/></g><path fill="#0091ff" d="M 10.796875 387.160156 L 0.0078125 405.84375 L 10.796875 424.566406 L 32.40625 424.566406 L 43.195312 405.84375 L 32.40625 387.160156 Z M 10.796875 387.160156 " fill-opacity="1" fill-rule="nonzero"/><path fill="#0091ff" d="M 147.433594 359.914062 L 158.222656 378.597656 L 179.832031 378.597656 L 190.621094 359.914062 L 179.832031 341.230469 L 158.222656 341.230469 Z M 147.433594 359.914062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#0091ff" d="M 84.527344 479.019531 L 73.703125 497.738281 L 84.527344 516.421875 L 106.101562 516.421875 L 116.890625 497.738281 L 106.101562 479.019531 Z M 84.527344 479.019531 " fill-opacity="1" fill-rule="nonzero"/><g clip-path="url(#2ec500b6ad)"><path fill="#0091ff" d="M 176.90625 447.511719 L 157.59375 447.511719 L 149.25 433.089844 L 127.675781 433.089844 L 116.890625 451.773438 L 127.675781 470.457031 L 149.25 470.457031 L 157.59375 456.035156 L 176.90625 456.035156 L 185.246094 470.457031 L 388.796875 470.457031 C 396.839844 459.335938 402.882812 446.695312 406.367188 433.054688 C 338.789062 433.054688 252.785156 433.054688 185.210938 433.054688 Z M 176.90625 447.511719 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#813f78adc9)"><path fill="#0091ff" d="M 232.214844 493.476562 L 212.898438 493.476562 L 204.558594 479.058594 C 185.097656 479.058594 165.597656 479.058594 146.101562 479.058594 L 135.3125 497.738281 L 146.101562 516.421875 C 165.597656 516.421875 185.0625 516.421875 204.558594 516.421875 L 212.898438 502.003906 L 232.214844 502.003906 L 240.554688 516.421875 C 295.824219 516.421875 342.273438 523.800781 381.972656 479.019531 L 240.554688 479.019531 Z M 232.214844 493.476562 " fill-opacity="1" fill-rule="nonzero"/></g><g fill="#000000" fill-opacity="1"><g transform="translate(389.384627, 475.591436)"><g><path d="M 89.171875 0 L 49.046875 0 L 49.046875 -124.84375 L 2.234375 -124.84375 L 2.234375 -156.0625 L 135.984375 -156.0625 L 135.984375 -124.84375 L 89.171875 -124.84375 Z M 89.171875 0 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(572.15959, 475.591436)"><g><path d="M 137.109375 0 L 13.375 0 L 13.375 -156.0625 L 137.109375 -156.0625 L 137.109375 -124.84375 L 53.5 -124.84375 L 53.5 -94.75 L 119.265625 -94.75 L 119.265625 -63.53125 L 53.5 -63.53125 L 53.5 -31.21875 L 137.109375 -31.21875 Z M 137.109375 0 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(758.277754, 475.591436)"><g><path d="M 53.5 0 L 13.375 0 L 13.375 -156.0625 L 53.5 -156.0625 L 53.5 -94.75 L 73.5625 -94.75 L 108.34375 -156.0625 L 150.703125 -156.0625 L 107.015625 -79.140625 L 150.484375 0 L 108.125 0 L 73.5625 -63.53125 L 53.5 -63.53125 Z M 53.5 0 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(953.534027, 475.591436)"><g><path d="M 89.171875 0 L 49.046875 0 L 49.046875 -124.84375 L 2.234375 -124.84375 L 2.234375 -156.0625 L 135.984375 -156.0625 L 135.984375 -124.84375 L 89.171875 -124.84375 Z M 89.171875 0 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(1136.30899, 475.591436)"><g><path d="M 41.25 0 L -2.234375 0 L 56.84375 -156.0625 L 101.4375 -156.0625 L 160.515625 0 L 117.046875 0 L 107.015625 -27.875 L 51.28125 -27.875 Z M 61.3125 -56.84375 L 96.984375 -56.84375 L 79.140625 -109.234375 Z M 61.3125 -56.84375 "/></g></g></g><g fill="#000000" fill-opacity="1"><g transform="translate(1339.143281, 475.591436)"><g><path d="M 86.953125 0 L 6.6875 0 L 6.6875 -31.21875 L 26.75 -31.21875 L 26.75 -124.84375 L 6.6875 -124.84375 L 6.6875 -156.0625 L 86.953125 -156.0625 L 86.953125 -124.84375 L 66.875 -124.84375 L 66.875 -31.21875 L 86.953125 -31.21875 Z M 86.953125 0 "/></g></g></g><path stroke-linecap="round" transform="matrix(0, 0.75, -0.75, 0, 311.835137, 281.016188)" fill="none" stroke-linejoin="miter" d="M 11.99925 11.998933 L 322.431557 11.998933 " stroke="#0091ff" stroke-width="24" stroke-opacity="1" stroke-miterlimit="4"/></svg>

        {/* <h1 className="font-bold text-xl">TEKTAI</h1> */}
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

{/* <DrawerExample></DrawerExample> */}
        </div>

      </div>
    </footer>
  );
}

export default Footer;
