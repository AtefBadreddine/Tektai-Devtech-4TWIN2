import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { useState, useRef } from "react";

import './card.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Challenges from "../listChallenges/challenge";
import ReCAPTCHA from "react-google-recaptcha";
import UploadimageChallengeForm from "../../../components/uploadImageChallenge";

function Create() {
    const [animating, setAnimating] = useState(false);
    const fieldsetsRef = useRef([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [formValid, setFormValid] = useState(false);
    const [currentFieldsetIndex, setCurrentFieldsetIndex] = useState(0);
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState(null);
    const chId = challenge ? challenge._id : ""; // Set default company_id to user._id
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const defaultCompanyId = user ? user._id : ""; // Set default company_id to user._id
    const [dataSetFileUrl, setdataSetFile] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false); // State variable to track CAPTCHA validity
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
  





    
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setError('');
    };

    const handleOnChange = (event) => {
        const { name, checked } = event.target;
      
        // Update checkedItems state
        setCheckedItems((prevCheckedItems) => ({
          ...prevCheckedItems,
          [name]: checked,
        }));
      
        // Update barem array in formData state based on checked status
        if (checked) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            barem: [...prevFormData.barem, name],
          }));
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            barem: prevFormData.barem.filter((item) => item !== name),
          }));
        }
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
        maxTeam:"Undefined",
        barem: ["Presentation", "Source Code"], // Include default checked options
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

          
          if (name === "teamType") {
            // Clear prize value when prize type changes
            setFormData((prevData) => ({
              ...prevData,
              maxTeam: "",
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
                setTimeout(() => {
        
                    navigate(`/challenges/${data._id}`);
                    
                  }
                , 2000);
      
      

            } else {
                throw new Error('Failed to add challenge');
            }
        } catch (error) {
            console.error('Error adding challenge:', error.message);
        }
    };
    

    // Disable submit button if there are validation errors or if terms are not agreed

  
    const nextClickHandler = () => {
        if (animating) return;
        setAnimating(true);

        const current_fs = fieldsetsRef.current[currentFieldsetIndex];
        const nextFieldsetIndex = currentFieldsetIndex + 1;

        if (nextFieldsetIndex >= fieldsetsRef.current.length) {
            console.error('Already at the last step');
            setAnimating(false);
            return;
        }

        const next_fs = fieldsetsRef.current[nextFieldsetIndex];

        const progressbarItems = document.querySelectorAll('#progressbar li');

        progressbarItems[currentFieldsetIndex].classList.remove('active');
        if (nextFieldsetIndex === fieldsetsRef.current.length - 1) {
            progressbarItems.forEach(item => item.classList.add('active'));
        } else {
            progressbarItems[nextFieldsetIndex].classList.add('active');
        }

        current_fs.style.display = 'none';
        next_fs.style.display = 'block';

        setCurrentFieldsetIndex(nextFieldsetIndex);
        setAnimating(false);
    };

    const previousClickHandler = () => {
        if (animating) return;
        setAnimating(true);

        const current_fs = fieldsetsRef.current[currentFieldsetIndex];
        const previousFieldsetIndex = currentFieldsetIndex - 1;

        if (previousFieldsetIndex < 0) {
            console.error('Already at the first step');
            setAnimating(false);
            return;
        }

        const previous_fs = fieldsetsRef.current[previousFieldsetIndex];

        const progressbarItems = document.querySelectorAll('#progressbar li');

        progressbarItems[currentFieldsetIndex].classList.remove('active');
        progressbarItems[previousFieldsetIndex].classList.add('active');

        current_fs.style.display = 'none';
        previous_fs.style.display = 'block';

        setCurrentFieldsetIndex(previousFieldsetIndex);
        setAnimating(false);
    };


    return (
        <>
      <div className="flex flex-col min-h-screen overflow-hidden">
                <Header />
                <main className="flex-grow container mx-auto max-w-3xl pb-8 mt-12">
                    <div className="mx-6">
        {showSuccessCard ? (
                    <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399] animate-spin">
                            {/* Use a spinner SVG or another suitable element for animation */}
                            <svg
                                className="h-6 w-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {/* SVG path for spinner */}
                            </svg>
                        </div>
                        <div className="w-full">
                            <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                                Success!
                            </h5>
                            <p className="text-base leading-relaxed text-body">
                                Your Challenge Has Been Created
                            </p>
                        </div>
                    </div>
                ) : (
        <form id="msform" onSubmit={handleSubmit}>

  <ul id="progressbar">
    <li class="active">Challenge Info</li>
    <li>Challenge settings</li>
    <li>Prize</li>
  </ul>
  <fieldset ref={(el) => fieldsetsRef.current[0] = el} className="current">
    <h2 className="fs-title">Challenge Info</h2>
    <h3 className="fs-subtitle">Start challenge</h3>
    <input
        type="text"
        name="title"
        placeholder="Enter a descriptive title"
        className=" inputfiled w-full p-2 border border-gray-300 rounded mb-2" // Reduce mb (margin bottom) to make the input smaller vertically
        value={formData.title}
        onChange={handleChange}
    />
    {errors.title && <p className="text-red-500">{errors.title}</p>}
    <textarea
        name="description"
        placeholder="Provide a description explaining what participants will do."
        className="inputfiled w-full p-2 border border-gray-300 rounded mb-2" // Reduce mb (margin bottom) to make the textarea smaller vertically
        rows="3"
        value={formData.description}
        onChange={handleChange}
    ></textarea>
    {errors.description && <p className="text-red-500">{errors.description}</p>}
    <div className="flex gap-6 mb-6">
<div className="w-1/2">
<label htmlFor="image" className="block mb-2 font-bold">Upload Image</label>
     <input type="file" onChange={handleFileChange}  id="image" className="w-full p-2 border border-gray-300 rounded"/>
     <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>


            <input
                type="hidden"
                name="company_id"
                value={defaultCompanyId}
            />
    </div>
    <div className="w-1/2">
    <label htmlFor="dataset" className="block mb-2 font-bold">
        Upload Dataset <span className="text-red-600">*</span>
    </label>
    <input 
        type="file" 
        id="dataset" 
        className="inputfiled w-full p-2 border border-gray-300 rounded"
        onChange={(e) => handleFileChange(e)} // Add onChange event handler
    />
    {errors.dataset && <p className="text-red-500">{errors.dataset}</p>} {/* Display error message if any */}
    </div>
</div>

    <input type="button" name="next" className="next action-button" onClick={nextClickHandler} value="Next" />
</fieldset>
















                        <fieldset ref={(el) => fieldsetsRef.current[1] = el} className="second">
                            <h2 className="fs-title">Challenge settings</h2>
                            <h3 className="fs-subtitle">This is step 2</h3>
 

<div className="grid grid-cols-2 gap-4">
      <div className="mb-4">
        <div className="mb-4">
          <p className="mb-2 font-bold">Visibility <span className="text-red-600">*</span></p>
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
          <p className="mb-2 font-bold">Eligible Participants <span className="text-red-600">*</span></p>
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


    <div className="grid grid-cols-2 gap-4">
      <div className="mb-4">
          <p className="mb-2 font-bold">Team number <span className="text-red-600">*</span></p>

          <select
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={formData.maxTeam}
            onChange={(e) => {
                const value = e.target.value;
                setFormData((prevData) => ({
                    ...prevData,
                    teamType: value,
                    maxTeam: value === "undefined" ? "" : "defined" // Clear prize value if changing to "Not Money" type
                }));
            }}
        >
            <option value="undefined">Undefined</option>
            <option value="defined">Defined</option>
        </select>

        {formData.teamType === "undefined" && (
         
                    <input
                       type="hidden"
                        name="maxTeam"
                        placeholder="Undefined"
                        className="w-full p-2 border border-gray-300 rounded mb-0"
                        value="Undefined"
                    />
           
        )}
        {formData.teamType === "defined" && (
            <input
                type="number"
                name="maxTeam"
                placeholder="Enter max team number"
                className="inputfiled w-full p-2 border border-gray-300 rounded mb-4"
                value={formData.maxTeam}
                onChange={handleChange}

            />
            )}
        <p className="text-sm text-gray-500">Select the maximum of team who can participate.</p>








      </div>
      <div className="mb-4">
          <p className="mb-2 font-bold">Bareme <span className="text-red-600">*</span></p>
        
          <div className="grid grid-cols-2 gap-4">
  <label >
    <div   style={{ marginRight: '32px' }}>
    <input
      type="checkbox"
      name="File"
      checked={checkedItems.option1 || false || formData.barem.includes("File")}
      onChange={handleOnChange}
    
    />
    File
    </div>
    <p className="text-sm text-gray-500 ">(.txt,.pdf)</p>

  </label>
  <label style={{ marginRight: '2px' }}>
    <input
      type="checkbox"
      name="Presentation"
      checked={checkedItems.option2 || true || formData.barem.includes("Presentation")}
      onChange={handleOnChange}
      disabled
      className="disabled-checkbox" // Apply the disabled-checkbox class
    />
    Presentation
    <p className="text-sm text-gray-500">(.pdf,.mp4)</p>

  </label>

</div>
<div className="grid grid-cols-2 gap-4">
  <label >
    <input
      type="checkbox"
      name="Dataset"
      checked={checkedItems.option3 || false|| formData.barem.includes("Dataset")}
      onChange={handleOnChange}
    />
    Dataset
    <p className="text-sm text-gray-500 ">(.xlsx,.rar,.zip)</p>

  </label>
  <label>
    <input
      type="checkbox"
      name=" Source Code"
      checked={checkedItems.option4 || true || formData.barem.includes("Source Code")}
      onChange={handleOnChange}
      disabled
      className="disabled-checkbox" // Apply the disabled-checkbox class
    />
    Source Code
    <p className="text-sm text-gray-500">(pdf or mp4)</p>

  </label>
</div>

      </div>
    </div>
                            <input type="button" name="previous" className="previous action-button" onClick={previousClickHandler} value="Previous" /> 
                            <input type="button" name="next" className="next action-button" onClick={nextClickHandler} value="Next" />
                        </fieldset>


















                        <fieldset ref={(el) => fieldsetsRef.current[2] = el} className="last">
                            <h2 className="fs-title">Prize type</h2>
                            <h3 className="fs-subtitle">This is step 3</h3>
                            <div className="flex gap-6 mb-6">
    <div className="w-1/2">
        <h5 className="mb-2 font-bold">Start Date <span className="text-red-600">*</span></h5>
        <input
            type="datetime-local"
            name="start_date"
            placeholder="Start Date"
            className="inputfiled w-full p-2 border border-gray-300 rounded mb-4"
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
            className="inputfiled w-full p-2 border border-gray-300 rounded mb-4"
            value={formData.deadline}
            onChange={handleChange}
        />
        {errors.deadline && <p className="text-red-500">{errors.deadline}</p>}
    </div>
</div>
<select
    className="w-full p-2 border border-gray-300 rounded mb-4"
    value={formData.prizeType}
    onChange={(e) => {
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            prizeType: value,
            prize: value === "not_money" ? "" : prevData.prize // Clear prize value if changing to "Not Money" type
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
                className="inputfiled w-full p-2 border border-gray-300 rounded mb-0"
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
        className="inputfiled w-full p-2 border border-gray-300 rounded mb-4"
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

     
                  <ReCAPTCHA
    sitekey="6LcGCJ0pAAAAAPHo1K4WnSoMZE4e_mTplFnd4Uc9"
    onChange={handleCaptchaVerify}

  />
                      {/* <CaptchaComponent onVerify={(isValid) => setCaptchaValid(isValid)} /> */}
                      {captchaValid ? null : (
                          <div className="text-red-600">Please complete the CAPTCHA verification</div>
                      )}






                            <input type="button" name="previous" className="previous action-button" value="Previous" onClick={previousClickHandler} />
                            <input type="submit" name="button" className="previous btnn action-button" value="Submit"  />
                        </fieldset>
</form>
  )}
</div>
</main>
        </div>
          <Footer />
          
</>
    );
}

export default Create;
