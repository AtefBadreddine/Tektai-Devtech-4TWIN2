import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import CaptchaComponent from "../signin/CaptchaComponent";
import { Checkbox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";

export default function StepOne  ({ formData,fromAuth, handleInput, handleNext })  {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password match
    const [showFields, setShowFields] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState(''); // State to track the selected country phone number
    const [captchaValid, setCaptchaValid] = useState(false); // State variable to track CAPTCHA validity
    const [birthday, setBirthday] = useState('');
    const [isDateValid, setIsDateValid] = useState(true);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAgreeToTermsChange = (e) => {
        setAgreeToTerms(e.target.checked);
      };
    
      const handleModalOpen = () => {
        setIsModalOpen(true);
      };
    
      const handleModalClose = () => {
        setIsModalOpen(false);
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
    const handleBack = () => {
        handlePrevious(); // Call the handlePrevious function to go back to Step One
    };

    const handlePhoneChange = (value) => {
        setPhoneNumber(value);
        handleInput({ target: { name: 'tel', value: value } });
      };
      const handleCountryChange = (country) => {
        setSelectedCountry(country);
      };
    

    useEffect(() => {
       if (fromAuth.username.length && fromAuth.email.length) {
           setShowFields(false)
           handleInput({ target: { name: 'username', value: fromAuth.username } })
           handleInput({ target: { name: 'email', value: fromAuth.email } })
       }
    },[fromAuth])
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
        if (!captchaValid) {
            alert('Please complete the CAPTCHA verification');
            return;
          }
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
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
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


            <CaptchaComponent onVerify={(isValid) => setCaptchaValid(isValid)} />

            <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                <div className="py-3">
                <Checkbox isChecked={agreeToTerms} onChange={handleAgreeToTermsChange}>
        I agree to the <span className="text-blue-500 cursor-pointer" onClick={handleModalOpen}>terms of service</span>.
      </Checkbox>
      {!agreeToTerms && (
  <p className="text-red-600 text-sm mt-2">You must agree to the terms of service.</p>
)}
                </div>
                <Modal isOpen={isModalOpen} onClose={handleModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms of Service</ModalHeader>
          <ModalBody className="text-gray-800">

  <p className="mb-4">
    These terms and conditions ("Terms") govern your use of the website located at [website URL] (the "Website") operated by [Company Name] ("we", "us", or "our"). Your access to and use of the Website is conditioned on your acceptance of and compliance with these Terms. By accessing or using the Website, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Website.
  </p>

  <h3 className="text-lg font-semibold mb-2">Content</h3>

  <p className="mb-4">
    Our Website may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Website, including its legality, reliability, and appropriateness.
  </p>

  <h3 className="text-lg font-semibold mb-2">Intellectual Property</h3>

  <p className="mb-4">
    The Website and its original content, features, and functionality are owned by [Company Name] and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
  </p>

  <h3 className="text-lg font-semibold mb-2">Links To Other Web Sites</h3>

  <p className="mb-4">
    Our Website may contain links to third-party web sites or services that are not owned or controlled by [Company Name]. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that [Company Name] shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web sites or services.
  </p>

  <h3 className="text-lg font-semibold mb-2">Termination</h3>

  <p className="mb-4">
    We may terminate or suspend access to our Website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
  </p>

  <h3 className="text-lg font-semibold mb-2">Changes</h3>

  <p className="mb-4">
    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
  </p>
</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <button className="btn text-white bg-gray-600 hover:bg-gray-700 w-full" onClick={handleBack}>Back</button>
        
                <button className={`btn text-white bg-blue-600 hover:bg-blue-700 w-full ${captchaValid ? '' : 'disabled'}`} disabled={!captchaValid || !agreeToTerms}>Next </button>

                </div>
            </div>
            <div className="text-sm text-gray-500 text-center mt-3">
                {/* By creating an account, you agree to the <Link className="underline" to={'/TermsAndConditions'}>terms & conditions</Link>. */}
            </div>
        </form>
    )};