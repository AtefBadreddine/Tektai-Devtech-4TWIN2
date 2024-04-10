import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

function SecurityQuestionComponent({ onSubmit }) {
  const [answer, setAnswer] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false); // State variable to track CAPTCHA validity

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the answer is correct
    if (answer.trim().toLowerCase() === 'tektai') {
      onSubmit(true); // Notify the parent component that the answer is correct
    } else {
      alert('Incorrect answer. Please try again.');
    }
  };
  const handleCaptchaVerify = (response) => {
    setCaptchaValid(true);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-filter">
      <div className="bg-white p-8 rounded-lg shadow-md backdrop-filter">
        <h2 className="text-xl font-semibold mb-4">Please write "TEKTAI" correctly</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the answer"
            required
            className="px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          />
           <ReCAPTCHA
    sitekey="6LcGCJ0pAAAAAPHo1K4WnSoMZE4e_mTplFnd4Uc9"
    onChange={handleCaptchaVerify}

  />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SecurityQuestionComponent;
