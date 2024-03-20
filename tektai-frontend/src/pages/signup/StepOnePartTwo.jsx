import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import CaptchaComponent from "../signin/CaptchaComponent";
import axios from 'axios';
export default function StepOnePartTwo({ formData, fromAuth, handleInput, handleNext }) {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);
    const [birthday, setBirthday] = useState('');
    const [isDateValid, setIsDateValid] = useState(true);
    const [formValid, setFormValid] = useState(false);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Check if all form fields are valid
        const isValid =
            formData.password.trim() !== '' &&
            formData.password.length >= 8 &&
            /(?=.*[a-z])/.test(formData.password) &&
            /(?=.*[A-Z])/.test(formData.password) &&
            /(?=.*[@$!%*?&-])/.test(formData.password) &&
            formData.password === confirmPassword &&
            captchaValid;

        setFormValid(isValid);
    }, [formData, confirmPassword, captchaValid]);

    const handleInputCountry = (e) => {
    const { name, value } = e.target;
    // Si le champ est "country", mettez à jour selectedCountry directement
    if (name === 'country') {
        setSelectedCountry(value);
    } else {
        // Pour les autres champs, utilisez handleInput de manière normale
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
};
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
     useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const countryNames = response.data.map(country => country.name.common);
                setCountries(countryNames);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

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
        // Inclure la valeur du pays dans formData
        handleInput({ target: { name: 'country', value: selectedCountry } });
        handleNext();
    };

    return (
        <form onSubmit={handleSubmit}>
{/* Ajoute la liste déroulante des pays ici */}
<div className="flex flex-wrap -mx-3 mb-4">
    <div className="w-full px-3">
        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="country">
            Country
        </label>
        <select
            id="country"
            name="country"
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="form-select w-full text-gray-800"
        >
            <option value="">Select your country</option>
            {/* Mapping through the countries array to render options */}
            {countries.map((country, index) => (
                <option key={index} value={country}>
                    {country}
                </option>
            ))}
        </select>
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