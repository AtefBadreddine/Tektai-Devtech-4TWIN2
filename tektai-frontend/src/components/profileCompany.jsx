import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import './profilecompany.css';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Challenges from '../pages/challenges/listChallenges/challenge';

function ProfileCompany() {
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
    <div>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
      <main className="profile-page">
        <Header />
        <div class="video-app">


  <div class="main-container">
   <div class="profile">
    <img src="https://images.unsplash.com/photo-1559543434-3e99643d333d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="" class="profile-cover" />
    <div class="profile-contact-info">
     <div class="profile-contact">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
       <path d="M10.69 95.16C80.96 154.66 204.26 259.36 240.5 292c4.87 4.4 10.08 6.65 15.5 6.65 5.4 0 10.62-2.22 15.47-6.6 36.27-32.68 159.57-137.4 229.84-196.9a10.66 10.66 0 001.5-14.72A42.36 42.36 0 00469.33 64H42.67A42.36 42.36 0 009.19 80.44a10.66 10.66 0 001.5 14.72z" />
       <path d="M505.81 127.4a10.62 10.62 0 00-11.37 1.55C416.5 195 317.05 279.69 285.76 307.89c-17.56 15.85-41.94 15.85-59.54-.03-33.36-30.05-145.04-125-208.66-178.91A10.67 10.67 0 000 137.08v268.25A42.7 42.7 0 0042.67 448h426.66A42.7 42.7 0 00512 405.33V137.08c0-4.15-2.42-7.93-6.19-9.67z" /></svg>

     </div>
     <div class="profile-contact">
      <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
       <path d="M453.3 85.3a69.3 69.3 0 11-138.6 0 69.3 69.3 0 01138.6 0zm0 0" />
       <path d="M384 170.7a85.4 85.4 0 11.2-170.9 85.4 85.4 0 01-.2 170.9zM384 32a53.4 53.4 0 10.1 106.8A53.4 53.4 0 00384 32zm0 0M453.3 426.7a69.3 69.3 0 11-138.6 0 69.3 69.3 0 01138.6 0zm0 0" />
       <path d="M384 512a85.4 85.4 0 11.2-170.8A85.4 85.4 0 01384 512zm0-138.7a53.4 53.4 0 10.1 106.8 53.4 53.4 0 00-.1-106.8zm0 0M154.7 256A69.3 69.3 0 1116 256a69.3 69.3 0 01138.7 0zm0 0" />
       <path d="M85.3 341.3a85.4 85.4 0 11.2-170.8 85.4 85.4 0 01-.2 170.8zm0-138.6a53.4 53.4 0 10.2 106.8 53.4 53.4 0 00-.2-106.8zm0 0" />
       <path d="M135.7 245.8a21.3 21.3 0 01-10.6-40L323.1 93a21.3 21.3 0 1121 37.1L146.3 243c-3.3 1.9-7 2.8-10.5 2.8zm0 0M333.6 421.8c-3.6 0-7.2-1-10.5-2.8L125 306a21.4 21.4 0 0121.2-37l198 112.8a21.4 21.4 0 01-10.7 39.9zm0 0" /></svg>
     </div>
     <div class="profile-contact">
      <svg viewBox="0 0 515.6 515.6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
       <path d="M496.7 212.2a64.4 64.4 0 11-91.2 91.1 64.4 64.4 0 0191.2-91M303.3 212.2a64.4 64.4 0 11-91 91.1 64.4 64.4 0 0191-91M110 212.2A64.4 64.4 0 1119 303.3a64.4 64.4 0 0191.1-91" /></svg>
     </div>
    </div>
    <div class="profile-info">
     <div class="profile-item">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469.33 469.33" fill="currentColor">
       <path d="M320 213.33c35.3 0 63.79-28.69 63.79-64 0-35.3-28.48-64-63.79-64-35.3 0-64 28.7-64 64 0 35.31 28.7 64 64 64zM149.33 213.33c35.31 0 63.79-28.69 63.79-64 0-35.3-28.48-64-63.79-64-35.3 0-64 28.7-64 64 0 35.31 28.7 64 64 64zM149.33 256C99.52 256 0 280.96 0 330.67V384h298.67v-53.33c0-49.71-99.52-74.67-149.34-74.67zM320 256c-6.19 0-13.12.43-20.59 1.17 24.75 17.82 41.92 41.82 41.92 73.5V384h128v-53.33c0-49.71-99.52-74.67-149.33-74.67z" /></svg>
       {userData?.bpts ?? 'Loading...'}
     </div>
     <div class="profile-item">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 469.33 469.33">
       <path d="M234.67 170.67c-35.31 0-64 28.69-64 64s28.69 64 64 64 64-28.7 64-64-28.7-64-64-64z" />
       <path d="M234.67 74.67C128 74.67 36.9 141 0 234.67c36.9 93.65 128 160 234.67 160 106.77 0 197.76-66.35 234.66-160-36.9-93.66-127.89-160-234.66-160zm0 266.66c-58.88 0-106.67-47.78-106.67-106.66S175.79 128 234.67 128s106.66 47.79 106.66 106.67-47.78 106.66-106.66 106.66z" /></svg>
       {userData?.gpts ?? 'Loading...'}
     </div>
     <div class="profile-item">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 475.43 475.43">
       <path d="M306.9 164.57l78.9-86.2a7.83 7.83 0 001.56-8.36 8.36 8.36 0 00-7.3-4.7h-253.4s-3.13 0-3.13.52v-9.4a26.12 26.12 0 0021.94-27.7A28.73 28.73 0 00117.26 0a29.78 29.78 0 00-29.78 28.73 30.82 30.82 0 0020.37 27.7v411.16a7.84 7.84 0 0015.68 0V263.84h256.52c3.2.2 6.17-1.7 7.31-4.7a8.36 8.36 0 00-1.56-8.36l-78.9-86.2z" /></svg>
       {userData?.spts ?? 'Loading...'}
     </div>
    
    </div>
    <div class="profile-menu">
     <div class="profile-avatar">
      <img class="profile-img shadow-xl " src={`http://localhost:3000/uploads/${userData?.image ?? '/fallback-image-url'}`}
 />
     <div class="profile-name">
  <div class="role">{userData?.role ?? 'Loading...'}:</div>
  <div class="company-name">{userData?.companyName ?? 'Loading...'} </div>
</div>

     </div>
    
 
    </div>
   </div>



 <div className="grid grid-cols-3 gap-6">
  <div className="cardprofile" style={{ gridColumn: 'span 2' }}>
    <h1>Bio</h1>
    <img className="shadow-xl" src={`http://localhost:3000/uploads/${userData?.image ?? '/fallback-image-url'}`} />
    <p className="bio">{userData?.bio ?? 'Loading...'} </p>

    




<ul class="example-2">
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
  <div className="cardprofile">
    <h1>Information</h1>
    <div class="containerprofile">
    <button class="btn">
  <span>Email</span>
  <div class="containerprofile">
    <div>{userData?.email ?? 'Loading...'}</div>
  </div>
</button>
<button class="btn">
  <span>Phone Number</span>
  <div class="containerprofile">
    <div>{userData?.phoneNumber ?? 'Loading...'}</div>
  </div>
</button>
<button class="btn">
  <span>Adresse</span>
  <div class="containerprofile">
    <div>{userData?.adresse ?? 'Loading...'}</div>
  </div>
</button>
    </div>
  </div>
</div>












<section id="statistic" class="statistic-section one-page-section">
    <div class="flex justify-center">
        <div class="flex flex-col items-center mr-8">
            <div class="counter">
                <h2 class="timer count-title count-number">{count ? count : '0'}
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

























{/* 



<div className="cardprofile" >
 
    <h1> Contact us</h1>
<form class="cf">
  <div class="half left cf">
    <input type="text" id="input-name" placeholder="Name"/>
    <input type="email" id="input-email" placeholder="Email address"/>
    <input type="text" id="input-subject" placeholder="Subject"/>
  </div>
  <div class="half right cf">
    <textarea name="message" type="text" id="input-message" placeholder="Message"></textarea>
  </div>
  <input type="submit" value="Submit" id="input-submit"/>
</form>    


</div> */}


   <div class="trends">
    <a href="#">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 50" fill="currentColor">
      <path d="M5.03 12h-5v38h56V12h-5zm31.999 20.262l-12.951 7.521a2.02 2.02 0 01-2.04.004 1.984 1.984 0 01-1.008-1.735V23.01c0-.724.377-1.372 1.008-1.735a2.047 2.047 0 012.04.003L37.029 28.8a1.983 1.983 0 011.001 1.731c0 .719-.374 1.366-1.001 1.731z" data-original="#000000" class="active-path" />
      <path d="M23.03 38.051v.004l12.994-7.524-12.951-7.525zM12.03 0h32v4h-32zM50.03 6h-44v4h44z" data-original="#000000" class="active-path" /></svg>
     See all challenges
    </a>
  






    
   </div>
   <Challenges></Challenges>



   <div class="load-more">
    <svg id="me" xmlns="http://w3.org/2000/svg" viewBox="0 0 341.333 341.333" fill="currentColor">
     <path d="M341.227 149.333V0l-50.133 50.133C260.267 19.2 217.707 0 170.56 0 76.267 0 .107 76.373.107 170.667s76.16 170.667 170.453 170.667c79.467 0 146.027-54.4 164.907-128h-44.373c-17.6 49.707-64.747 85.333-120.533 85.333-70.72 0-128-57.28-128-128s57.28-128 128-128c35.307 0 66.987 14.72 90.133 37.867l-68.8 68.8h149.333z" />
    </svg>
    Load More
   </div>




































   
  </div>
  </div>

        <Footer />
      </main>
    </div>
  );
}

export default ProfileCompany;
