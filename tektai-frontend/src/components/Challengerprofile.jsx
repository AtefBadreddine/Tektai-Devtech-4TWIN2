import React, { useEffect, useState  } from 'react';
import axios from 'axios'; // Import Axios
import './profilecompany.css';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Challenges from '../pages/challenges/listChallenges/challenge';
import { faCrown, faMedal, faFireAlt, faBrain, faSeedling } from '@fortawesome/free-solid-svg-icons'; // Import icons from Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


function Challengerprofile() {
    const [userData, setUserData] = useState(null);
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const id = user ? user._id : '';
    const [completedChallengesCount, setCompletedChallengesCount] = useState('');
    const [upcomingChallengesCount, setUpcomingChallengesCount] = useState('');
    const [ongoingChallengesCount, setOngoingChallengesCount] = useState('');
    const [count, setCount] = useState(0);
    function BadgeDescriptions2() {
      return (
        <div className="flex flex-wrap justify-center mb-2">
          <BadgeIcon icon={faMedal} color="text-yellow-500" label="Gold Badge (+3 points)" />
          <BadgeIcon icon={faMedal} color="text-gray-300" label="Silver Badge (+2 points)" />
          <BadgeIcon icon={faMedal} color="text-orange-500" label="Bronze Badge (+1 point)" />
        </div>
      );
    }
    
    function BadgeIcon({ icon, color, label }) {
      return (
        <div className="flex items-center mr-4">
          <FontAwesomeIcon icon={icon} className={`${color} mr-1`} style={{ fontSize: '1.5rem' }} />
          <span className="text-500 font-custom mr-1">{label}</span>
        </div>
      );
    }
/* 
     // Use useEffect to animate count when count state changes
     useEffect(() => {
        const countingElements = document.querySelectorAll('.counter');
      
        countingElements.forEach(element => {
          const countTo = parseInt(element.getAttribute('count-number'), 10);
          const duration = 3000;
          const step = Math.max(Math.floor(duration / countTo), 1);
          let currentCount = 0;
      
          const intervalId = setInterval(() => {
            currentCount += step;
            element.textContent = currentCount >= countTo ? countTo : currentCount;
            if (currentCount >= countTo) clearInterval(intervalId);
          }, step);
        });
      }, [count, completedChallengesCount, upcomingChallengesCount, ongoingChallengesCount]);
      

 */
  
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
        <div class="">
        <section className="relative bg-blueGray-100">


  <div class="main-container">
   <div class="profile">
    <img src="https://bairesdev.mo.cloudinary.net/blog/2023/09/How-Many-Web-Developers-in-the-World-1.jpg?tx=w_1920,q_auto" alt="" class="profile-cover" />
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
     <FontAwesomeIcon icon={faMedal} className="text-orange-500 mr-1" />
 {user?.bpts ?? 'Loading...'}
     </div>
     <div class="profile-item">
     <FontAwesomeIcon icon={faMedal} className="text-yellow-500 mr-1" />
       {user?.gpts ?? 'Loading...'}
     </div>
     <div class="profile-item">
     <FontAwesomeIcon icon={faMedal} className="text-gray-300 mr-1" />
 {user?.spts ?? 'Loading...'}
     </div>
    
    </div>
    <div class="profile-menu">
     <div class="profile-avatar">
           <img class="profile-img shadow-xl " src={userData?.image ? `http://localhost:3000/uploads/${userData.image}` : '/default-profile-picture.png'}/>
  <div class="role">{user?.role ?? 'Loading...'}:</div>
      <div class="profile-name">{user?.username ?? 'Loading...'}</div>
     </div>
   
     <div class="follow-buttons">
     <Link to="/MyTeams">
      <button class="follow follow-option">Manage Teams</button>
      </Link>
     </div>
    </div>
   </div>



 <div className="grid grid-cols-3 gap-6">

<div className="cardprofilechallenger shadow-md" style={{ gridColumn: 'span 2'}}>
    <h2 className='Challengertitle'> Bio </h2>
    <p className="bio">{user?.bio ?? 'Loading...'} </p>
<div className='example-2-container'>
  <div className="cardsocial" >
    <a className="socialContainer containerOne" href="#">
      <svg viewBox="0 0 16 16" className="socialSvg instagramSvg">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
      </svg>
    </a>

    <a className="socialContainer containerTwo" href="#">
      <svg viewBox="0 0 16 16" className="socialSvg twitterSvg">
        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
      </svg>
    </a>

    <a className="socialContainer containerThree" href="#">
      <svg viewBox="0 0 448 512" className="socialSvg linkdinSvg">
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
      </svg>
    </a>

    <a className="socialContainer containerFour" href="#">
      <svg viewBox="0 0 16 16" className="socialSvg whatsappSvg">
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
      </svg>
    </a>
  </div>
  </div>











  </div>
  <div className="cardprofilechallenger shadow-md">
    <h2 className='Challengertitle '>   Information </h2>

  <div class="profile-itemcolor">
  <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7.005 9C7.005 8.45 7.45 8 8 8H16C16.55 8 17 8.45 17 9V15C17 15.55 16.55 16 16 16H8C7.45 16 7 15.55 7 15L7.005 9ZM12 12.5L8.00001 9.99997V15H16V9.99997L12 12.5ZM12 11.5L8.00001 9.00001H16L12 11.5Z" fill="#000000"/>
</svg>
{user?.email ?? 'Loading...'}
     </div>

     <div class="profile-itemcolor">
     <svg width="30px" height="30px"viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>phone</title>
  
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-258.000000, -309.000000)" fill="#000000">
            <path d="M289.073,313.433 L286.195,310.563 C285.401,309.77 284.112,309.77 283.317,310.563 L279,316.303 C278.341,317.274 278.206,318.38 279,319.173 L280.762,320.93 C279.456,322.68 277.888,324.588 276.123,326.348 C274.127,328.338 271.907,330.147 269.911,331.633 L268.208,329.936 C267.414,329.143 266.305,329.277 265.33,329.936 L259.574,334.241 C258.609,334.906 258.779,336.318 259.574,337.111 L262.452,339.98 C264.042,341.566 266.109,341.058 268.208,339.98 C268.208,339.98 274.561,336.424 280,331 C285.116,325.898 289.073,319.173 289.073,319.173 C289.898,316.91 290.663,315.018 289.073,313.433" id="phone" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>
{user?.phoneNumber ?? 'Loading...'}









     </div>
  



     <div class="profile-itemcolor">
     <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="30px" height="30px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<path fill="#231F20" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24
	C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24
	C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"/>
</svg>
{user?.adresse ?? 'Loading...'}
     </div>



     <h2 className='Challengertitle pb-10'>My Skills </h2>


     <div class="">
  <div class="skill">
    <div class="skill-name html">HTML</div>
    <div class="skill-level">
      <div style={{ width: '90%' }} class="skill-percent"></div>
    </div>
    <div class="skill-percent-number">90%</div>
  </div>
  <div class="skill">
    <div class="skill-name css">CSS</div>
    <div class="skill-level">
      <div style={{ width: '80%' }} class="skill-percent"></div>
    </div>
    <div class="skill-percent-number">80%</div>
  </div>
  <div class="skill">
    <div class="skill-name js">JavaScript</div>
    <div class="skill-level">
      <div style={{ width: '75%' }} class="skill-percent"></div>
    </div>
    <div class="skill-percent-number">75%</div>
  </div>
</div>

</div>


  
</div>












<section id="statistic" class="statistic-section one-page-section">
    <div class="flex justify-center">
        <div class="flex flex-col items-center mr-8">
            <div class="counter">
                <h2 class="timer count-title count-number">{count? count:0}
</h2>
                <div class="stats-line-black"></div>
                <p class="stats-text">challenges</p>
            </div>
        </div>
        <div class="flex flex-col items-center mr-8">
            <div class="counter">
                <h2 class="timer count-title count-number">{ongoingChallengesCount? ongoingChallengesCount:0}</h2>
                <div class="stats-line-black"></div>
                <p class="stats-text">Rank</p>
            </div>     
        </div>
        <div class="flex flex-col items-center mr-8">
            <div class="counter">
                <h2 class="timer count-title count-number">{completedChallengesCount? completedChallengesCount:0}</h2>
                <div class="stats-line-black"></div>
                <p class="stats-text">Team</p>
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





   <div class="load-more">
    <svg id="me" xmlns="http://w3.org/2000/svg" viewBox="0 0 341.333 341.333" fill="currentColor">
     <path d="M341.227 149.333V0l-50.133 50.133C260.267 19.2 217.707 0 170.56 0 76.267 0 .107 76.373.107 170.667s76.16 170.667 170.453 170.667c79.467 0 146.027-54.4 164.907-128h-44.373c-17.6 49.707-64.747 85.333-120.533 85.333-70.72 0-128-57.28-128-128s57.28-128 128-128c35.307 0 66.987 14.72 90.133 37.867l-68.8 68.8h149.333z" />
    </svg>
    Load More
   </div>



































   
  </div>
  </section>

  </div>


        <Footer />

      </main>

    </div>
  );
}

export default Challengerprofile;
