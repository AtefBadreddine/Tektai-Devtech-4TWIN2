import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { HeartIcon } from '@heroicons/react/solid';


interface UserData {
  username: string;
  image: string;
  companyName: string;
  adresse: string;
  role: string;
  }

const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

const Challenges = ({ status }) => {
  
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(9);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/challenges/filter?status=${status}&page=${currentPage}&limit=${challengesPerPage}`);
        setChallenges(response.data.reverse()); // Reverse the array of challenges
        setLoading(false);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };
    fetchChallenges();
  }, [status, currentPage, challengesPerPage]);

  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges.slice(indexOfFirstChallenge, indexOfLastChallenge);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  
      const Challenge = ({ challenge}) => {
   // const Challenge: React.FC = () => {

  
    const [userData, setUserData] = useState<UserData | null>(null);
    const [flashMessage, setFlashMessage] = useState(""); // State for flash message
    const [loadingCompany, setLoadingCompany] = useState(true);
    const [companyData, setCompanyData] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    const storedUser = localStorage.getItem('user');
   const user = storedUser ? JSON.parse(storedUser) : null;
   
   useEffect(() => {
    const localStorageData = localStorage.getItem('user');

    const fetchUserData = async (username) => {
      try {
        // Fetch user data from the backend
        const response = await axios.get(`http://localhost:3000/users/get/${username}`);
        const userData = response.data;
        setUserData(userData);
        setProfileImageUrl(`/uploads/${userData.image}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setUserData(parsedData);

      fetchUserData(parsedData.username); // Move fetchUserData here
    } else {
      console.log('No user data found in local storage');
    }

    console.log(userData?.companyName);
  }, []);

    const handleClickAddFavorite = async (challengeId) => {
      const userId = userData?._id;
      try {
        const response = await axios.post(`http://localhost:3000/users/${userId}/favorites/add/${challengeId}`);
        console.log('User ID:', userId);
        console.log('Challenge ID:', challengeId);
        setIsFavorite(true);

        // Handle successful response (e.g., update UI to reflect the added favorite)
      } catch (error) {
        // Handle potential errors during the API request
      }
    };
    
    useEffect(() => {
  
      const fetchUserData = async () => {
        try {
          // Fetch user data from the backend
          const response = await axios.get(`http://localhost:3000/users/get/${challenge.company_id}`);
          const userData = response.data;
          setUserData(userData);
          setProfileImageUrl(`/uploads/${userData.image}`);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      console.log(userData);
      fetchUserData();
    }, [challenge.company_id]);
  
    return (
      <>
      <article className="mb-4 p-6 rounded-xl bg-blue-100 flex flex-col bg-clip-border">
{/* info */}
        <div className="flex pb-6 items-center justify-between">
          <div className="flex">
            <a className="inline-block mr-4" href="#">
            {userData && userData.image ? (
      <img
        src={`http://localhost:3000/uploads/${userData.image}`}
        alt="Profile"
        className="rounded-full max-w-none w-12 h-12"      />
    ) : (
      <img
        src="../../public/default-profile-picture.png" // path to the static default image
        alt="Default Profile"
        className="rounded-full max-w-none w-12 h-12"      />
    )}
             
            </a>
            <div className="flex flex-col">
              <div>
                <a className="inline-block text-lg font-bold dark:text-white company-name" href="#">{userData?.username??'Loading...'}</a>
                </div>
              <div className="text-slate-500 dark:text-slate-300 dark:text-slate-400">
              {userData?.role?? 'Loading...'}
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold dark:text-white">
        {challenge.title}
        </h2>
        <p className="text-gray-700 text-base">Prize: <span className='text-[#3aa856] font-bold'>{truncateText(challenge.prize, 10)}</span></p>
        <p className="text-gray-700 text-base mb-10">Status: <span className='text-[#7747ff] font-bold'>{challenge.status}</span></p>

{/* favorite */}
        <div className="py-4">
        {isFavorite ? (
        <span>Added to Favorites!</span>
      ) : (
        <button onClick={() => handleClickAddFavorite(challenge._id)}>Add--Favorite</button>
      )}
        {/* <button
            onClick={handleAddToFavorites}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md 
            ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} 
            transition duration-300`}
          >
            <HeartIcon className="w-4 h-4" />
            <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
          </button> */}
        </div>
{/* btn */}
<div className="">
          {status !== 'Ongoing' && status !== 'Upcoming' && (
            <Link to={`/challenges/${challenge._id}`} className="menu__link">View Details</Link>
          )}
          {status === 'Ongoing' && (
     <Link 
     to={isLoggedIn() ? `/challenges/${challenge._id}` : "/signin"} 
     className={`flex justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2     w-full rounded-lg transition ease-in-out delay-75 
                 btn-smm hover:border-blue-700
                 ${isLoggedIn() ? "" : "cursor-not-allowed opacity-50"} ${isLoggedIn() ? "" : "bg-black text-white"}`}
                 
   >
     {isLoggedIn() ? "Participate" : "Sign In to Participate"}
   </Link>
          )}
          {status === 'Upcoming' && (
            <button className="bg-[#6fc5ff] text-white font-bold py-2 px-4 rounded" disabled>
              Upcoming ...
            </button>
          )}
        </div>
{/* comment input */}
        {/* <div class="relative">
          <input
            class="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
            type="text" placeholder="Write a comment" />
          <span class="flex absolute right-3 top-2/4 -mt-3 items-center">
            <svg class="mr-2" style={{width: '26px', height: '26px'}} viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z">
              </path>
            </svg>
            <svg class="fill-blue-500 dark:fill-slate-50" style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
            </svg>
          </span>
        </div> */}
{/* comments section */}
        {/* <div class="pt-6">
          <div class="media flex pb-4">
            <a class="mr-4" href="#">
              <img class="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/men/82.jpg" />
            </a>
            <div class="media-body">
              <div>
                <a class="inline-block text-base font-bold mr-2" href="#">Leslie Alexander</a>
                <span class="text-slate-500 dark:text-slate-300">25 minutes ago</span>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur.</p>
              <div class="mt-2 flex items-center">
                <a class="inline-flex items-center py-2 mr-3" href="#">
                  <span class="mr-2">
                    <svg class="fill-rose-600 dark:fill-rose-400" style={{width: '22px', height: '22px'}}
                      viewBox="0 0 24 24">
                      <path
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                      </path>
                    </svg>
                  </span>
                  <span class="text-base font-bold">12</span>
                </a>
                <button class="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  Repply
                </button>
              </div>
            </div>
          </div>
         
          <div class="media flex pb-4">
            <a class="inline-block mr-4" href="#">
              <img class="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/women/76.jpg" />
            </a>
            <div class="media-body">
              <div>
                <a class="inline-block text-base font-bold mr-2" href="#">Tina Mills</a>
                <span class="text-slate-500 dark:text-slate-300">3 minutes ago</span>
              </div>
              <p>Dolor sit ameteiusmod consectetur adipiscing elit.</p>
              <div class="mt-2 flex items-center">
                <a class="inline-flex items-center py-2 mr-3" href="#">
                  <span class="mr-2">
                    <svg class="fill-rose-600 dark:fill-rose-400" style={{width: '22px', height: '22px'}}
                      viewBox="0 0 24 24">
                      <path
                        d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z">
                      </path>
                    </svg>
                  </span>
                  <span class="text-base font-bold">0</span>
                </a>
                <button class="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  Repply
                </button>
              </div>
            </div>
          </div>
       
          <div class="w-full">
            <a href="#"
              class="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">Show
              more comments</a>
          </div>
        </div> */}

      </article>
        
      </>
    );

    
  };



  const isLoggedIn = () => {
    const storedToken = localStorage.getItem('token');
    return !!storedToken;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg my-2">
              <div className="animate-pulse">
                <div className="w-full h-40 bg-gray-300"></div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 bg-gray-300 h-6 w-3/4"></div>
                  <div className="text-gray-700 text-base bg-gray-300 h-4 w-1/2 mt-2"></div>
                  <div className="text-gray-700 text-base bg-gray-300 h-4 w-2/3 mt-1"></div>
                  <div className="text-gray-700 text-base bg-gray-300 h-4 w-1/3 mt-1"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          currentChallenges.map(challenge => (
            <Challenge key={challenge.id} challenge={challenge} />
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(challenges.length / challengesPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="mx-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-200">
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
