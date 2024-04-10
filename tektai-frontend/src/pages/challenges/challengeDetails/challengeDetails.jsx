import React, { useEffect, useState } from "react";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Default image path
const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

function ChallengeDetails() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('');
  const [loadingCompany, setLoadingCompany] = useState(true);
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const [flashMessage, setFlashMessage] = useState(""); // State for flash message
  const [userData, setUserData] = useState({
    username: '',
    role: '',
  });

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
  useEffect(() => {
    const localStorageData = localStorage.getItem('user');


    if (localStorageData) {

     const parsedData = JSON.parse(localStorageData);

      setUserData(parsedData);

    } else {
      console.log('No user data found in local storage');
    }

    const fetchUserData = async () => {
     try {
       // Fetch user data from the backend
       const response = await axios.get('http://localhost:3000/users/profile'); // Adjust the endpoint as per your backend route
       const userData = response.data;
       setUserData(userData);
       setProfileImageUrl(`/uploads/${userData.image}`);
     } catch (error) {
       console.error('Error fetching user data:', error);
     }
   };

   fetchUserData();

  }, []);
  const handleDelete = async () => {
    try {
      if (challenge.status === 'Upcoming' || challenge.status === 'Completed') {
      await axios.delete(`http://localhost:3000/challenges/${id}`);
      setDeleted(true);
      window.location.href = '/historychallenges';
    } else {
      // Display a message indicating that the challenge cannot be deleted
      alert("You cannot delete an ongoing challenge.");
    }

    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  };
  const handleEditClick = () => {
    if (challenge.status !== 'Upcoming') {
      setFlashMessage("You cannot update a past challenge.");
    } else {
      // Redirect to the edit page
      window.location.href = `/challenge/setting/${id}`;
    }
  };
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
                        {userData?.role === 'company' && (
                          <div className="flex justify-end gap-4.5">
                          {flashMessage && <p className="text-red-500">{flashMessage}</p>}
                          <div>
        <button
          className="flex justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="button"
          onClick={handleEditClick}
        >
          Edit
        </button>
                          </div>
                            
                          <div>
                            {deleted ? (
                             <p>Deleted successfully!</p>
                             ) : (
                             <button 
                              className="flex justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                              onClick={handleDelete}>
                              Delete
                             </button>
                            )}
                          </div>
                          </div>
                        )}


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

<div className="">
<div class="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-600">
				<button type="button" class="pb-5 text-xs font-bold uppercase border-b-2 dark:border-violet-600">Latest</button>
				<button type="button" class="pb-5 text-xs font-bold uppercase border-b-2 dark:border- dark:text-gray-600">Popular</button>
			</div>
			<div class="flex flex-col divide-y dark:divide-gray-300">
				<div class="flex px-1 py-4">
					<img alt="" class="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500" src="https://source.unsplash.com/random/244x324"/>
					<div class="flex flex-col flex-grow">
						<a rel="noopener noreferrer" href="#" class="font-serif hover:underline">Aenean ac tristique lorem, ut mollis dui.</a>
						<p class="mt-auto text-xs dark:text-gray-600">5 minutes ago
							<a rel="noopener noreferrer" href="#" class="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline">Politics</a>
						</p>
					</div>
				</div>
				<div class="flex px-1 py-4">
					<img alt="" class="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500" src="https://source.unsplash.com/random/245x325"/>
					<div class="flex flex-col flex-grow">
						<a rel="noopener noreferrer" href="#" class="font-serif hover:underline">Nulla consectetur efficitur.</a>
						<p class="mt-auto text-xs dark:text-gray-600">14 minutes ago
							<a rel="noopener noreferrer" href="#" class="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline">Sports</a>
						</p>
					</div>
				</div>
				<div class="flex px-1 py-4">
					<img alt="" class="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500" src="https://source.unsplash.com/random/246x326"/>
					<div class="flex flex-col flex-grow">
						<a rel="noopener noreferrer" href="#" class="font-serif hover:underline">Vitae semper augue purus tincidunt libero.</a>
						<p class="mt-auto text-xs dark:text-gray-600">22 minutes ago
							<a rel="noopener noreferrer" href="#" class="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline">World</a>
						</p>
					</div>
				</div>
				<div class="flex px-1 py-4">
					<img alt="" class="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500" src="https://source.unsplash.com/random/247x327"/>
					<div class="flex flex-col flex-grow">
						<a rel="noopener noreferrer" href="#" class="font-serif hover:underline">Suspendisse potenti.</a>
						<p class="mt-auto text-xs dark:text-gray-600">37 minutes ago
							<a rel="noopener noreferrer" href="#" class="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline">Business</a>
						</p>
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