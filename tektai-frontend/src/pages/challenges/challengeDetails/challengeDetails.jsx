import React, { useEffect, useState } from "react";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import axios from 'axios';
import { useParams } from "react-router-dom";

// Default image path
const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

function ChallengeDetails() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('');
  const [loadingCompany, setLoadingCompany] = useState(true);
  const { id } = useParams();

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
    if (challenge && challenge.company_id) {
      const fetchCompany = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/users/getById/${challenge.company_id}`);
          setCompanyName(response.data.companyName); // Assuming companyName is the field name in the user collection
          setLoadingCompany(false);
        } catch (error) {
          console.error('Error fetching company:', error);
        }
      };
  
      fetchCompany();
    }
  }, [challenge]);

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
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow container mx-auto space-y-12">
        <div className="min-h-screen mt-32">
          <main className="container mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-2 rounded-lg shadow-xl p-6">
                  Loading...
                </div>
              ) : (
                challenge ? (
                  <div className="col-span-2 rounded-lg shadow-xl p-6">
                    <div className="flex items-center mb-4">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">{challenge.title}</h2>
                        <p className="text-gray-600 mb-2">Company: <span className="font-bold text-blue-600"> {loadingCompany ? 'Loading...' : companyName}</span></p>
                        <p className="text-gray-600 mb-2">Prize: <span className="font-bold text-blue-600">${challenge.prize}</span> </p>
                        <p className="text-gray-600 mb-2">Status: <span className="font-bold text-green-600">{challenge.status}</span></p>
                      </div>
                      <img src={imageSrc} alt={challenge.title} className="h-48 w-72 object-cover ml-auto rounded-lg" />
                    </div>
                    <h2 className="h4">Description :</h2>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    <h2 className="h4">Dataset Description:</h2>
                    <p className=" mb-4 mt-2 text-sm   text-gray-400 dark:text-white">The dataset for this competition (both train and test) was generated from a deep learning model trained on the Steel Plates Faults dataset from UCI. Feature distributions are close to, but not exactly the same, as the original. Feel free to use the original dataset as part of this competition, both to explore differences as well as to see whether incorporating the original in training improves model performance.</p>
            
                    <button class="download-button mb-5">
  <div class="docs"><svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="20" width="20" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line y2="13" x2="8" y1="13" x1="16"></line><line y2="17" x2="8" y1="17" x1="16"></line><polyline points="10 9 9 9 8 9"></polyline></svg> DataSet</div>
  <div class="download">
    <svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line y2="3" x2="12" y1="15" x1="12"></line></svg>
  </div>
</button>

<div className="ml-5">
<ol className="relative border-s mt-12 border-gray-700">
  <li className="mb-10 ms-4">
    <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-300 dark:bg-gray-700"></div>
    <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{formatDate(challenge.deadline)}</time>
    <h3 className="mt-4 text-base font-semibold text-gray-500">Entering Deadline</h3>
      <ul className=" mb-5 list-disc ml-5">
      <li ><p className="text-xs font-normal text-gray-400">Submit your entry before this date to participate in the competition.</p></li>
                            <li><p className="text-xs font-normal text-gray-400">Form your team before this date to compete together.</p></li>
                            <li><p className="text-xs font-normal text-gray-400">The competition concludes on this date. Submit your final work before the deadline.</p></li>
                          </ul>
                          {challenge && challenge.status === 'Completed' ? (
                            <button className="bg-[#6fc5ff] text-white font-bold py-2 px-4 rounded" disabled>
                              Completed
                             
                            </button>
                          ) : (
                            <button className="btn-smm" >
                              Participate now!
                              <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                              </svg>
                            </button>
                          )}
                        </li>
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-2 rounded-lg shadow-xl p-6">Oops, 404 not found</div>
                )
              )}

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

export default ChallengeDetails;