import React, { useEffect, useState } from "react";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import axios from 'axios';
import { Link } from "react-router-dom";

function HistoryChallenges() {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    
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
                const response = await axios.get(`http://localhost:3000/challenges/company/${user._id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                  });
                                  setChallenges(response.data.reverse()); // Reverse the challenges array
                setLoading(false);
            } catch (error) {
                console.error('Error fetching challenges:', error);
                setLoading(false); // Ensure loading state is updated even in case of error
            }
        };

        fetchChallenges();
    }, []);

    useEffect(() => {
        function handleViewport() {
            const items = document.querySelectorAll(".timeline li");

            function isElementInViewport(el) {
                var rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }

            for (var i = 0; i < items.length; i++) {
                if (isElementInViewport(items[i])) {
                    if (!items[i].classList.contains("in-view")) {
                        items[i].classList.add("in-view");
                    }
                } else if (items[i].classList.contains("in-view")) {
                    items[i].classList.remove("in-view");
                }
            }
        }

        // Call handleViewport on load and scroll
        handleViewport();
        window.addEventListener("scroll", handleViewport);
        return () => {
            window.removeEventListener("scroll", handleViewport);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

  
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            <div className="pt-36">
                <div className="px-4 md:px-8">
                    <h1 className="text-3xl font-bold text-left mb-6"> Challenges History :</h1>
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true"
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search"
                                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                                    placeholder="Search" required="" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        <main className="flex-grow container mx-auto space-y-12">
        <div className=" mx-auto px-6 max-w-6xl text-gray-500">
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">

        {challenges.length === 0 ? (
        <h1 className="text-xl p-30">No challenges yet go play some </h1>
        ) : (
        <>
{/* challenge upcoming */}
        {challenges.map((challenge) => {
             const startDate = new Date(challenge.start_date);
             const formattedStartDate = `${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'short' })}`;
             // Add year if the year is different from the current year
             const displayStartDate = startDate.getFullYear() === currentYear ? formattedStartDate : `${formattedStartDate} ${startDate.getFullYear()}`;
return (
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
        <p className="text-blue-400 dark:text-gray-500">{challenge.status}</p>
        <p className="text-blue-600 dark:text-gray-500">Start Date: {displayStartDate}</p>
    </div>
    <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
        <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
            <span>View details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
        </a>
       
    </div>
</div>
</div>
        )
    );
})}
{/* challenge Ongoing */}
        {challenges.map((challenge) => (
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
                 
                        </div>
                    </div>
                </div>

        )
        ))}
{/* challenge Completed */}
        {challenges.map((challenge) => (
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
                 
                        </div>
                    </div>
                </div>

        )
        ))}
        </>
    )}
        </div>
        </div>
    </main>
            
            <main className="flex-grow container mx-auto space-y-12">
                <section className="timeline">
                <ul>
  {challenges.length === 0 ? (
    <h1 className="text-xl p-30">No challenges yet go play some </h1>
  ) : (
    challenges.map(challenge => {
      const startDate = new Date(challenge.start_date);
      const formattedStartDate = `${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'short' })}`;

      // Add year if the year is different from the current year
      const displayStartDate = startDate.getFullYear() === currentYear ? formattedStartDate : `${formattedStartDate} ${startDate.getFullYear()}`;

      return (
        <li key={challenge._id}>
          <div>
            <time>{displayStartDate}</time>
            <div className="discovery">
              <h1 className="text-xl font-semibold mb-2">{truncateText(challenge.title, 15)}</h1>
              <span className="text-gray-600 text-sm mb-2">Description: {truncateText(challenge.description, 20)}</span>
              <Link to={`/challenges/${challenge._id}`} className="menu__link text-sm">View Details</Link>
            </div>
          </div>
        </li>
      );
    })
  )}
</ul>

                </section>
            </main>
            <Footer />
        </div>
    );
}

export default HistoryChallenges;
