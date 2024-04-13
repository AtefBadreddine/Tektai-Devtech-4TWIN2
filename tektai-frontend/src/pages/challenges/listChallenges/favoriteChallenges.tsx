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
              const response = await axios.get(`http://localhost:3000/users/${userId}/favorites`);
              console.log('user id: ' + userId);
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
            const response = await axios.get(`http://localhost:3000/challenges/${challengeId}`);
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
            await axios.delete(`http://localhost:3000/users/${userId}/favorites/remove/${challengeId}`);
            console.log('Challenge with ID deleted:', challengeId);
            // Refresh favorite challenges
            const response = await axios.get(`http://localhost:3000/users/${userId}/favorites`);
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
                <p className="mt-6 text-gray-700 dark:text-gray-300">Harum quae dolore inventore repudiandae? orrupti aut temporibus ariatur.</p>
            </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* challenge upcoming */}
        {challengesData.map((challenge) => (
challenge.status === 'Upcoming' && (
<div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
<div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-sky-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
<div className="relative">
    <div className="border border-sky-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-sky-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
    <svg width="1em" height="1em" viewBox="0 0 128 128" className="text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
</svg>


    </div>

    <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
        <h1 className="text-gray-900 dark:text-gray-900">{challenge.title}</h1>
        <p className="text-gray-500 dark:text-gray-500">{challenge.description}</p>
        <p className="text-gray-500 dark:text-gray-500">{challenge.status}</p>

    </div>
    <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
    <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
            <span>View details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
        </a>
        
        <button onClick={() => handleRemoveFromFavorites(challenge._id)}>
        <svg className="size-5" fill="red" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
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
                        <div className="border border-green-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-green-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                        <svg width="0.73em" height="1em" className="text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
</svg>                        </div>

                        <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                        <h1 className="text-gray-900 dark:text-gray-900">{challenge.title}</h1>
                        <p className="text-gray-500 dark:text-gray-500">{challenge.description}</p>
                        <p className="text-gray-500 dark:text-gray-500">{challenge.status}</p>

                        </div>

                        <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                        <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
            <span>View details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
        </a>
        <button onClick={() => handleRemoveFromFavorites(challenge._id)}>
        <svg className="size-5" fill="red" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 24 24"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
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
                        <div className="border border-yellow-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-yellow-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                        <svg className="w-6 h-6 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
</svg>


                    </div>

                        <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                        <h1 className="text-gray-900 dark:text-gray-900">{challenge.title}</h1>
        <p className="text-gray-500 dark:text-gray-500">{challenge.description}</p>
        <p className="text-gray-500 dark:text-gray-500">{challenge.status}</p>

                        </div>
                        <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                        <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                         <span>View details</span>
                         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                        </a>

        <button onClick={() => handleRemoveFromFavorites(challenge._id)}>
        <svg className="size-5" width="1em" height="1em" fill="red" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 24 24"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
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
