import React, { useEffect, useState, useRef } from "react";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import axios from 'axios';
import './likes.css';
import Comments from "./comments";

import { useParams,useNavigate } from "react-router-dom";


// Default image path
const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

function ChallengeDetails() {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const [userName, setUserName] = useState('');
  const defaultusername = user ? user._id : ""; // Set default company_id to user._id
  const challengeId = challenge ? challenge._id : ""; // Set default company_id to user._id
  const [companyName, setCompanyName] = useState('');
  const [image, setImage] = useState('');
  const [loadingCompany, setLoadingCompany] = useState(true);
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const commentSectionRef = useRef(null); // Ref for comments section
  const [formData, setFormData] = useState({
    userName: defaultusername,
    likes: "",
    replies: "Upcoming",
    description: "",
    date: "",
    challengeId: challengeId
  });

  // Fetch challenge details

   const navigate = useNavigate();// Utilisez useNavigate pour la navigation
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/challenges/${id}`);
        setChallenge(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching challenge:', error);
      }
    };

    fetchChallenge();
  }, [id]);

  
  useEffect(() => {
    // Fetch username for each comment...
    const fetchUsernames = async () => {
        const usernamePromises = comments.map(async (comment) => {
            try {
                const response = await axios.get(`http://localhost:3000/users/getById/${comment.userName}`);
                const user = response.data; // Assuming response.data contains the user document
                return user.username; // Return username
            } catch (error) {
                console.error('Error fetching username:', error.message);
                return null; // Return null if an error occurs
            }
        });

        const usernames = await Promise.all(usernamePromises);
        setUserName(usernames); // Set an array of usernames
    };

    fetchUsernames();
}, [comments]);

  // Fetch company details

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/getById/${challenge.company_id}`);
        const { companyName, image } = response.data; // Assuming the image URL is provided in the response data
        
        setCompanyName(companyName);
        setImage(`${image}`); // Set the correct image path received from API
        setLoadingCompany(false);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };
  
    fetchCompany(); // Call the fetchCompany function
  }, [challenge]); // Make sure to include challenge.company_id in the dependency array to re-fetch data when it changes
  
  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);

 // Submit comment

 const handleSubmit = async () => {
  try {
    await axios.post(`http://localhost:3000/comments/${challengeId}`, {
      description: commentText,
      userName: defaultusername, // Use the defaultusername state directly
    });
    const response = await axios.get(`http://localhost:3000/comments/${challengeId}`);
    setComments(response.data); // Update comments state with the new comment
    setCommentText(''); // Clear the comment input field
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};
 // Function to handle change in comment text
 const handleCommentChange = (e) => {
  const text = e.target.value;
  if (text.length <= 200) {
    setCommentText(text);
  }
};




  // Scroll down after every 3 comments
  useEffect(() => {
    if (comments.length >= 3 && comments.length % 3 === 0 && commentSectionRef.current) {
      commentSectionRef.current.scrollTop = commentSectionRef.current.scrollHeight;
    }
  }, [comments.length]);
  

    const handleParticipateClick = () => {
  navigate(`/file-upload/${id}`);
    }



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();

    // Check if the year of the deadline is the same as the current year
    const sameYear = date.getFullYear() === currentDate.getFullYear();
  
    if (sameYear) {
      // If it's the same year, display only month and day
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } else {
      // If it's a different year, display month, day, and year
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  // Determine image source
  const imageSrc = challenge && challenge.image ? challenge.image : defaultImagePath;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow container mx-auto space-y-12">
        <div className="min-h-screen mt-32">
          <main className="container mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-2 rounded-lg shadow-xl p-6">
                  Loading...
                </div>
              ) : (
                challenge ? (
                  <div className="col-span-2 rounded-lg shadow-xl p-6">
                    <div className="flex items-center mb-4">
       
                      <div>
 {user && challenge && user._id === challenge.company_id && (

    <div class="button-container">
  <button class="bin-button ">
  <svg
    class="bin-top"
    viewBox="0 0 39 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
    <line
      x1="12"
      y1="1.5"
      x2="26.0357"
      y2="1.5"
      stroke="white"
      stroke-width="3"
    ></line>
  </svg>
  <svg
    class="bin-bottom"
    viewBox="0 0 33 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_8_19" fill="white">
      <path
        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
      ></path>
    </mask>
    <path
      d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
      fill="white"
      mask="url(#path-1-inside-1_8_19)"
    ></path>
    <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
    <path d="M21 6V29" stroke="white" stroke-width="4"></path>
  </svg>
</button>


<button class="editBtn">
  <svg height="1em" viewBox="0 0 512 512">
    <path
      d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
    ></path>
  </svg>
</button>



</div>

)}


                        <h2 className="text-xl font-semibold mb-2 pt-4">{challenge.title}</h2>
                        <p className="text-gray-600 mb-2">Company: <span className="font-bold text-blue-600"> {loadingCompany ? 'Loading...' : companyName}</span></p>
                        <p className="text-gray-600 mb-2">Prize(TDN): <span className="font-bold text-blue-600">{challenge.prize}</span> </p>
                        <p className="text-gray-600 mb-2">Status: <span className="font-bold text-green-600">{challenge.status}</span></p>
                        <p className="text-gray-600 mb-2">Max teams to participate: <span className="font-bold text-green-600">{challenge.maxTeam}</span></p>

                        <div className="flex items-center">
  <div className={`icon-box ${challenge.visibility.toLowerCase() === 'private' ? 'private' : ''}`}>
    {/* Debugging - log the visibility */}
    <svg
      height="10px"
      width="10px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 451.827 451.827"
      xml:space="preserve"
    >
      <g>
        <path
          style={{ fill: challenge.visibility.toLowerCase() === 'private' ? '#F87171' : 'rgb(74 222 128)' }}
          d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
        c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
        />
      </g>
    </svg>
    <p className={`span ${challenge.visibility.toLowerCase() === 'private' ? 'private' : ''}`}>
      {challenge.visibility}
    </p>
  </div>
  {challenge.visibility.toLowerCase() === 'private' && (
  <button className="bg-[#338cf5] text-white font-bold py-2 mt-3 px-4 rounded ml-4 w-full">
    Send request
  </button>
)}

</div>


                      </div>
                      <img src={`http://localhost:3000/uploads/${challenge.image}`} alt={challenge.title} className="h-48 w-72 object-cover ml-auto rounded-lg shadow-xl" />
                   
 
                    </div>
                    
                    <h2 className="h4">Description :</h2>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    <h2 className="h4">Dataset Description:</h2>
                    <p className=" mb-4 mt-2 text-sm   text-gray-400 dark:text-white">The dataset for this competition (both train and test) was generated from a deep learning model trained on the Steel Plates Faults dataset from UCI. Feature distributions are close to, but not exactly the same, as the original. Feel free to use the original dataset as part of this competition, both to explore differences as well as to see whether incorporating the original in training improves model performance.</p>
            
                    <button class="download-button mb-5">
                      <div class="docs">
                        <svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="20" width="20" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line y2="13" x2="8" y1="13" x1="16"></line>
                          <line y2="17" x2="8" y1="17" x1="16"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg> DataSet
                      </div>
                      <div class="download">
                        <svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line y2="3" x2="12" y1="15" x1="12"></line>
                        </svg>
                      </div>
                    </button>

                    <div className="ml-5">
                      <ol className="relative border-s mt-12 border-gray-700">
                        <li className="mb-10 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-300 dark:bg-gray-700"></div>
                          <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{formatDate(challenge.deadline)}</time>
                          <h3 className="mt-4 text-base font-semibold text-gray-500">Entering Deadline</h3>
                          <ul className=" mb-5 list-disc ml-5">
                            <li ><p className="text-xs font-normal text-gray-400">Submit your entry before this date to participate in the competition.</p></li>
                            <li><p className="text-xs font-normal text-gray-400">Form your team before this date to compete together.</p></li>
                            <li><p className="text-xs font-normal text-gray-400">The competition concludes on this date. Submit your final work before the deadline.</p></li>
                          </ul>
                          {challenge && challenge.status === 'Completed' ? (
  <button className="bg-[#6fc5ff] text-white font-bold py-2 px-4 rounded" disabled>
    Completed
  </button>
) : (
  <button className={`btn-smm ${challenge.visibility.toLowerCase() === 'private' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleParticipateClick} disabled={challenge.visibility.toLowerCase() === 'private'}>
    {challenge.visibility.toLowerCase() === 'private' ? 'Private Challenge' : 'Participate now!'}
    <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </button>
)}

                        </li>
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-2 rounded-lg shadow-xl p-6">Oops, 404 not found</div>
                )
              )}
<div className="bg-white rounded-lg shadow-xl overflow-hidden">
  <div className="flex flex-col p-8 rounded-2xl bg-white">
    <h2 className="comments text-xl font-semibold mb-2">Comments and Reviews</h2>
    <div className="comments-container" ref={commentSectionRef}>
      <Comments></Comments>
    </div>

    <h5 className="pt-2 mb-2 font-bold">Comment</h5>
 <div className="pb-8 flex flex-col gap-4">
  <form onSubmit={handleSubmit} className="flex gap-4">
    <input
      type="hidden"
      name="userName"
      value={defaultusername}
    />
    <div className="relative flex-1">
      <textarea
        name="description"
        placeholder={`Comment as ${user.username}`}
        className="p-2 border border-gray-300 rounded w-full"
        rows="2"
        maxLength={200} // Set maximum character limit
        onChange={handleCommentChange} // Handle change event
        value={commentText}
      ></textarea>
      <p className="absolute bottom-0 right-0 text-sm text-red-500 px-2 mb-2">{200 - commentText.length} letters left</p>
    </div>
    <button type="submit" className="btn-smm" disabled={!commentText.trim()}>
      Send
    </button>
  </form>
</div>
  </div>



              </div>
            </div>
          </main>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default ChallengeDetails;
