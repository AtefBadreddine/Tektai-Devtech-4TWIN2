import React, { useState, useEffect } from "react";
import axios from 'axios';
import Challenges from "./challenge";
import { Link } from "react-router-dom";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import '../createChallenge/card.css'

function listChallengesH() {
    
    const [activeTab, setActiveTab] = useState('Ongoing');
    
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
    const userRole = "company"; // Assume user role is "company"
    const isLoggedIn = () => {
        const storedToken = localStorage.getItem('token');
        return !!storedToken;
    };
   
    return (
        <div className="ml-4 flex flex-col min-h-screen overflow-hidden">
            {/* <Header /> */}
            {/* <div className="bg-dark_purple flex max-w-5xl mx-auto gap-8 group">
                <div className="bg-white/10 group-hover:blur-sm hover:!blur-none | cursor-pointer p-8 rounded-xl mix-blend-luminosity">
                    <img src="../../../../public/default-profile-picture.png" alt="company profile image here" className="h-20 mx-auto"/>
                    <h4 className="uppercase text-xl font-bold"> company name</h4>
                    <p className="text-sm leading-7 my-3 font-light opacity-50">desc</p>
                    <button>Participate</button>
                </div>

                <div className="bg-white/10 group-hover:blur-sm hover:!blur-none | cursor-pointer p-8 rounded-xl mix-blend-luminosity">
                    <img src="../../../../public/default-profile-picture.png" alt="company profile image here" className="h-20 mx-auto"/>
                    <h4 className="uppercase text-xl font-bold"> company name</h4>
                    <p className="text-sm leading-7 my-3 font-light opacity-50">desc</p>
                    <button>Participate</button>
                </div>

                <div className="bg-white/10 group-hover:blur-sm hover:!blur-none | cursor-pointer p-8 rounded-xl mix-blend-luminosity">
                    <img src="../../../../public/default-profile-picture.png" alt="company profile image here" className="h-20 mx-auto"/>
                    <h4 className="uppercase text-xl font-bold"> company name</h4>
                    <p className="text-sm leading-7 my-3 font-light opacity-50">desc</p>
                    <button>Participate</button>
                </div>
            </div> */}

            <main className="flex-grow container mx-auto space-y-12">
                {/* <div className="pt-36">
                    <div className="px-4 md:px-8">
                        <h1 className="text-3xl font-bold text-left mb-6">Browse Challenges :</h1>
                    </div>
                </div> */}
                {/*search */}
                <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
                    <div className="relative shadow-sm sm:rounded-lg">
                        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                           
                            {/* Button to create challenge */}
                            
                          
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div>
                    {/* <div className="flex space-x-4 mb-4">
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
                    </div> */}

                    <div>
                   {activeTab === 'Ongoing' && <div><h1 className="text-xl font-bold my-4">Popular Challenges</h1> <Challenges status="Ongoing" /></div>}
                        {activeTab === 'Completed' && <div><h1 className="text-xl font-bold my-4">Completed Challenges</h1> <Challenges status="Completed" /></div>}
                        {activeTab === 'Upcoming' && <div><h1 className="text-xl font-bold my-4">Upcoming Challenges</h1> <Challenges status="Upcoming" /></div>}
                    </div>
                </div>

      

                <div className="mx-auto max-w-screen-2xl py-12 px-4 md:px-8">
                    
                    {/* Render other content here */}
                </div>

            </main> 
            {/* <Footer/> */}
        </div>
    );
}

export default listChallengesH;



{/* <article class="mb-4 p-6 rounded-xl bg-white bg-slate-300 flex flex-col bg-clip-border">
        <div class="flex pb-6 items-center justify-between">
          <div class="flex">
            <a class="inline-block mr-4" href="#">
              <img class="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/men/35.jpg" />
            </a>
            <div class="flex flex-col">
              <div>
                <a class="inline-block text-lg font-bold dark:text-white" href="#">Wade Warren</a>
              </div>
              <div class="text-slate-500 dark:text-slate-300 dark:text-slate-400">
                July 17, 2018
              </div>
            </div>
          </div>
        </div>
        <h2 class="text-3xl font-extrabold dark:text-white">
          Web Design templates Selection
        </h2>
        
        <p class="dark:text-slate-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div class="py-4">
          <a class="inline-flex items-center" href="#">
            <span class="mr-2">
              <svg class="fill-rose-600 dark:fill-rose-400" style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
                <path
                  d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                </path>
              </svg>
            </span>
            <span class="text-lg font-bold">34</span>
          </a>
        </div>
        <div class="relative">
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
        </div>



        <div class="pt-6">
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
        </div>
      </article> */}