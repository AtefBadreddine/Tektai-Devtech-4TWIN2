import React, { useState, useEffect } from 'react';

const CaptchaComponent = ({ onVerify }) => {
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);

  // Generate a random CAPTCHA value
  const generateCaptcha = () => {
    const captchaChars = '6LfScIgpAAAAAIGkDhrQPVIYqkAdnHsu1aZ84OQU';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += captchaChars.charAt(Math.floor(Math.random() * captchaChars.length));
    }
    setCaptchaValue(captcha);
  };

  // Validate CAPTCHA input
  const validateCaptcha = () => {
    if (captchaInput.toUpperCase() === captchaValue.toUpperCase()) {
      setCaptchaValid(true);
      onVerify(true);
    } else {
      setCaptchaValid(false);
      onVerify(false);
      alert('CAPTCHA validation failed. Please try again.');
    }
  };

  // Handle CAPTCHA input change
  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  // Handle CAPTCHA form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    validateCaptcha();
  };

  // Initialize CAPTCHA value on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <img src={`https://dummyimage.com/150x50/000/fff&text=${captchaValue}`} alt="Captcha" />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={captchaInput}
          onChange={handleCaptchaChange}
          className="form-input w-full text-gray-800"
          placeholder="Enter CAPTCHA"
          required
        />
      </div>
      {!captchaValid && (
        <div>
          <button onClick={generateCaptcha} className="btn mr-2">
            Refresh
          </button>
          <button onClick={handleSubmit} className="btn" disabled={!captchaValue}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CaptchaComponent;
