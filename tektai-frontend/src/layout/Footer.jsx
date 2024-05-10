import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DrawerExample from './drawer';
import axios from 'axios';
function Footer() {
  const [crmData, setCrmData] = useState({
    about: '',
    termsOfService: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    github:'',
  });

  useEffect(() => {
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/settings/65f8a38e39a328e497879df2`);
        const { about, termsOfService,facebook, linkedin,twitter,github } = response.data;
        setCrmData({ about, termsOfService,facebook, linkedin,twitter,github});
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
  
    fetchSettings();
  }, []);
  
  const currentYear = new Date().getFullYear();
 
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


  <li className="ml-4">
  <section className="flex justify-center items-center">
    <a
      href={crmData.linkedin}
      id="linkedin"
      name="linkedin"
      className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#0077b5] from-gray-800 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1.1em"
        viewBox="0 0 512 512"
        stroke-width="0"
        fill="currentColor"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"
        ></path>
      </svg>
      <span
        className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
      >
        Linkedin
      </span>
    </a>
  </section>
</li>
<li className="ml-4">
  <section className="flex justify-center items-center">
    <a
      href={crmData.facebook}
      className="group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-[#316FF6] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1.1em"
        viewBox="0 0 512 512"
        stroke-width="0"
        fill="currentColor"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
        ></path>
      </svg>
      <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">Facebook</span>
    </a>
  </section>
</li>


<li className="ml-4">
  <section className="flex justify-center items-center">
    <a
       href={crmData.twitter}
      className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1.1em"
        viewBox="0 0 24 24"
        stroke-width="0"
        fill="currentColor"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          d="M8 2H1L9.26086 13.0145L1.44995 21.9999H4.09998L10.4883 14.651L16 22H23L14.3917 10.5223L21.8001 2H19.1501L13.1643 8.88578L8 2ZM17 20L5 4H7L19 20H17Z"
        ></path>
      </svg>
      <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">x</span>
    </a>
  </section>
</li>


<li className="ml-4">
  <section className="flex justify-center items-center">
    <a
      href={crmData.github}
      className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:rounded-[50%] hover:translate-y-3 transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
      target="_blank"
      rel="noopener noreferrer"
    >
    <svg
      class="w-5"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>

      <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">GitHub</span>
    </a>
  </section>
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
