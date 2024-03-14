import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'

export default function StepOne  ({ formData, handleInput, handleNext })  {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password match
    const [showFields, setShowFields] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState(''); // State to track the selected country phone number

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handlePhoneChange = (value) => {
        setPhoneNumber(value);
        handleInput({ target: { name: 'tel', value: value } });
      };
      const handleCountryChange = (country) => {
        setSelectedCountry(country);
      };
    

    useEffect(() => {
       if (formData.username.length && formData.email.length) {
           setShowFields(false)
       }
    },[])
    // Function to handle password input
    const handlePasswordChange = (e) => {
        const { value } = e.target;
        handleInput(e); // Update password in form data
        setPasswordsMatch(value === confirmPassword); // Check if passwords match
    };

    // Function to handle password confirmation input
    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);
        setPasswordsMatch(value === formData.password); // Check if passwords match
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if passwords match before proceeding
        if (formData.password !== confirmPassword) {
            setPasswordsMatch(false);
            return; // Prevent form submission
        }
        // Proceed with form submission
        handleNext();
    };



    return (
        <form onSubmit={handleSubmit}>

             <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="username">
                            Username <span className="text-red-600">*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInput}
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your username"
                            required
                        />
                        {formData.username.trim() === '' && <p className="text-red-600 text-sm mt-1">Username is required</p>}
                    </div>
                </div>


            {
                showFields ?   <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
                            Email <span className="text-red-600">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            // value={formData.email}
                            readOnly={!!formData.email.length}
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your email address"
                            required
                        />
                        {formData.email.trim() === '' && <p className="text-red-600 text-sm mt-1">Email is required</p>}
                    </div>
                </div> : ''
            }




            {/* Password Field */}
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">
                        Password <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            name="password"
                            value={formData.password}
                            onChange={handleInput}
                            className="form-input w-full text-gray-800 pr-10"
                            placeholder="Enter your password"
                            required
                            minLength="8"
                           /* pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$"*/
                        />
                        {/* Eye icon to toggle password visibility */}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (e.g., @$!%*?&).
                    </p>
                    {formData.password.trim() === '' && <p className="text-red-600 text-sm mt-1">Password is required</p>}
                    {formData.password.length > 0 && formData.password.length < 8 && (
                        <p className="text-red-600 text-sm mt-1">Password must be at least 8 characters long</p>
                    )}
                    {!/(?=.*[a-z])/.test(formData.password) && formData.password.trim() !== ''  && (
                        <p className="text-red-600 text-sm mt-1">Password must contain at least one lowercase letter</p>
                    )}
                    {!/(?=.*[A-Z])/.test(formData.password) && formData.password.trim() !== '' && (
                        <p className="text-red-600 text-sm mt-1">Password must contain at least one uppercase letter</p>
                    )}
                    {!/(?=.*[@$!%*?&-])/.test(formData.password) && formData.password.trim() !== '' && (
                        <p className="text-red-600 text-sm mt-1">Password must contain at least one special character (e.g., @$!%*?&)</p>
                    )}
                </div>
            </div>







            {/* Password confirmation field */}
            <label className="block text-gray-800 text-sm font-medium mb-1 mt-3" htmlFor="confirmPassword">
                Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} // Update confirmation field
                className="form-input w-full text-gray-800"
                placeholder="Confirm your password"
                required
            />
            {/* Error message if passwords don't match */}
            {!passwordsMatch && (
                <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
            )}










<div className="flex flex-wrap -mx-3 mb-4">
  <div className="w-full px-3">
    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="tel">
      Phone number <span className="text-red-600">*</span>
    </label>
    <PhoneInput
      international
      defaultCountry="TN"
      value={phoneNumber}
      onChange={handlePhoneChange}
      onCountryChange={handleCountryChange}
      containerClass="phone-input-container" // Add a custom class
      inputClass="form-input w-full text-gray-800" // Add your input styles
    />
    {formData.tel && formData.tel.trim() === '' && (
      <p className="text-red-600 text-sm mt-1">Phone number is required</p>
    )}
    {formData.tel && (formData.tel.trim() === '' || !(/^\d{11}$/.test(formData.tel))) && (
      <p className="text-red-600 text-sm mt-1">Please enter a valid 8-digit phone number</p>
    )}
  </div>
</div>





            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="birthday">Date of birth <span className="text-red-600">*</span></label>
                    <input id="birthday" type="date" name="birthday" onChange={handleInput} className="form-input w-full text-gray-800" required />
                </div>


            </div>

            <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" type="submit">Sign up</button>
                </div>
            </div>
            <div className="text-sm text-gray-500 text-center mt-3">
                By creating an account, you agree to the <Link className="underline" to={'/TermsAndConditions'}>terms & conditions</Link>.
            </div>
        </form>
    )};