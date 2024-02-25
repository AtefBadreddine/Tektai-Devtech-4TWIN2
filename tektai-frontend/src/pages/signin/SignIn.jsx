import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './s.css'; // Import the CSS file

function SignIn() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: 'challenger'
  });

  const [loading, setLoading] = useState(false); // State variable for loading
  const [loginSuccess, setLoginSuccess] = useState(false); // State variable for login success message

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
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password: password }), // Send username and password
        });

        // Parse response
        const data = await response.json();

        // Check if token exists in response
        if (data && data.access_token) {
          const { access_token } = data;

          // Save token to localStorage
          localStorage.setItem('token', access_token);

          // Fetch user data using the token
          const userResponse = await fetch(`http://localhost:3000/auth/getuser?username=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          // Parse user data
          const userData = await userResponse.json();

          // Save user data to localStorage
          localStorage.setItem('user', JSON.stringify(userData));

          // Set login success message
          setLoginSuccess(true);

          // Redirect based on user role
          if (userData.role === 'admin') {
            // Redirect to admin page after successful login
            window.location.href = '/admin';
          } else {
            // Redirect to home page after successful login
            window.location.href = '/';
          }
        } else {
          console.error('Token not found in response');
        }
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setLoading(false); // Set loading to false after handling submit
      }
    } else {
      alert('Please provide a valid input');
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
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
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
                        <svg className="animate-spin h-6 w-6 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 008-8h-4c0 2.762-1.316 5.225-3.35 6.809L12 20zm5.357-7.938A7.962 7.962 0 0120 12h-4c0 2.762 1.316 5.225 3.35 6.809l3-2.647zM12 4c3.042 0 5.824 1.135 7.938 3h-2c-2.21 0-4 1.79-4 4H8c0-2.21-1.79-4-4-4H0c0-3.042 1.135-5.824 3-7.938L6.357 4H12z"></path>
                        </svg>
                      ) : (
                        loginSuccess ? (
                          <p className="text-green-600 text-center">Login successful</p>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
