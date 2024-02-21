import Header from "../../../layout/Header";
import React, {useEffect, useState} from "react";
import Footer from "../../../layout/Footer";
import challengesData from '../challenges.json';
import {useParams} from "react-router-dom";

function challengeDetails() {
    const [challenge, setChallenge] = useState(null);
    let { id  } = useParams();
    const randomDescription = `
    The sinking of the Titanic is one of the most infamous shipwrecks in history. On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg.

    In this challenge, we ask you to build a predictive model that answers the question: “what sorts of people were more likely to survive?” using passenger data (i.e., name, age, gender, socio-economic class, etc).
  `;
    id = parseInt(id, 10);
    useEffect(() => {

        if ( !isNaN(id) && id >0 && id <= challengesData.length) {
          setChallenge(Object.values(challengesData).find( challenge => challenge.id === id));
        }

        }, []);


    return (

        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header/>
            <main className="flex-grow container mx-auto space-y-12">
                <div className=" min-h-screen mt-32">
                    <main className="container mx-auto py-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {
                                challenge ?   <div className="col-span-2 rounded-lg shadow-xl p-6">
                                        <div className="flex items-center mb-4">
                                            <div>
                                                <h2 className="text-xl font-semibold mb-2">{challenge.name}</h2>
                                                <p className="text-gray-600 mb-2">Hosted by: <span className="font-bold text-blue-600"> {challenge.host}</span></p>
                                                <p className="text-gray-600 mb-2">Prize: <span className="font-bold text-blue-600">${challenge.price}</span> </p>
                                                <p className="text-gray-600 mb-2">Status: <span className="font-bold text-green-600">{challenge.status}</span></p>
                                            </div>
                                            <img src={challenge.image} alt={challenge.name} className="h-48 w-72 object-cover ml-auto rounded-lg" />

                                        </div>
                                        <h2 className="h4">Description :</h2>
                                        <p className="text-gray-600 mb-4">{randomDescription}</p>

                                        <ol className="relative border-s mt-12 border-gray-700">
                                            <li className="mb-10 ms-4">
                                                <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-300 dark:bg-gray-700"></div>
                                                <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">March 2024</time>
                                                <h3 className="text-lg font-semibold text-gray-100">Entering Deadline</h3>
                                                <p className="mb-4 text-base font-normal text-gray-400">Submit your entry before this date to participate in the competition.</p>
                                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-100 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-blue-300 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                    Learn more
                                                    <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li className="mb-10 ms-4">
                                                <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-300 dark:bg-gray-700"></div>
                                                <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">April 2024</time>
                                                <h3 className="text-lg font-semibold text-gray-100">Team Creation Deadline</h3>
                                                <p className="text-base font-normal text-gray-400">Form your team before this date to compete together.</p>
                                            </li>
                                            <li className="ms-4">
                                                <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-300 dark:bg-gray-700"></div>
                                                <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">May 2024</time>
                                                <h3 className="text-lg font-semibold text-gray-100">Competition End</h3>
                                                <p className="text-base font-normal text-gray-400">The competition concludes on this date. Submit your final work before the deadline.</p>
                                            </li>
                                        </ol>

                                    </div>
                                    : <div className="col-span-2 rounded-lg shadow-xl p-6">Oops , 404 not found</div>
                            }


<div className="flex flex-wrap gap-8">
    <div className="flex-1">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000"
                alt="TektAI Competition"
                className="w-full h-auto object-cover"
            />
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">How to Submit your Prediction to TektAI</h2>
                <p className="text-gray-600 mb-4">Once you’re ready to make a submission and get on the leaderboard:</p>
                <ol className="list-decimal list-inside text-gray-600">
                    <li>Click on the “Submit Predictions” button</li>
                    <li>Upload a CSV file in the submission file format. You’re able to submit 10 submissions a day.</li>
                </ol>
            </div>
        </div>
    </div>
    <div className="flex-1">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
                alt="TektAI Competition"
                className="w-full h-auto object-cover"
            />
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">Recommended Tutorial</h2>
                <p className="text-gray-600 mb-4">We highly recommend Alexis Cook’s Titanic Tutorial that walks you through making your very first submission step by step and this starter notebook to get started.</p>
                <a href="#" className="text-blue-600 hover:underline">Read more</a>
            </div>
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

export default challengeDetails;