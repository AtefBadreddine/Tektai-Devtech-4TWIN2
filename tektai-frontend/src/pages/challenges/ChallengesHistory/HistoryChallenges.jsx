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
