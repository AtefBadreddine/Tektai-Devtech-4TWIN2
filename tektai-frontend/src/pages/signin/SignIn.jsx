import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './s.css'; // Import the CSS file
import { useAuth } from '../../auth/useAuth';
import userService from '../../services/userService';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReCAPTCHA from "react-google-recaptcha";

// Import the CAPTCHA component (replace 'CaptchaComponent' with the actual component)
import CaptchaComponent from './CaptchaComponent';
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";


function SignIn() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: 'challenger',
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // State variable for loading
  const [loginSuccess, setLoginSuccess] = useState(false); // State variable for login success message
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State variable to toggle password visibility
  const [captchaValid, setCaptchaValid] = useState(false); // State variable to track CAPTCHA validity
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };
  const handleCaptchaVerify = (response) => {
    setCaptchaValid(true);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValid) {
      alert('Please complete the CAPTCHA verification');
      return;
    }

    if (input.email !== '' && input.password !== '') {
      try {
        setLoading(true);

        const { email, password } = input;

        const data = await userService.getJWT(email, password,rememberMe);


        if (data && data.access_token) {
          const { access_token } = data;

          const user = await userService.getUser(access_token, email);
          setUserData(user);

          auth.login(access_token, user);

          setLoginSuccess(true);
          setTimeout(() => {
            if (user && user.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/');
            }
          }, 2000);

        } else {
          console.error('Token not found in response');
        }
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please provide a valid input');
    }
  };

  return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/*  Site header */}
        <Header />
        {/*<PopupAd />*/}
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 flex min-h-screen">
        {/* <div className="" style={{backgroundImage: 'url("https://cdni.iconscout.com/illustration/premium/thumb/coding-4841682-4037522.png?f=webp")'}}></div> */}
        
                <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className=" ml-24 hidden md:block w-1/2 bg-cover bg-center"
              alt="Phone image"
            />
          <main className="flex-grow bg-transparent  rounded-lg overflow-hidden" >
            <section className="bg-transparent">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-8 sm:pt-32 pb-12 md:pt-24 md:pb-20">
                  <div className="max-w-sm mx-auto">
                  <div className="border shadow-lg border-gray-300 rounded-lg p-6">
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
                            Username
                          </label>
                          <input
                              id="email"
                              type="text"
                              name="email"
                              onChange={handleInput}
                              className="form-input w-full text-gray-800"
                              placeholder="Enter your email address"
                              required
                          />

                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">
                            Password
                          </label>
                          <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                onChange={handleInput}
                                className="form-input w-full text-gray-800"
                                placeholder="Enter your password"
                                required
                            />
                            <span
                                className={`absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer ${
                                    showPassword ? 'eye-icon-hide' : ''
                                }`}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                          {showPassword ? (
                              <FontAwesomeIcon icon={faEyeSlash} className="h-6 w-6 text-blue-600 eye-icon" />
                          ) : (
                              <FontAwesomeIcon icon={faEye} className="h-6 w-6 text-blue-600 eye-icon" />
                          )}
                        </span>
                          </div>
                        </div>
                      </div>
                      <ReCAPTCHA
    sitekey="6LcGCJ0pAAAAAPHo1K4WnSoMZE4e_mTplFnd4Uc9"
    onChange={handleCaptchaVerify}

  />
                      {/* <CaptchaComponent onVerify={(isValid) => setCaptchaValid(isValid)} /> */}
                      {captchaValid ? null : (
                          <div className="text-red-600">Please complete the CAPTCHA verification</div>
                      )}
                      <div className="flex flex-wrap -mx-3 mb-4 mt-2">
                        <div className="w-full px-3">
                          <div className="flex justify-between">
                            <label className="flex items-center">
                              <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  checked={rememberMe}
                                  onChange={handleCheckboxChange}
                              />
                              <span className="text-gray-600 ml-2">Remember Me</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-6">
  <div className="w-full px-3">
    {loading ? (
      <svg
        className="animate-spin h-6 w-6 text-blue-600 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 008-8h-4c0 2.762-1.316 5.225-3.35 6.809L12 20zm5.357-7.938A7.962 7.962 0 0120 12h-4c0 2.762 1.316 5.225 3.35 6.809l3-2.647zM12 4c3.042 0 5.824 1.135 7.938 3h-2c-2.21 0-4 1.79-4 4H8c0-2.21-1.79-4-4-4H0c0-3.042 1.135-5.824 3-7.938L6.357 4H12z"
        ></path>
      </svg>
    ) : loginSuccess ? (
      <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
              fill="white"
              stroke="white"
            ></path>
          </svg>
        </div>
        <div className="w-full">
          <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
            Login Successful
          </h5>
          <p className="text-base leading-relaxed text-body">
            Welcome {userData?.username ?? ''}
          </p>
        </div>
      </div>
    ) : (
      <div className="flex w-full border-l-6 border-red-600 bg-red-600 bg-opacity-15 px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-red-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.582 0 0 3.582 0 8c0 4.418 3.582 8 8 8 4.418 0 8-3.582 8-8 0-4.418-3.582-8-8-8zM8 14.667c-3.68 0-6.667-2.987-6.667-6.667S4.32 1.333 8 1.333s6.667 2.987 6.667 6.667S11.68 14.667 8 14.667z"
              fill="currentColor"
            ></path>
            <path
              d="M8 10.667c-.368 0-.667-.299-.667-.667V6.667c0-.368.299-.667.667-.667s.667.299.667.667v3.333c0 .368-.299.667-.667.667zM8 5.333a.667.667 0 100-1.333.667.667 0 000 1.333z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="w-full">
          <h5 className="mb-3 text-lg font-semibold text-black dark:text-red-600">
            Login Failed
          </h5>
          <p className="text-base leading-relaxed text-body">
            Incorrect username or password. Please try again.
          </p>
        </div>
      </div>
    )}
  </div>
</div>

                    </form></div>
                    <div className="flex items-center my-6">
                      <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                      <div className="text-gray-600 italic">Or</div>
                      <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>

                    </div>
                    <form>
                      <div className="flex flex-wrap -mx-3 mb-3">
                        <div className="w-full px-3">
                          <a href="http://localhost:3000/auth/github" rel='noopener noreferrer' target="_self"  className="btn px-0 text-white text-center bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                            <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                            </svg>
                            <span  className="flex-auto pl-16 pr-8 -ml-16">Continue with GitHub</span>
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full px-3">
                          <a href="http://localhost:3000/auth/google" rel='noopener noreferrer' target="_self" className="text-center btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                            <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                            </svg>
                            <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                          </a>
                        </div>
                      </div>
                    </form>
                    <div className="text-gray-600 text-center mt-6">
                      Have problems logging in ?{' '}
                      <Link to="/reset-password" className="text-blue-600 hover:underline transition duration-150 ease-in-out">
                        Reset password
                      </Link>
                    </div>

                    <div className="text-gray-600 text-center mt-6">
                      Don’t you have an account?{' '}
                      <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <footer className="text-center pb-8">

            <Link to="/contact" className="text-gray-600 hover:underline">
              Contact Us
            </Link>

          </footer>
          <style>
            {`
          .eye-icon {
            transition: transform 0.3s ease-in-out;
          }
          
          .eye-icon-hide {
            transform: scale(0.8);
          }
          
          .disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}
          </style>
        </div>
        {/*  Page content */}
       
        <Footer/>
      </div>

  );
}

export default SignIn;
