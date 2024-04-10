import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import axios from 'axios';
import React, { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import './likes.css';

// Default image path
const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

function Comments() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const defaultCompanyId = user ? user._id : ""; // Set default company_id to user._id
  const challengeId = challenge ? challenge._id : ""; // Set default company_id to user._id
  const [commentText, setCommentText] = useState('');
  const commentSectionRef = useRef(null); // Declare the ref here
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (event) => {
    setFormData({ ...formData, description: event.target.value });
  };
  // JavaScript
const commentId = "<comment_id>"; // Replace "<comment_id>" with the actual comment ID

// Dynamically select the label and input elements based on the comment ID
const label = document.getElementById(`like-checkbox-${commentId}`);
const input = document.getElementById(`like-checkbox-${commentId}`);

// Apply styles dynamically
if (label && input) {
  label.style.display = "none"; // Example of applying a style dynamically
}

  

  
  const [formData, setFormData] = useState({
    userName: defaultCompanyId,
    likes: "",
    replies: "Upcoming",
    description: "",
    date: "",
    challengeId: challengeId
});



// Function to format the date
function commentDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const diff = Math.abs(now - date) / 1000; // Difference in seconds

  if (diff < 60) {
    return `${Math.floor(diff)} s`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} m`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} h`;
  } else if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days} d${days > 1 ? 's' : ''} `;
  } else if (diff < 31536000) {
    const weeks = Math.floor(diff / 604800);
    return `${weeks} w${weeks > 1 ? 's' : ''} `;
  } else {
    const years = Math.floor(diff / 31536000);
    return `${years} y${years > 1 ? 's' : ''} `;
  }
}
  // Function to handle like checkbox change for a specific comment
const handleLikeCheckboxChange = async (commentId, isChecked) => {
    try {
        if (isChecked) {
            // Increment likes for the specific comment
            await axios.post(`http://localhost:3000/comments/${commentId}/increment-likes`);
        } else {
            // Decrement likes for the specific comment
            await axios.post(`http://localhost:3000/comments/${commentId}/decrement-likes`);
        }
        // Update the like status for the specific comment in the state
        setComments(prevComments => {
            return prevComments.map(comment => {
                if (comment._id === commentId) {
                    return { ...comment, likes: isChecked ? comment.likes + 1 : comment.likes - 1 };
                }
                return comment;
            });
        });
    } catch (error) {
        console.error('Error updating likes:', error);
    }
};


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
    // Fetch usernames for each comment...
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









useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comments`);
        // Filter comments based on the challengeId
        const filteredComments = response.data.filter(comment => comment.challengeId === id);
        setComments(filteredComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    
    fetchComments();
  }, [id]);

  // Function to format date to display month, day, and optionally year
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
    
        <div className="flex flex-wrap gap-8 p-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div className="flex-1" key={comment._id}>
                <div className="flex gap-4 items-center">
                  {user && user.image ? (
                    <img
                      src={`http://localhost:3000/uploads/${user.image}`}
                      alt="Profile"
                      className="shadow-xl rounded-full h-10 w-10 object-cover align-middle border-none -ml-4"
                    />
                  ) : (
                    <img
                      src="/default-profile-picture.png"
                      alt="Default Profile"
                      className="shadow-xl rounded-full h-10 w-10 object-cover align-middle border-none -ml-4"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-3 items-center">
                      <p className="font-semibold cursor-pointer">{userName[index]}</p>
                      <p className="text-sm text-[#ff6154] cursor-pointer">Follow</p>
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-[#005ef6] text-xl tracking-[2px]">
                  ★★★★★
                </div>
                <div className="italic mt-2 text-[18px] text-[#4b587c] font-normal">
                  {comment.description}
                </div>
                <div className="flex gap-6 text-[#4b587c] text-[12px] mt-4">
                  <span className="flex items-center gap-1 cursor-pointer">
                    <span className="text-[8px]">
                      <svg fill="#4b587c" height="15px" width="15px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 511.971 511.971" xmlSpace="preserve">
                        <g>
                          <g>
                            <g>
                              <path d="M444.771,235.493c-58.987-56.32-138.347-64-167.467-64.747V96.079c0-5.867-4.8-10.667-10.667-10.667
                                  c-2.453,0-4.907,0.853-6.827,2.453L78.478,237.199c-4.587,3.733-5.227,10.453-1.493,15.04c0.427,0.533,0.96,0.96,1.493,1.493
                                  l181.333,149.333c4.587,3.733,11.307,3.093,15.04-1.493c1.6-1.92,2.453-4.267,2.453-6.827v-77.44
                                  c29.76-8.107,143.893-28.693,214.613,103.787c1.813,3.52,5.44,5.653,9.387,5.653c3.413,0,6.72-1.6,8.853-4.693
                                  c1.28-1.813,1.813-4.053,1.813-6.293C511.865,338.639,489.251,278.053,444.771,235.493z M324.131,290.533
                                  c-35.52,0-60.48,8.533-61.12,8.853c-4.267,1.493-7.04,5.547-7.04,10.027v62.72l-153.92-126.72l153.92-126.72v62.72
                                  c0,2.88,1.173,5.653,3.307,7.68c2.133,2.027,4.907,3.093,7.893,2.987c0.96,0,97.813-3.52,163.093,58.987
                                  c32.107,30.72,51.52,72.32,58.027,124.16C436.665,305.679,371.171,290.533,324.131,290.533z"/>
                              <path d="M199.331,387.066c-0.213-0.107-0.32-0.32-0.533-0.427L27.385,245.413l171.413-141.12
                                  c4.693-3.627,5.547-10.347,1.92-14.933c-3.627-4.587-10.347-5.547-14.933-1.92c-0.213,0.107-0.32,0.32-0.533,0.427L3.918,237.199
                                  c-4.587,3.733-5.227,10.453-1.493,15.04c0.427,0.533,0.96,0.96,1.493,1.493l181.333,149.333c4.48,3.84,11.2,3.413,15.04-0.96
                                  C204.131,397.626,203.705,390.906,199.331,387.066z"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    Reply {comment.replies}
                  </span>
                  <span className="flex items-center gap-1 ">{commentDate(comment.date)}</span>
                  <span className="flex items-center cursor-pointer">
                    <div className="like-dislike-container">
                      <div className="icons-box">
                        <div className="icons" >
                        <label className="btn-label" id="like-checkbox">
                            <span className="like-text-content">{comment.likes}</span>
                            <input
                            
                              id="like-checkbox"
                              className="input-box"
                              type="checkbox"
                              onChange={(e) => handleLikeCheckboxChange(comment._id, e.target.checked)}
                            />
                            <svg className="svgs" id="icon-like-solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path>
                            </svg>
                            <svg className="svgs" id="icon-like-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"></path>
                            </svg>
                            <div className="fireworks">
                              <div className="checked-like-fx"></div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
                <hr className="my-4 border-gray-300" />
              </div>
            ))
          ) : (
            <div>No comments available</div>
          )}
        </div>
      );
    };
    
    export default Comments;