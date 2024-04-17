import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import axios from 'axios'; // Import Axios
import './profilecompany.css';
import Stats from './stats/stats';
import Footer from '../layout/Footer';

function CompanyProfile() {
const [userData, setUserData] = useState(null);
    const [count, setCount] = useState(0);
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const id = user ? user._id : '';
    const [completedChallengesCount, setCompletedChallengesCount] = useState('');
    const [upcomingChallengesCount, setUpcomingChallengesCount] = useState('');
    const [ongoingChallengesCount, setOngoingChallengesCount] = useState('');

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/profile/${id}`);
        const userData = response.data;
        setUserData(userData);
        console.log('User data:', userData);
        console.log('Image path:', `http://localhost:3000/uploads/${userData.image}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (id) {
      fetchUserData();
    } else {
      console.log('No user ID found');
    }
  }, [id]);



  useEffect(() => {
    const fetchChallengeCounts = async () => {
      try {
        const path = `http://localhost:3000/challenges/count/${id}`;
        console.log('Request Path:', path); // Log the request path
        const response = await axios.get(path);
        const count = response.data;
        console.log('Counts:', count); // Log the entire response data
        setCount(count); // Update count with fetched data
      } catch (error) {
        console.error('Error fetching challenge counts:', error);
      }
    };
  
    fetchChallengeCounts();
  }, [id]);



  useEffect(() => {
    const fetchcompletedCounts = async () => {
      try {
        const path = `http://localhost:3000/challenges/completed/${id}`;
        console.log('Request Path:', path); // Log the request path
        const response = await axios.get(path);
        const completedChallengesCount = response.data;
    
        console.log('Counts:', completedChallengesCount); // Log the entire response data
        setCompletedChallengesCount(completedChallengesCount); // Update count with fetched data
      } catch (error) {
        console.error('Error fetching challenge counts:', error);
      }
    };
  
    fetchcompletedCounts();
  }, [id]);





  useEffect(() => {
    const fetchongoingCounts = async () => {
      try {
        const path = `http://localhost:3000/challenges/ongoing/${id}`;
        console.log('Request Path:', path); // Log the request path
        const response = await axios.get(path);
        const ongoingChallengesCount = response.data;
        console.log('Counts:', ongoingChallengesCount); // Log the entire response data
        setOngoingChallengesCount(ongoingChallengesCount); // Update count with fetched data
      } catch (error) {
        console.error('Error fetching challenge counts:', error);
      }
    };
  
    fetchongoingCounts();
  }, [id]);




 
  useEffect(() => {
    const fetchupcomingCounts = async () => {
      try {
        const path = `http://localhost:3000/challenges/upcoming/${id}`;
        console.log('Request Path:', path); // Log the request path
        const response = await axios.get(path);
        const upcomingChallengesCount = response.data;
        console.log('Counts:', upcomingChallengesCount); // Log the entire response data
        setUpcomingChallengesCount(upcomingChallengesCount); // Update count with fetched data
      } catch (error) {
        console.error('Error fetching challenge counts:', error);
      }
    };
  
    fetchupcomingCounts();
  }, [id]);

  
  return (
    <>
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />

    <main className="profile-page">
    <Header />
      <section className="relative block h-500-px">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('https://cdn.ihsmarkit.com/www/images/0821/Company-178447404.jpg')" }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">

            {/* section 1 */}
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl  -mt-64">
  <div className="px-6">
    <div className="cardprofile relative">
      <button className="buttoncontact absolute top-0 right-0 mt-4 mr-4"> 
        <span className="label">See All Challenges</span>
      </button>
      <img className="shadow-xl border  border-gray-300" src={`http://localhost:3000/uploads/${user?.image ?? '/fallback-image-url'}`} />
      <h2 class="titlecompany pt-5">{user?.companyName ?? 'Loading...'} .</h2>
        <div className="containerprofiles">
          <p className="text-gray-600 pr-20 text-m">Headquarters </p>
          <span className="text-gray-600 font-bold text-m">{user?.adresse ?? 'Loading...'}</span>
        </div>
        <div className="containerprofiles">
          <p className="text-gray-700 pr-20 text-m">Company Size </p>
          <span className="text-gray-700 font-bold text-m">100+ employees</span>
        </div>
      
  
    </div>
  </div>
  <div class="example-2-container">
  <p class="socials-title font-bold ">Socials</p>
<ul class="example-2 pb-5">
  <li class="icon-content">
    <a
      href="https://www.spotify.com/"
      aria-label="Spotify"
      data-social="spotify"
    >
      <div class="filled"></div>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>    </a>
    <div class="tooltip">Facebook</div>
  </li>
  <li class="icon-content">
    <a
      href="https://www.pinterest.com/"
      aria-label="Pinterest"
      data-social="pinterest"
    >
      <div class="filled"></div>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg> 
    </a>
    <div class="tooltip">LinkedIn</div>
  </li>
  <li class="icon-content">
    <a
      href="https://dribbble.com/"
      aria-label="Dribbble"
      data-social="dribbble"
    >
      <div class="filled"></div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
    </a>
    <div class="tooltip">Github</div>
  </li>
  <li class="icon-content">
    <a
      href="https://telegram.org/"
      aria-label="Telegram"
      data-social="telegram"
    >
      <div class="filled"></div>
      <svg viewBox="0 0 16 16" fill="currentColor" class="socialSvg twitterSvg"> <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path> </svg>  
         </a>
    <div class="tooltip">Twitter</div>
  </li>
</ul>
</div>


</div>

            {/* section 2 */}
            
 <div className="grid grid-cols-3 gap-6">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl  "style={{ gridColumn: 'span 2' }} >
            <div className="px-6">

<div className="cardprofile" >
  <h3 className="font-bold text-gray-900">About us</h3>
    <p className="bio text-gray-600">{user?.bio ?? 'Loading...'} </p>

<h3 className="font-bold text-gray-900">Specialities</h3>
<p className="bio text-gray-600">search, ads, mobile, androind, machine learning, apps </p>
</div> </div>

<section id="statistic" class="statistic-section one-page-section ">
    
    <div class="flex justify-center">
        <div class="flex flex-col items-center mr-8">
            <div class="counter">
                <h2 class="timer count-title count-number">{count? count:0}
</h2>
                <div class="stats-line-black"></div>
                <p class="stats-text">All challenges</p>
            </div>
        </div>
        <div class="flex flex-col items-center mr-8">
            <div class="counter">
                <h2 class="timer count-title count-number">{ongoingChallengesCount? ongoingChallengesCount:0}</h2>
                <div class="stats-line-black"></div>
                <p class="stats-text">Ongoing</p>
            </div>     
        </div>
        <div class="flex flex-col items-center mr-8">
            <div class="counter">
                <h2 class="timer count-title count-number">{completedChallengesCount? completedChallengesCount:0}</h2>
                <div class="stats-line-black"></div>
                <p class="stats-text">Completed</p>
            </div>
        </div>
        <div class="flex flex-col items-center">
            <div class="counter">
                <h2 class="timer count-title count-number">{upcomingChallengesCount? upcomingChallengesCount:0}</h2>
                <div class="stats-line-black"></div>
                <p class="stats-text">Upcoming</p>
            </div>
        </div>
    </div>
</section>





 </div>
            










<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl  ">
            <div className="px-6">

 
<Stats  ></Stats>

                </div>
              </div>
            
    
    </div>













            </div>
      </section>

    </main>

    <Footer></Footer>

    </>
  );
}
export default CompanyProfile;
