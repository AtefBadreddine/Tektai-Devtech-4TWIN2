import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { useState } from "react";
import './card.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import Challenges from "../listChallenges/challenge";
import ReCAPTCHA from "react-google-recaptcha";

function CreateChallenge() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const defaultCompanyId = user ? user._id : ""; // Set default company_id to user._id
    const [dataSetFileUrl, setdataSetFile] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false); // State to track if terms are agreed
    const [captchaValid, setCaptchaValid] = useState(false); // State variable to track CAPTCHA validity
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setError('');
    };
  
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        company_id: defaultCompanyId, // Set default value to user._id
        prize: "",
        status: "Upcoming",
        description: "",
        visibility: "Public",
        eligible_participants: "Anyone",
        start_date: "",
        deadline: "",
        dataset: "",
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        prize: "",
        start_date: "",
        deadline: "",
    });
    const [showSuccessCard, setShowSuccessCard] = useState(false);
    const [challengeId, setChallengeId] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        let status = formData.status;

        // Reset the error message for the current field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
        if (name === "prizeType") {
            // Clear prize value when prize type changes
            setFormData((prevData) => ({
              ...prevData,
              prize: "",
            }));
          }
          const updatedPrize = formData.prizeType === "money" ? value + " DT" : value;

        // Input validation for each field
        if (name === "title" && value.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Title is required",
            }));
            return;
        }

        if (name === "description" && value.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Description is required",
            }));
            return;
        }

        if (name === "prize" && isNaN(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Prize must be a number",
            }));
            return;
        }

        if (new Date(formData.start_date) >= new Date(formData.deadline)) {
            setErrors({ ...errors, deadline: "Deadline must be after the start date" });
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "start_date" || name === "deadline") {
            const startDate = name === "start_date" ? value : formData.start_date;
            const deadline = name === "deadline" ? value : formData.deadline;

            const startDateObj = new Date(startDate);
            const deadlineObj = new Date(deadline);
            const currentDate = new Date();

            if (currentDate < startDateObj) {
                status = "Upcoming";
            } else if (currentDate >= startDateObj && currentDate <= deadlineObj) {
                status = "Ongoing";
            } else {
                status = "Completed";
            }

            setFormData((prevData) => ({
                ...prevData,
                status: status,
            }));
        }
    };


    const handleSubmitFile = async (e) => {
        e.preventDefault();
    
        if (!challengeId) {
            setError('Challenge ID is required.');
            return;
        }
    
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }
    
        const formData = new FormData();
        formData.append('dataset', file); // Use the correct name here
    
        try {
            const response = await axios.post(`http://localhost:3000/challenges/uploadfile/${challengeId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
            // Provide feedback to the user, e.g., display a success message
        } catch (error) {
            console.error('Failed to upload file:', error);
            setError('Failed to upload file. Please try again later.');
            // Provide feedback to the user, e.g., display an error message
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const handleCaptchaVerify = (response) => {
        setCaptchaValid(true);
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
    


        setTimeout(() => {
        
              navigate('/challenges/${challengeId}');
            }
          , 2000);


        if (!termsAgreed) {
            alert("Please agree to the terms of agreement.");
            return;
        }
        // Validate form before submitting
        const validationErrors = {};
        if (formData.title.trim() === "") {
            validationErrors.title = "Title is required";
        }
        if (formData.description.trim() === "") {
            validationErrors.description = "Description is required";
        }
        if (isNaN(formData.prize)) {
            validationErrors.prize = "Prize must be a number";
        }
        if (formData.start_date === "") {
            validationErrors.start_date = "Start date is required";
        }
        if (formData.deadline === "") {
            validationErrors.deadline = "Deadline is required";
        }
    

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/challenges', formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
    
            // Check if response status is OK (2xx)
            if (response.status >= 200 && response.status < 300) {
                const data = response.data;
                setChallengeId(data._id);
                setShowSuccessCard(true);
                await handleSubmitFile(e);

            } else {
                throw new Error('Failed to add challenge');
            }
        } catch (error) {
            console.error('Error adding challenge:', error.message);
        }
    };
    

    // Disable submit button if there are validation errors or if terms are not agreed
    const isSubmitDisabled = Object.values(errors).some(error => error !== "") || !termsAgreed;

    return (
       <div className="flex flex-col min-h-screen overflow-hidden">
    <Header />
    <main className="flex-grow container mx-auto max-w-3xl pb-8 mt-32">
        <div className="mx-6">
            <h3 className="text-xl mb-4 font-bold">Start a Challenge</h3>

            <form onSubmit={handleSubmit}>

                <div className="mb-6">
                    <h5 className="mb-2 font-bold">Challenge title:</h5>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter a descriptive title"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                    <h5 className="mb-2 font-bold">Challenge Details</h5>
                    <textarea
                        name="description"
                        placeholder="Provide a description explaining what participants will do."
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="8"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                </div>
                <div className="grid grid-cols-2 gap-6">
    {/* First Column */}
    <div className="flex flex-wrap gap-6 mb-6">
        <div className="w-full">
            <div className="mb-4">
                <label htmlFor="image" className="block mb-2 font-bold">Upload Image</label>
                <input type="file" id="image" className="w-full p-2 border border-gray-300 rounded"/>
            </div>
            <input
                type="hidden"
                name="company_id"
                value={defaultCompanyId}
            />
        </div>
    </div>

    {/* Second Column */}
<div className="flex flex-wrap gap-6 mb-6">
    <div className="w-full">
        <h5 className="mb-2 font-bold">
            Challenge Prize <span className="text-red-600">*</span>
        </h5>
        <select
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={formData.prizeType}
            onChange={(e) => {
                const value = e.target.value;
                setFormData((prevData) => ({
                    ...prevData,
                    prizeType: value,
                    prize: value === "money" ? "" : "" // Clear prize value if changing to "Not Money" type
                }));
            }}
        >
            <option value="">Select Prize Type</option>
            <option value="money">Money</option>
            <option value="not_money">Not Money</option>
        </select>
        {formData.prizeType === "money" && (
            <div style={{ display: "grid", gridTemplateColumns: "5fr 1fr", alignItems: "center", gap: "10px" }}>
                <div className="flex items-center">
                    <input
                        type="number"
                        name="prize"
                        placeholder="Enter prize amount"
                        className="w-full p-2 border border-gray-300 rounded mb-0"
                        value={formData.prize}
                        onChange={handleChange}
                    />
                </div>
                <div className="carddt flex items-center justify-center">DT</div>
            </div>
        )}
        {formData.prizeType === "not_money" && (
            <input
                type="text"
                name="prize"
                placeholder="Enter prize description"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={formData.prize}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value)) { // Validate input to only accept letters and whitespace
                        setFormData((prevData) => ({
                            ...prevData,
                            prize: value
                        }));
                    }
                }}
            />
        )}
    </div>
</div>

</div>

<div className="flex gap-6 mb-6">
    <div className="w-1/2">
        <h5 className="mb-2 font-bold">Start Date <span className="text-red-600">*</span></h5>
        <input
            type="datetime-local"
            name="start_date"
            placeholder="Start Date"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={formData.start_date}
            onChange={handleChange}
        />
        {errors.start_date && <p className="text-red-500">{errors.start_date}</p>}
    </div>
    <div className="w-1/2">
        <h5 className="mb-2 font-bold">Deadline <span className="text-red-600">*</span></h5>
        <input
            type="datetime-local"
            name="deadline"
            placeholder="Deadline"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={formData.deadline}
            onChange={handleChange}
        />
        {errors.deadline && <p className="text-red-500">{errors.deadline}</p>}
    </div>
</div>
<div className="grid grid-cols-2 gap-4">
      <div className="mb-4">
        <div className="mb-4">
          <p className="mb-2 font-bold">Visibility *</p>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            name="visibility"
            value={formData.visibility}
            onChange={handleInputChange}
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <p className="text-sm text-gray-500">The challenge will be visible on TektAI.</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-4">
          <p className="mb-2 font-bold">Eligible Participants *</p>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            name="eligibleParticipants"
            value={formData.eligibleParticipants}
            onChange={handleInputChange}
          >
            <option value="Anyone">Anyone</option>
            <option value="Invitation-only">Invitation-only</option>
          </select>
          <p className="text-sm text-gray-500">Participants can join via TektAI or by using the challenge URL.</p>
        </div>
      </div>
    </div>
                                

    <div className="mb-4">
    <label htmlFor="dataset" className="block mb-2 font-bold">
        Upload Dataset <span className="text-red-600">*</span>
    </label>
    <input 
        type="file" 
        id="dataset" 
        className="w-full p-2 border border-gray-300 rounded"
        onChange={(e) => handleFileChange(e)} // Add onChange event handler
    />
    {errors.dataset && <p className="text-red-500">{errors.dataset}</p>} {/* Display error message if any */}
</div>

                <div className="mb-4">
                    <h5 className="mb-2 font-bold">Privacy, Access & Resources</h5>
               
                <div className="my-8">
                            <span className="mb-4 font-bold">Terms of Agreement *</span>
                            <div className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2 text-sm"
                                    onChange={(e) => setTermsAgreed(e.target.checked)}
                                />
                                <p className={termsAgreed ? "text-sm" : "text-red-500 text-sm"}>
                                    I agree to comply with TektAI’s terms and conditions and will not offer monetary rewards without prior approval from the TektAI Team.
                                </p>
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
                        <button
                            className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ${isSubmitDisabled && 'cursor-not-allowed opacity-50'}`}
                            type="submit"
                            disabled={isSubmitDisabled} // Disable submit button if there are validation errors or terms are not agreed
                        >
                            Create Challenge
                        </button>

            </form>
        </div>
    </main>
    <Footer />
       {/* Success Card */}
{showSuccessCard && (
  <div class="cardpop-container">
    <div class="cardpop"> 
      <div class="header"> 
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path> </g></svg>
        </div> 
        <div class="content">
          <span class="title">Success! </span> 
          <p class="message">Your Challenge Has Been Created. Click 'View' to Check It Out</p> 
        </div> 
      </div> 
      <div class="actions">
      <button type="button" class="history">
  <Link to={`/challenges/${challengeId}`}>View</Link>
</button>
      </div> 
    </div> 
  </div>
)}

        </div>
    );
}

export default CreateChallenge;
