import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../createChallenge/card.css'


interface UserData {
  username: string;
  image: string;
  companyName: string;
  adresse: string;
  role: string;
  }

const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

const Challenges = ({ status }) => {
  
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(8);
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
  
const Challenge = ({ challenge, index}) => {
  
    const [userData, setUserData] = useState<UserData | null>(null);
    const [flashMessage, setFlashMessage] = useState(""); // State for flash message
    const [loadingCompany, setLoadingCompany] = useState(true);
    const [companyName, setCompanyName] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [image, setImage] = useState('');

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    function generateImg(index) {
      const imgs = [
        'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?cs=srgb&dl=pexels-rostislav-uzunov-5011647.jpg&fm=jpg',
        'https://img.freepik.com/premium-photo/3d-rendering-digital-art-illustration-variety-shapes_861655-30.jpg',
        'https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-3d-cube-background-abstract-texture-wallpaper-image_2599710.jpg',
        'https://miro.medium.com/v2/resize:fit:1400/0*JG9ZJlqifvrgxS52',
        'https://img.freepik.com/premium-photo/3d-rendering-futuristic-abstract-structure-with-intricate-complex-geometries-as-modern-trendy_896648-1227.jpg',
        'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyJTIwM2R8ZW58MHx8MHx8fDA%3D',
      ];
      return imgs[index % imgs.length];
    }

   useEffect(() => {
    const fetchUserData = async (username) => {
      try {
        // Fetch user data from the backend
        const response = await axios.get(`http://localhost:3000/users/get/${username}`);
        const userData = response.data;
        setUserData(userData);
        setProfileImageUrl(`/uploads/${userData.image}`);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const localStorageData = localStorage.getItem('user');

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setUserData(parsedData);
      fetchUserData(parsedData.username); // Move fetchUserData here
    } else {
      console.log('No user data found in local storage');
    }

    console.log(userData?.companyName);
  }, []);
    
    useEffect(() => {
  
      const fetchUserData = async () => {
        try {
          // Fetch user data from the backend
          const response = await axios.get(`http://localhost:3000/users/get/${challenge.company_id}`);
          const { companyName, image } = response.data; // Assuming the image URL is provided in the response data
          setCompanyName(companyName);
          setImage(`${image}`); // Set the correct image path received from API
          setLoadingCompany(false);


          const userData = response.data;
          setUserData(userData);
          // Check if the challenge is in the user's favorites list
          const isFavoriteResponse = await axios.get(`http://localhost:3000/users/${userData._id}/favorites/check/${challenge._id}`);
          setIsFavorite(isFavoriteResponse.data.isFavorite);        

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }, [challenge.company_id]);

    const handleClickAddFavorite = async (challengeId) => {
      const userId = userData?._id;
      try {
        setIsFavorite(prevIsFavorite => !prevIsFavorite);

        if (isFavorite) {
          await axios.delete(`http://localhost:3000/users/${userId}/favorites/remove/${challenge._id}`);
          console.log('Challenge with ID deleted :', challengeId);
          setIsFavorite(false);
        } else {
      // Fetch the user's favorites list
      const response = await axios.get(`http://localhost:3000/users/${userId}/favorites`);
      const favorites = response.data;
      // Check if the challenge is already in favorites
      const isAlreadyFavorite = favorites.some(favorite => favorite._id === challenge._id);
      if (!isAlreadyFavorite) {

        await axios.post(`http://localhost:3000/users/${userId}/favorites/add/${challengeId}`);
        console.log('User ID:', userId);
        console.log('Challenge ID:', challengeId);
        setIsFavorite(true);
        }else {
          // If already favorite, do nothing
          console.log('Challenge is already a favorite.');
        }
      }
        // Handle successful response (e.g., update UI to reflect the added favorite)
      } catch (error) {
        // Handle potential errors during the API request
      }
    };
  
    return (
<div className="relative group overflow-hidden rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
<div className="card" >
{/* block 1 */}
<div className="img" style={{ backgroundImage: `url(${generateImg(index)})` }}>
{/* +20 */}
<div className="stats pl-4">
  <div className="viewer">
    <span><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" height="25px" width="25px" alt="Viewer 1" /></span>
    <span><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" height="25px" width="25px"   alt="Viewer 2" /></span>
    <span><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" height="25px" width="25px"   alt="Viewer 3" /></span>
    <span className='smaller'>+20</span>
  </div>
</div>

{/* like */}
<div className="save">
<input 
type="checkbox" 
className="checkbox" 
id={`checkbox-${challenge._id}`} 
checked={isFavorite}
onChange={() => handleClickAddFavorite(challenge._id)}
/>

<label htmlFor={`checkbox-${challenge._id}`}>
      <svg id="heart-svg" viewBox="467 420 58 57" width="35" height="35" xmlns="http://www.w3.org/2000/svg">
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
{/* profile img */}
    <div className="card__avatar">
    {image ? (
    <img src={`http://localhost:3000/uploads/${image}`} height="45px" width="45px" alt="Logo" className='rounded-full shadow-lg' />
    ) : (
    <img src="https://cdn4.vectorstock.com/i/1000x1000/09/33/company-icon-for-graphic-and-web-design-vector-31970933.jpg" height="45px" width="45px" alt="Default Logo" className='rounded-full shadow-lg' />
    )}
    </div>
</div>
  
{/* block 2 */}
{/* info */}
  <div className="text">
    <p className="h3">{truncateText(challenge.title, 15)}</p>
    <div className="flex items-center">
    <h4 className="company pr-1">
     by 
    </h4>
    <h4 className="company"> {loadingCompany ? 'Loading...' : companyName}</h4>
</div>

<div className="aline">
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
    <div className="btn-conteiner">
    <Link to={`/challenges/${challenge._id}`} >
  <a href="#" className="btn-content">
    <span className="icon-arrow">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 66 43"
        height="30px"
        width="30px"
      >
        <g
          fill-rule="evenodd"
          fill="none"
          stroke-width="1"
          stroke="none"
          id="arrow"
        >
          <path
            fill="#9ee5fa"
            d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
            id="arrow-icon-one"
          ></path>
          <path
            fill="#9ee5fa"
            d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
            id="arrow-icon-two"
          ></path>
          <path
            fill="#9ee5fa"
            d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
            id="arrow-icon-three"
          ></path>
        </g>
      </svg>
    </span>
  </a>
  </Link>
</div>
</div>

  </div>

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
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10">
        
  <Link to="/favoriteChallenges" className="cardfav relative group overflow-hidden rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
  <div className="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      height="38px"
      width="38px"
      version="1.1"
      id="heart"
      viewBox="0 0 471.701 471.701"
      xml:space="preserve"
    >
      <linearGradient id="gradientColor">
        <stop offset="5%" stop-color="#7eaaff"></stop>
        <stop offset="95%" stop-color="#ff48fb"></stop>
      </linearGradient>
      <g>
        <path
          d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z"
        ></path>
      </g>
    </svg>
  </div>
  <p className="title">Favourites</p>
  <p className="text">Check all your favourites in one place.</p>
  </Link>

        
        {loading ? (
          Array.from({ length: 9 }).map((_, index) => (
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
            <Challenge key={challenge.id} challenge={challenge} index={index}/>
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





 
            
{/* challenge upcoming 

        {challenge?.status === 'Upcoming' && (
<div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
<div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-sky-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
<div className="relative">
    <div className="border border-sky-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-sky-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
     <svg width="1em" height="1em" className="text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
     <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
     </svg>
    </div>
  
    <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
        <h1 className="text-gray-900 dark:text-gray-900">{truncateText(challenge.title, 15)}</h1>
        <p className="text-gray-500 dark:text-gray-500">{challenge.description}</p>
        <p className="text-blue-500 dark:text-blue-500">{challenge.status}</p>
    </div>
    <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
        <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
            <span>View details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
        </a>

<div className="save">
<div>
<input 
type="checkbox" 
className="checkbox" 
id={`checkbox-${challenge._id}`} 
checked={isFavorite}
onChange={() => handleClickAddFavorite(challenge._id)}
/>

<label htmlFor={`checkbox-${challenge._id}`}>
      <svg id="heart-svg" viewBox="467 420 58 57" width="35" height="35" xmlns="http://www.w3.org/2000/svg">
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
</div>
</div>
        )}
{/* challenge Ongoing *
        {challenge?.status === 'Ongoing' && (
<div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                    <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-green-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                    <div className="relative">
                        <div className="border border-green-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-green-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                        <svg width="0.73em" height="1em" className="text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
</svg>                        </div>

                        <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                        <h1 className="text-gray-900 dark:text-gray-900">{challenge.title}</h1>
                        <p className="text-gray-500 dark:text-gray-500">{challenge.description}</p>
                        <p className="text-green-500 dark:text-green-500">{challenge.status}</p>

                        </div>

                        <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                        <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                         <span>View details</span>
                         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                        </a>                           
<div className="save">
<div>
<input 
type="checkbox" 
className="checkbox" 
id={`checkbox-${challenge._id}`} 
checked={isFavorite}
onChange={() => handleClickAddFavorite(challenge._id)}
/>

<label htmlFor={`checkbox-${challenge._id}`}>
      <svg id="heart-svg" viewBox="467 420 58 57" width="35" height="35" xmlns="http://www.w3.org/2000/svg">
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
                    </div>
                </div>

        )}
{/* challenge Completed *
        {challenge?.status === 'Completed' && (
<div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                    <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-yellow-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                    <div className="relative">
                        <div className="border border-yellow-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-yellow-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                        <svg className="w-6 h-6 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
</svg>


                    </div>

                        <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                        <h1 className="text-gray-900 dark:text-gray-900">{challenge.title}</h1>
        <p className="text-gray-500 dark:text-gray-500">{challenge.description}</p>
        <p className="text-red-500 dark:text-red-500">{challenge.status}</p>

                        </div>
                        <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                        <a href={`/challenges/${challenge._id}`} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                         <span>View details</span>
                         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                        </a>
<div className="save">
<div>
<input 
type="checkbox" 
className="checkbox" 
id={`checkbox-${challenge._id}`} 
checked={isFavorite}
onChange={() => handleClickAddFavorite(challenge._id)}
/>

<label htmlFor={`checkbox-${challenge._id}`}>
      <svg id="heart-svg" viewBox="467 420 58 57" width="35" height="35" xmlns="http://www.w3.org/2000/svg">
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
                    </div>
                </div>

        )}
        
</> 
*/}