import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../createChallenge/card.css'

const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

const Challenges = ({ status }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(10);
 
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
        const response = await axios.get(`http://localhost:3000/challenges/filter?status=${status}&page=${currentPage}&limit=${challengesPerPage}`);
        setChallenges(response.data.reverse()); // Reverse the array of challenges
        setLoading(false);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };
  
    fetchChallenges();
  }, [status, currentPage, challengesPerPage]);


  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges.slice(indexOfFirstChallenge, indexOfLastChallenge);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const Challenge = ({ challenge, index }) => {
    const [companyName, setCompanyName] = useState('');
    const [loadingCompany, setLoadingCompany] = useState(true);
 
    function generateColor(index) {
      const colors = [
        'linear-gradient(#e66465, #9198e5)', // Tomato to Blueberry
        'linear-gradient(#66b3ff, #99ff99)', // Blue Cheese to Lettuce
        'linear-gradient(#ffcc99, #ffd700)', // Cheese to Pineapple
        'linear-gradient(#ffa07a, #ff6347)', // Shrimp to Pepperoni
        'linear-gradient(#adff2f, #9370db)', // Broccoli to Grape
        'linear-gradient(#e66465, #66b3ff)', // Tomato to Blue Cheese
        'linear-gradient(#9198e5, #ffd700)', // Blueberry to Pineapple
        'linear-gradient(#ff6347, #9370db)', // Pepperoni to Grape
        'linear-gradient(#adff2f, #66b3ff)', // Broccoli to Blue Cheese
        'linear-gradient(#e66465, #ffa07a)', // Tomato to Shrimp
        // Add more linear gradients as needed
      ];
      return colors[index % colors.length];
    }
    
    
    
    useEffect(() => {
      const fetchCompany = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/users/getById/${challenge.company_id}`);
          setCompanyName(response.data.companyName);
          setLoadingCompany(false);
        } catch (error) {
          console.error('Error fetching company:', error);
        }
      };

      fetchCompany();
    }, [challenge.company_id]);

    const imageSrc = challenge.image ? challenge.image : defaultImagePath;
    
    return (
      

<div className="cards-container">

  
      <div className="card" >
      <div className="img" style={{ background: generateColor(index) }}>
    <div className="save">
    <div >
<input type="checkbox" class="checkbox" id="checkbox" />
<label for="checkbox">
      <svg id="heart-svg" viewBox="467 392 58 57" width="35" height="35" xmlns="http://www.w3.org/2000/svg">
        <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
          <path id="heart" d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" fill="#AAB8C2"/>
          <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

          <g id="grp7" opacity="0" transform="translate(7 6)">
            <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
            <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
          </g>

          <g id="grp6" opacity="0" transform="translate(0 28)">
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
          </g>

          <g id="grp3" opacity="0" transform="translate(52 28)">
            <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
            <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
          </g>

          <g id="grp2" opacity="0" transform="translate(44 6)">
            <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp5" opacity="0" transform="translate(14 50)">
            <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp4" opacity="0" transform="translate(35 50)">
            <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp1" opacity="0" transform="translate(24)">
            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
          </g>
        </g>
      </svg>
    </label>
  


</div>
    </div>
  </div>
  <Link to={`/challenges/${challenge._id}`} >

  <div className="text">
    <p className="h3">{truncateText(challenge.title, 15)}</p>
    <div className="flex items-center">
  <h4 className="p">Company: </h4>
  <h4 className="company">{loadingCompany ? 'Loading...' : companyName}</h4>
</div>

    <div className="icon-box">

<svg height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 451.827 451.827" xml:space="preserve">
<g>
	<g>
		<path style={{ fill: "#9198e5" }}  d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"/>
	</g>
</g>
</svg>
      <p className="span">{challenge.status}</p>
    </div>
  </div>
  </Link>
</div>



















      </div>
    );
  };
  const isLoggedIn = () => {
    const storedToken = localStorage.getItem('token');
    return !!storedToken;
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">






      <div class="cardfav">
  <div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="38px" width="38px" version="1.1" id="heart" viewBox="0 0 471.701 471.701" xml:space="preserve">
      <linearGradient id="gradientColor">
        <stop offset="5%" stop-color="#7eaaff"></stop>
        <stop offset="95%" stop-color="#ff48fb"></stop>
      </linearGradient>
      <g>
        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z"></path>
      </g>
    </svg>
  </div>
  <p class="title">Favourites</p>
  <p class="text">Check all your favourites in one place.</p>
</div>





        
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg my-2">
              <div className="animate-pulse">
                <div className="w-full h-40 bg-gray-300"></div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 bg-gray-300 h-6 w-3/4"></div>
                  <div className="text-gray-700 text-base bg-gray-300 h-4 w-1/2 mt-2"></div>
                  <div className="text-gray-700 text-base bg-gray-300 h-4 w-2/3 mt-1"></div>
                  <div className="text-gray-700 text-base bg-gray-300 h-4 w-1/3 mt-1"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          currentChallenges.map((challenge, index) => (
            <Challenge key={challenge.id} challenge={challenge} index={index} />
          ))
          
        )}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(challenges.length / challengesPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="mx-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-200">
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
