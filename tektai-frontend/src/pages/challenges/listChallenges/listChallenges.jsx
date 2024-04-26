import React, { useState, useEffect } from "react";
import axios from 'axios';
import Challenges from "./challenge";
import { Link } from "react-router-dom";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import '../createChallenge/card.css'

function ListChallenges() {
    
    const [activeTab, setActiveTab] = useState('Ongoing');
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("color-theme", newTheme);
    };
    // Mock user role and login status
    const isLoggedIn = () => {
        const storedToken = localStorage.getItem('token');
        return !!storedToken;
    };
   
    return (
        <div className="ml-4 flex flex-col min-h-screen overflow-hidden">
            <Header />
            <main className="flex-grow container mx-auto space-y-12">
                <div className="pt-36">
                    <div className="px-4 md:px-8">
                        <h1 className="text-3xl font-bold text-left mb-6">Browse Challenges :</h1>
                    </div>
                </div>
                {/*search */}
                <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
                    <div className="relative shadow-sm sm:rounded-lg">
                        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
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
                            {/* Button to create challenge */}
                            {isLoggedIn() && user.role === "company" && (
                          <div className="flex items-center mb-4">
        <Link to="/challenges/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Challenge
        </Link>
    </div>
                                    )}


                            {/* Button to view history challenges */}
                            {isLoggedIn() && user.role  === "company" && (
                           <div className="flex items-center">
                           <Link to="/historychallenges" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                             <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
                               <path d="M12 8V12L14.5 14.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                               <path d="M5.60423 5.60423L5.0739 5.0739V5.0739L5.60423 5.60423ZM4.33785 6.87061L3.58786 6.87438C3.58992 7.28564 3.92281 7.61853 4.33408 7.6206L4.33785 6.87061ZM6.87963 7.63339C7.29384 7.63547 7.63131 7.30138 7.63339 6.88717C7.63547 6.47296 7.30138 6.13549 6.88717 6.13341L6.87963 7.63339ZM5.07505 4.32129C5.07296 3.90708 4.7355 3.57298 4.32129 3.57506C3.90708 3.57715 3.57298 3.91462 3.57507 4.32882L5.07505 4.32129ZM3.75 12C3.75 11.5858 3.41421 11.25 3 11.25C2.58579 11.25 2.25 11.5858 2.25 12H3.75ZM16.8755 20.4452C17.2341 20.2378 17.3566 19.779 17.1492 19.4204C16.9418 19.0619 16.483 18.9393 16.1245 19.1468L16.8755 20.4452ZM19.1468 16.1245C18.9393 16.483 19.0619 16.9418 19.4204 17.1492C19.779 17.3566 20.2378 17.2341 20.4452 16.8755L19.1468 16.1245ZM5.14033 5.07126C4.84598 5.36269 4.84361 5.83756 5.13505 6.13191C5.42648 6.42626 5.90134 6.42862 6.19569 6.13719L5.14033 5.07126ZM18.8623 5.13786C15.0421 1.31766 8.86882 1.27898 5.0739 5.0739L6.13456 6.13456C9.33366 2.93545 14.5572 2.95404 17.8017 6.19852L18.8623 5.13786ZM5.0739 5.0739L3.80752 6.34028L4.86818 7.40094L6.13456 6.13456L5.0739 5.0739ZM4.33408 7.6206L6.87963 7.63339L6.88717 6.13341L4.34162 6.12062L4.33408 7.6206ZM5.08784 6.86684L5.07505 4.32129L3.57507 4.32882L3.58786 6.87438L5.08784 6.86684ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM16.1245 19.1468C14.9118 19.8483 13.5039 20.25 12 20.25V21.75C13.7747 21.75 15.4407 21.2752 16.8755 20.4452L16.1245 19.1468ZM20.25 12C20.25 13.5039 19.8483 14.9118 19.1468 16.1245L20.4452 16.8755C21.2752 15.4407 21.75 13.7747 21.75 12H20.25ZM6.19569 6.13719C7.68707 4.66059 9.73646 3.75 12 3.75V2.25C9.32542 2.25 6.90113 3.32791 5.14033 5.07126L6.19569 6.13719Z" fill="#fff"/>
                             </svg>
                             <span className="ml-1">History Challenge</span>
                           </Link>
                         </div> )}
                         

                          
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div>
                    <div className="flex space-x-4 mb-4">
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Ongoing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('Ongoing')}
                        >
                            Ongoing
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('Completed')}
                        >
                            Completed
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('Upcoming')}
                        >
                            Upcoming
                        </button>
                    </div>

                    <div>
                   {activeTab === 'Ongoing' && <div><h1 className="text-xl font-bold my-4">Ongoing Challenges</h1> <Challenges status="Ongoing" /></div>}
                        {activeTab === 'Completed' && <div><h1 className="text-xl font-bold my-4">Completed Challenges</h1> <Challenges status="Completed" /></div>}
                        {activeTab === 'Upcoming' && <div><h1 className="text-xl font-bold my-4">Upcoming Challenges</h1> <Challenges status="Upcoming" /></div>}
                    </div>
                </div>

      


            </main> 
            <Footer/>
        </div>
    );
}

export default ListChallenges;

