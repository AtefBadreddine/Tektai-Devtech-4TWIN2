import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import HeroHome from "../../home/partials/HeroHome";
import FeaturesHome from "../../home/partials/Features";
import FeaturesBlocks from "../../home/partials/FeaturesBlocks";
import Testimonials from "../../home/partials/Testimonials";
import Newsletter from "../../home/partials/Newsletter";
import React from "react";
import ChallengeDetails from "../challengeDetails/challengeDetails";


function listChallenges() {
        return (

                <div className="flex flex-col min-h-screen overflow-hidden">
                    <Header/>
                    <main className="flex-grow container mx-auto space-y-12">
                        <div className="pt-36">
                            <div className=" px-4 md:px-8">
                                <h1 className="text-3xl font-bold text-left mb-6">Browse Challenges :</h1>
                                <p className="text-gray-500 dark:text-gray-400 mb-1.5">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">Deliver great service experiences fast - without the complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes with ease, with a complete audit trail for every change.</p>
                            </div>

                        </div>



                            <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full ">
                                <div className="relative  shadow-sm  sm:rounded-lg">
                                    <div
                                        className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                                        <div className="w-full md:w-1/2">
                                            <form className="flex items-center">
                                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                                <div className="relative w-full">
                                                    <div
                                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg aria-hidden="true"
                                                             className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                             fill="currentColor" viewBox="0 0 20 20"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd"
                                                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                    </div>
                                                    <input type="text" id="simple-search"
                                                           className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                                                           placeholder="Search" required=""/>
                                                </div>
                                            </form>
                                        </div>
                                        <div
                                            className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                                            <div className="flex items-center w-full space-x-3 md:w-auto">
                                                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown"
                                                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                        type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                                         className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 20 20"
                                                         fill="currentColor">
                                                        <path fillRule="evenodd"
                                                              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    Filter
                                                    <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor"
                                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                                         aria-hidden="true">
                                                        <path clipRule="evenodd" fillRule="evenodd"
                                                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                                                    </svg>
                                                </button>

                                                <div id="filterDropdown"
                                                     className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow">
                                                    <h6 className="mb-3 text-sm font-medium text-gray-900">
                                                        Category
                                                    </h6>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

                            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <a href="#">
                                    <img src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                         alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                                    <div className="px-4 py-3 w-72">
                                        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                        <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                                            <del>
                                                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                            </del>
                                            <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                      fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg></div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <a href="#">
                                    <img src="https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                         alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                                    <div className="px-4 py-3 w-72">
                                        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                        <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                                            <del>
                                                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                            </del>
                                            <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                      fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg></div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <a href="#">
                                    <img src="https://images.unsplash.com/photo-1651950537598-373e4358d320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                         alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                                    <div className="px-4 py-3 w-72">
                                        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                        <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                                            <del>
                                                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                            </del>
                                            <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                      fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg></div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <a href="#">
                                    <img src="https://images.unsplash.com/photo-1651950540805-b7c71869e689?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                         alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                                    <div className="px-4 py-3 w-72">
                                        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                        <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                                            <del>
                                                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                            </del>
                                            <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                      fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg></div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <a href="#">
                                    <img src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                         alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                                    <div className="px-4 py-3 w-72">
                                        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                        <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                                            <del>
                                                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                            </del>
                                            <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                          fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg></div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <a href="#">
                                    <img src="https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                         alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                                    <div className="px-4 py-3 w-72">
                                        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                        <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                                            <del>
                                                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                            </del>
                                            <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                          fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg></div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <a href="#">
                                    <img src="https://images.unsplash.com/photo-1651950537598-373e4358d320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                         alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                                    <div className="px-4 py-3 w-72">
                                        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                        <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                                            <del>
                                                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                            </del>
                                            <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                          fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg></div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <a href="#">
                                    <img src="https://images.unsplash.com/photo-1651950540805-b7c71869e689?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                         alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                                    <div className="px-4 py-3 w-72">
                                        <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                        <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                                            <del>
                                                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                            </del>
                                            <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                          fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg></div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </section>
                        <div className="mx-auto max-w-screen-2xl py-12 px-4 md:px-8">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">

                                <a href="#"
                                   className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                                    <img
                                        src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600"
                                        loading="lazy" alt="Photo by Minh Pham"
                                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"/>

                                    <div
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                    </div>

                                    <span
                                        className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">VR</span>
                                </a>

                                <a href="#"
                                   className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                                    <img
                                        src="https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=1000"
                                        loading="lazy" alt="Photo by Magicle"
                                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"/>

                                    <div
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                    </div>

                                    <span
                                        className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Tech</span>
                                </a>

                                <a href="#"
                                   className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                                    <img
                                        src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000"
                                        loading="lazy" alt="Photo by Martin Sanchez"
                                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"/>

                                    <div
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                    </div>

                                    <span
                                        className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Dev</span>
                                </a>

                                <a href="#"
                                   className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                                    <img
                                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
                                        loading="lazy" alt="Photo by Lorenzo Herrera"
                                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"/>

                                    <div
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                    </div>

                                    <span
                                        className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Retro</span>
                                </a>

                            </div>
                        </div>

                    </main>

                <Footer/>
                </div>

        )
}

export default listChallenges;