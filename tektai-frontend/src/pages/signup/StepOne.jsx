import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import CaptchaComponent from "../signin/CaptchaComponent";

export default function StepOne({ formData, fromAuth, handleInput, handleNext }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);
    const [birthday, setBirthday] = useState('');
    const [isDateValid, setIsDateValid] = useState(true);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        // Check if all form fields are valid
        const isValid =
            formData.username.trim() !== '' &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
            formData.password.trim() !== '' &&
            formData.password.length >= 8 &&
            /(?=.*[a-z])/.test(formData.password) &&
            /(?=.*[A-Z])/.test(formData.password) &&
            /(?=.*[@$!%*?&-])/.test(formData.password) &&
            formData.password === confirmPassword &&
            /^\+\d{9,}$/.test(phoneNumber) &&
            /^\d{4}-\d{2}-\d{2}$/.test(birthday) &&
            isDateValid &&
            captchaValid;

        setFormValid(isValid);
    }, [formData, confirmPassword, phoneNumber, birthday, isDateValid, captchaValid]);

    const handleInput2 = (event) => {
        const inputDate = new Date(event.target.value);
        const today = new Date();
        let age = today.getFullYear() - inputDate.getFullYear();
        const monthDiff = today.getMonth() - inputDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < inputDate.getDate())) {
            age--;
        }

        if (age < 18) {
            setIsDateValid(false);
        } else {
            setIsDateValid(true);
            setBirthday(event.target.value);
        }
    };

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

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        handleInput(e);
        setPasswordsMatch(value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);
        setPasswordsMatch(value === formData.password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!captchaValid) {
            alert('Please complete the CAPTCHA verification');
            return;
        }
        if (formData.password !== confirmPassword) {
            setPasswordsMatch(false);
            return;
        }
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

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
                        Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                        readOnly={!!fromAuth.email.length}
                        className={`form-input w-full text-gray-800 ${fromAuth.email.length ? '!bg-gray-300 cursor-not-allowed' : ''}`}
                        placeholder="Enter your email address"
                        required
                    />
                    {formData.email.trim() === '' && <p className="text-red-600 text-sm mt-1">Email is required</p>}
                    {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email.trim() !== '' && (
                        <p className="text-red-600 text-sm mt-1">Please enter a valid email address</p>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">
                        Password <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handlePasswordChange}
                            className="form-input w-full text-gray-800 pr-10"
                            placeholder="Enter your password"
                            required
                            minLength="8"
                        />
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
                    {!/(?=.*[a-z])/.test(formData.password) && formData.password.trim() !== '' && (
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

            <label className="block text-gray-800 text-sm font-medium mb-1 mt-3" htmlFor="confirmPassword">
                Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="form-input w-full text-gray-800"
                placeholder="Confirm your password"
                required
            />
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
                        containerclass="phone-input-container"
                        inputclass="form-input w-full text-gray-800"
                    />
                    {formData.tel && formData.tel.trim() === '' && (
                        <p className="text-red-600 text-sm mt-1">Phone number is required</p>
                    )}

                    {formData.tel && (formData.tel.trim() === '' || !(/^\+\d{9,}$/.test(formData.tel))) && (
                        <p className="text-red-600 text-sm mt-1">Please enter a valid phone number starting with '+' followed by at least 9 digits</p>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="birthday">Date of birth <span className="text-red-600">*</span></label>
                    <input id="birthday" type="date" name="birthday" onChange={handleInput2} value={birthday} className="form-input w-full text-gray-800" required />
                    {!isDateValid && <p className="text-red-600 text-sm mt-1">You must be 18 years or older.</p>}
                </div>
            </div>

            <CaptchaComponent onVerify={(isValid) => setCaptchaValid(isValid)} />

            <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                <button 
    className={`btn text-white bg-blue-600 hover:bg-blue-700 w-full ${formValid ? '' : 'opacity-50 cursor-not-allowed'}`} 
    disabled={!formValid}
>
    Next
</button>
                </div>
            </div>
            <div className="text-sm text-gray-500 text-center mt-3">
                By creating an account, you agree to the <Link className="underline" to={'/TermsAndConditions'}>terms & conditions</Link>.
            </div>
        </form>
    );
}
