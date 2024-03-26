import React, { useState } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import './s.css'; // Import the CSS file
import { redirect } from "react-router-dom";
import userService from "../../services/userService";
import {useAuth} from "../../auth/useAuth";
import axios from 'axios';
function SignIn() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: 'challenger'
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // State variable for loading
  const [loginSuccess, setLoginSuccess] = useState(false); // State variable for login success message
  const [userData,setUserData] = useState({})
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.email !== '' && input.password !== '') {
      try {
        setLoading(true); // Set loading to true when submitting

        // Extract email and password from input state
        const { email, password } = input;

        // Make a POST request to get the token
        const data = await userService.getJWT(email,password);

        // Check if token exists in response
        if (data && data.access_token) {
          const { access_token } = data;

          // Fetch user data using the token
          const user =await userService.getUser(access_token,email)
          setUserData(user)

          auth.login(access_token,user);

          // Set login success message
          setLoginSuccess(true);
          setTimeout(() => {
            if (user && user.role === 'admin') {
              navigate('/admin')
            } else {
              navigate('/')
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
  const loginWithGithub = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/auth/github`);
    // Rediriger l'utilisateur vers l'URL de connexion GitHub
    window.location.href = response.data.redirectUrl;
  } catch (error) {
    console.error('Error logging in with GitHub:', error);
    // Gérer les erreurs de connexion
  }
};

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back. We exist to make entrepreneurism easier.</h1>
              </div>
              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Username</label>
                      <input id="email" type="text" name="email" onChange={handleInput} className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <Link to="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</Link>
                      </div>
                      <input id="password" type="password" name="password" onChange={handleInput} className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">Keep me signed in</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      {/* Display loading animation while loading */}
                      {loading ? (
                        // Replace the loader div with an SVG spinner animation
                        <svg className="animate-spin h-6 w-6 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 008-8h-4c0 2.762-1.316 5.225-3.35 6.809L12 20zm5.357-7.938A7.962 7.962 0 0120 12h-4c0 2.762 1.316 5.225 3.35 6.809l3-2.647zM12 4c3.042 0 5.824 1.135 7.938 3h-2c-2.21 0-4 1.79-4 4H8c0-2.21-1.79-4-4-4H0c0-3.042 1.135-5.824 3-7.938L6.357 4H12z"></path>
                      </svg>
                      
                      ) : (
                        loginSuccess ? (
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
                              Login Successfull
                            </h5>
                            <p className="text-base leading-relaxed text-body">
                             welcome {userData?.username ?? ''}
                            </p>
                          </div>
                        </div>
                        ) : (
                          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign in</button>
                        )
                      )}
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>
                <div className="text-gray-600 text-center mt-6">
                  Don’t you have an account? <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
                </div>
              </div>
              <button onClick={loginWithGithub} className="btn text-white bg-gray-800 hover:bg-gray-900 w-full">
                  Log in with GitHub
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
