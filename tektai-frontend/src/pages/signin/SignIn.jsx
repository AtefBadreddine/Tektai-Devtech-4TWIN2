import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './s.css'; // Import the CSS file
import { useAuth } from '../../auth/useAuth';
import userService from '../../services/userService';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CaptchaComponent from './CaptchaComponent'; // Import the CAPTCHA component

function SignIn() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    role: 'challenger',
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
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

    if (input.username !== '' && input.password !== '') {
      try {
        setLoading(true);

        const { username, password } = input;

        const data = await userService.getJWT(username, password, rememberMe);

        if (data && data.access_token) {
          const { access_token } = data;

          const user = await userService.getUser(access_token, username);
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
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={handleInput}
              value={input.username}
              className="form-input w-full"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={handleInput}
                value={input.password}
                className="form-input w-full"
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} className="text-gray-500" />
                ) : (
                  <FontAwesomeIcon icon={faEye} className="text-gray-500" />
                )}
              </span>
            </div>
          </div>
          <CaptchaComponent onVerify={(isValid) => setCaptchaValid(isValid)} />
          {!captchaValid && <div className="text-red-600">Please complete the CAPTCHA verification</div>}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="form-checkbox mr-2"
              checked={rememberMe}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading || !captchaValid}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
