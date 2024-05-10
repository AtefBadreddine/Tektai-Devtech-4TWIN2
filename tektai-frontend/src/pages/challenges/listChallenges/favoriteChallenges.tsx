import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../layout/Header';
import Footer from '../../../layout/Footer';

interface Challenge {
    _id: string;
    title: string;
    description: string;
    image:string;
    prize:string;
    status:string;
}

const FavoriteChallenges = () => {
  const [favoriteChallenges, setFavoriteChallenges] = useState<string[]>([]); // Explicitly define the type as string[]
  const [challengesData, setChallengesData] = useState<Challenge[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(true);
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked state
  };
  useEffect(() => {
    // Fetch user data and favorite challenges when the component mounts
    const localStorageData = localStorage.getItem('user');

    if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        setUserId(parsedData._id); // Set userId from local storage
    } else {
        console.log('No user data found in local storage');
    }
}, []);

  useEffect(() => {
    // Function to fetch the connected user's favorite challenges
    const fetchFavoriteChallenges = async () => {
      try {
          if (userId) {
              const response = await axios.get(`${API_URL}/users/${userId}/favorites`);
              console.log(response.data);
              const favoriteChallengeIds: string[] = response.data; // Assuming the response data is an array of favorite challenge IDs
              setFavoriteChallenges(favoriteChallengeIds); // Assuming the response data is an array of favorite challenge IDs
          }
      } catch (error) {
          console.error('Error fetching favorite challenges:', error);
      }
  };

  if (userId) {
      fetchFavoriteChallenges();
  }
}, [userId]);

  useEffect(() => {
    // Function to fetch details of each favorite challenge
    const fetchChallengeDetails = async () => {
      try {
        const challenges = await Promise.all(
          favoriteChallenges.map(async (challengeId) => {
            const response = await axios.get(`${API_URL}/challenges/${challengeId}`);
            return response.data;
          })
        );
        setChallengesData(challenges);
        console.log('challengess' + challenges)
      } catch (error) {
        console.error('Error fetching challenge details:', error);
      }
    };

   
    if (favoriteChallenges.length > 0) {
      fetchChallengeDetails();
  }

  }, [favoriteChallenges]);

  const handleRemoveFromFavorites = async (challengeId: string) => {
    try {
        if (userId) {
            // Delete challenge from favorites
            await axios.delete(`${API_URL}/users/${userId}/favorites/remove/${challengeId}`);
            console.log('Challenge with ID deleted:', challengeId);
            // Refresh favorite challenges
            const response = await axios.get(`${API_URL}/users/${userId}/favorites`);
            const favoriteChallengeIds: string[] = response.data;
            setFavoriteChallenges(favoriteChallengeIds);
        }
    } catch (error) {
        console.error('Error removing challenge from favorites:', error);
    }
};

  return (
    <>
    <Header/>
    <main className="flex-grow container mx-auto space-y-12">
        <div className="pt-36 mx-auto px-6 max-w-6xl text-gray-500">
            <div className="text-center">
                <h2 className="text-3xl text-gray-950 dark:text-white font-semibold">Favorite challenges</h2>
                <p className="mt-6 text-gray-700 dark:text-gray-300">Explore your favorite challenges !</p>
            </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* challenge upcoming */}
        {challengesData.map((challenge) => (
challenge.status === 'Upcoming' && (
<div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
<div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-sky-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10 "></div>
<div className="relative">
    <div className="border w-30 border-sky-500/10 flex relative *:relative  *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-sky-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">

    <svg  className="text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
</svg>
<span className="ml-2 text-blue-700">{challenge.status}</span>
</div>

    <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
        <h1 className="text-gray-900 dark:text-gray-900">{challenge.title}</h1>
        <p className="text-gray-500 dark:text-gray-500">{challenge.description}</p>

    </div>
    <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
    <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
            <span>View details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
        </a>
        
  

        <button onClick={() => handleRemoveFromFavorites(challenge._id)}>

        <input
        value="favorite-button"
        name="favorite-checkbox"
        id="favorite"
        checked={isChecked}
        onChange={handleCheckboxChange}
        type="checkbox"
      />
      <label className="containerfav" htmlFor="favorite">
        <svg
          className="feather feather-heart"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleCheckboxChange} // Call handleCheckboxChange when the heart icon is clicked
          style={{ cursor: 'pointer' }} // Change cursor to pointer when hovering over the heart icon
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
      </label>


</button>




    </div>
</div>
</div>
        )
        ))}
{/* challenge Ongoing */}
        {challengesData.map((challenge) => (
challenge.status === 'Ongoing' && (
<div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                    <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-green-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                    <div className="relative">



                    <div className="border w-30 border-sky-500/10 flex relative *:relative  *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-sky-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">

                    <svg  width="24" height="24" className="text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
</svg> 
<span className="ml-2 text-green-400">{challenge.status}</span>
</div>



                        <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                        <h1 className="text-gray-900 dark:text-gray-900">{challenge.title}</h1>
                        <p className="text-gray-500 dark:text-gray-500">{challenge.description}</p>

                        </div>

                        <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                        <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
            <span>View details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
        </a>
        <button onClick={() => handleRemoveFromFavorites(challenge._id)}>

<input
value="favorite-button"
name="favorite-checkbox"
id="favorite"
checked={isChecked}
onChange={handleCheckboxChange}
type="checkbox"
/>
<label className="containerfav" htmlFor="favorite">
<svg
  className="feather feather-heart"
  strokeLinejoin="round"
  strokeLinecap="round"
  strokeWidth="2"
  stroke="currentColor"
  fill="none"
  viewBox="0 0 24 24"
  height="24"
  width="24"
  xmlns="http://www.w3.org/2000/svg"
  onClick={handleCheckboxChange} // Call handleCheckboxChange when the heart icon is clicked
  style={{ cursor: 'pointer' }} // Change cursor to pointer when hovering over the heart icon
>
  <path
    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  ></path>
</svg>
</label>


</button>
                        </div>
                    </div>
                </div>

        )
        ))}
{/* challenge Completed */}
        {challengesData.map((challenge) => (
challenge.status === 'Completed' && (
<div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                    <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-yellow-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                    <div className="relative">


                    <div className="border w-30 border-sky-500/10 flex relative *:relative  *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-sky-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">

                    <svg className="w-6 h-6 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"/>
</svg>

<span className="ml-2 text-red-600">{challenge.status}</span>
</div>



                        <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                        <h1 className="text-gray-900 dark:text-gray-900">{challenge.title}</h1>
        <p className="text-gray-500 dark:text-gray-500">{challenge.description}</p>

                        </div>
                        <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                        <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                         <span>View details</span>
                         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                        </a>
                        <button onClick={() => handleRemoveFromFavorites(challenge._id)}>

<input
value="favorite-button"
name="favorite-checkbox"
id="favorite"
checked={isChecked}
onChange={handleCheckboxChange}
type="checkbox"
/>
<label className="containerfav" htmlFor="favorite">
<svg
  className="feather feather-heart"
  strokeLinejoin="round"
  strokeLinecap="round"
  strokeWidth="2"
  stroke="currentColor"
  fill="none"
  viewBox="0 0 24 24"
  height="24"
  width="24"
  xmlns="http://www.w3.org/2000/svg"
  onClick={handleCheckboxChange} // Call handleCheckboxChange when the heart icon is clicked
  style={{ cursor: 'pointer' }} // Change cursor to pointer when hovering over the heart icon
>
  <path
    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  ></path>
</svg>
</label>


</button>

                        </div>
                    </div>
                </div>

        )
        ))}
        </div>
        </div>
    </main>
    <Footer/>
    </>
  );
};

export default FavoriteChallenges;
