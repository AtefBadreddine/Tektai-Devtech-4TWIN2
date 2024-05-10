import React, { useEffect, useState } from 'react';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import Stats from './stats/stats';
import axios from 'axios';
import SubmissionList from '../pages/SubmitSolution/SubmissionList';

interface UserData {
  username: string;
  email: string;
  image: string;
  password: string;
  phoneNumber:string;
  companyName: string;
  adresse: string;
  role: string;
  bio: string;
    
  gpts: number;
  spts: number;
  bpts: number;
  }

const Profile: React.FC = () => {

   let gptss: number = 0;
   let sptss: number = 0;
   let bptss: number = 0;
   const [userData, setUserData] = useState<UserData | null>(null);
   const [profileImageUrl, setProfileImageUrl] = useState('');
   const storedUser = localStorage.getItem('user');
   const user = storedUser ? JSON.parse(storedUser) : null;
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

    useEffect(() => {
    const localStorageData = localStorage.getItem('user');

    const fetchUserData = async (username) => {
      try {
        // Fetch user data from the backend
        const response = await axios.get(`${API_URL}/users/get/${username}`);
        const userData = response.data;
        setUserData(userData);
        setProfileImageUrl(`/uploads/${userData.image}`);
        console.log('Image path:', `/uploads/${userData.image}`); // Add this console log statement

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setUserData(parsedData);
      console.log('gpts:', parsedData.gpts);
      console.log('spts:', parsedData.spts);
      console.log('bpts:', parsedData.bpts);

      fetchUserData(parsedData.username); // Move fetchUserData here
    } else {
      console.log('No user data found in local storage');
    }

    console.log(userData?.bio);
  }, []);
   
  return (
    <>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />

      <main className="profile-page">
      <Header />
        <section className="relative block h-500-px">
          <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
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
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
 {/* section 1 */}
                <div className="flex flex-wrap justify-center">
                
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center mb-30">
  <div className="relative">
    {userData && userData.image ? (
      <img
        src={`${API_URL}/uploads/${userData.image}`}
        alt="Profile"
        className="shadow-xl rounded-full h-35 w-35 object-cover align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
      />
    ) : (
      <img
        src="/default-profile-picture.png" // path to the static default image
        alt="Default Profile"
        className="shadow-xl rounded-full h-35 w-35 object-cover  align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
      />
    )}
  </div>
</div>
                 
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:pt-4">
                    {/* <div className="py-6 px-3 mt-32 sm:mt-0"> */}
                    {userData?.role === 'challenger' && (
                    <>
                    <div className="flex justify-center ">

                      <div className="mr-4 p-3 text-center flex items-center"> {/* Added flex and items-center */}
                      <Link to="/MyTeams">
                        <button className="flex justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 sm:mr-2 mb-1" type="button">
                        Manage Teams
                        </button>
                      </Link>
                      </div>
                      <div className="mr-4 p-3 text-center flex items-center"> {/* Added flex and items-center */}
                      <Link to="/favoriteChallenges">
                      <button className="flex justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 sm:mr-2 mb-1" type="button">
                        Favorites
                      </button>
                      </Link>
                      </div>
                    </div>
                    </>
                    )}
                    {userData?.role === 'company' && (
                    <div className="flex justify-center ">

<div className="mr-4 p-3 text-center flex items-center"> {/* Added flex and items-center */}
  <Link to="/historychallenges">
    <button className="flex justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 sm:mr-2 mb-1"> {/* Added flex and items-center */}
      <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 513.11" className="w-4 h-4 mr-2">
        <path fill-rule="nonzero" d="M210.48 160.8c0-14.61 11.84-26.46 26.45-26.46s26.45 11.85 26.45 26.46v110.88l73.34 32.24c13.36 5.88 19.42 21.47 13.54 34.82-5.88 13.35-21.47 19.41-34.82 13.54l-87.8-38.6c-10.03-3.76-17.16-13.43-17.16-24.77V160.8zM5.4 168.54c-.76-2.25-1.23-4.64-1.36-7.13l-4-73.49c-.75-14.55 10.45-26.95 25-27.69 14.55-.75 26.95 10.45 27.69 25l.74 13.6a254.258 254.258 0 0136.81-38.32c17.97-15.16 38.38-28.09 61.01-38.18 64.67-28.85 134.85-28.78 196.02-5.35 60.55 23.2 112.36 69.27 141.4 132.83.77 1.38 1.42 2.84 1.94 4.36 27.86 64.06 27.53 133.33 4.37 193.81-23.2 60.55-69.27 112.36-132.83 141.39a26.24 26.24 0 01-12.89 3.35c-14.61 0-26.45-11.84-26.45-26.45 0-11.5 7.34-21.28 17.59-24.92 7.69-3.53 15.06-7.47 22.09-11.8.8-.66 1.65-1.28 2.55-1.86 11.33-7.32 22.1-15.7 31.84-25.04.64-.61 1.31-1.19 2-1.72 20.66-20.5 36.48-45.06 46.71-71.76 18.66-48.7 18.77-104.46-4.1-155.72l-.01-.03C418.65 122.16 377.13 85 328.5 66.37c-48.7-18.65-104.46-18.76-155.72 4.1a203.616 203.616 0 00-48.4 30.33c-9.86 8.32-18.8 17.46-26.75 27.29l3.45-.43c14.49-1.77 27.68 8.55 29.45 23.04 1.77 14.49-8.55 27.68-23.04 29.45l-73.06 9c-13.66 1.66-26.16-7.41-29.03-20.61zM283.49 511.5c20.88-2.34 30.84-26.93 17.46-43.16-5.71-6.93-14.39-10.34-23.29-9.42-15.56 1.75-31.13 1.72-46.68-.13-9.34-1.11-18.45 2.72-24.19 10.17-12.36 16.43-2.55 39.77 17.82 42.35 19.58 2.34 39.28 2.39 58.88.19zm-168.74-40.67c7.92 5.26 17.77 5.86 26.32 1.74 18.29-9.06 19.97-34.41 3.01-45.76-12.81-8.45-25.14-18.96-35.61-30.16-9.58-10.2-25.28-11.25-36.11-2.39a26.436 26.436 0 00-2.55 38.5c13.34 14.2 28.66 27.34 44.94 38.07zM10.93 331.97c2.92 9.44 10.72 16.32 20.41 18.18 19.54 3.63 36.01-14.84 30.13-33.82-4.66-15-7.49-30.26-8.64-45.93-1.36-18.33-20.21-29.62-37.06-22.33C5.5 252.72-.69 262.86.06 274.14c1.42 19.66 5.02 39 10.87 57.83z"/>
      </svg>
      My Challenges
    </button>
  </Link>
</div>
                    </div>
                    )}
                    {/* </div> */}
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  {userData?.role === 'challenger' ? (

                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">4</span><span className="text-sm text-blueGray-400">Rank</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Challenges</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">3</span><span className="text-sm text-blueGray-400">Teams</span>
                      </div>
                    </div>

                  ) : (
                  <div className="flex justify-center py-4 lg:pt-4 pt-4">
                    <div className="mr-4 p-3 text-center">
                     <span className="text-sm text-blueGray-800"><i className="fa fa-building"/> {userData?.companyName??'Loading...'}</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                     <span className="text-sm text-blueGray-800"><i className="fa fa-map-pin"/> {userData?.adresse??'Loading...'}</span>
                    </div>
                  </div>
)}
                  </div>

                </div>
 {/* info                */}
                <div className="text-center mt-12">

                  <h3 className="text-4xl font-semibold leading-normal mb-2 mb-2 text-black dark:text-white">
                  {userData?.username ?? 'Loading...'}
                  </h3>

                  <div className={`text-sm leading-normal mt-0 mb-2 font-bold uppercase ${
                     userData?.role === 'admin' ? ' text-success' :
                     userData?.role === 'challenger' ? ' text-danger' :
                     userData?.role === 'company' ? ' text-purple-500' :
                     'bg-warning text-warning'
                  }`}>
                    <i className="fa fa-tag mr-2 text-lg text-blueGray-400"></i>
                    {userData?.role?? 'Loading...'}
                  </div>

                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                    {userData?.email??'Loading...'}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fa fa-phone mr-2 text-lg text-blueGray-400"></i>
                    {userData?.phoneNumber??'Loading...'}
                  </div> 
                </div>

{/* BIO  */}
                 <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">                  
                    <div className="w-full lg:w-9/12 px-4">
                    <h3 className="text-2xl font-semibold leading-normal mb-2 text-black dark:text-white">BIO</h3>
                      <div className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        
                      {userData?.bio??'Loading...'}
                      </div>
                      {/* <a href="#pablo" className="font-normal text-pink-500">Show more</a> */}
                    </div>
                  </div>
                </div> 

                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">                  
                    <div className="w-full lg:w-9/12 px-4">
                      <div className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      <SubmissionList/>
                      </div>
                    </div>
                  </div>
                </div>

<div className="flex flex-wrap justify-center">
  
  <Stats></Stats>
  

  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
    <div className="flex flex-wrap justify-center">
      <div className="w-full lg:w-9/12 px-4">

            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userData?.gpts ?? 'Loading...'}
                </span>
                <span className="text-sm">
                  <FontAwesomeIcon icon={faMedal} className="text-yellow-500 mr-1" />
                  <span></span> Gold
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userData?.spts ?? 'Loading...'}
                </span>
                <span className="text-sm">
                  <FontAwesomeIcon icon={faMedal} className="text-gray-300 mr-1" />
                  <span></span> Silver
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userData?.bpts ?? 'Loading...'}
                </span>
                <span className="text-sm">
                  <FontAwesomeIcon icon={faMedal} className="text-orange-500 mr-1" />
                  <span></span> Bronze
                </span>
              </div>
            </div>

            <div className="mt-6.5">
              <h4 className="mb-3.5 font-medium text-black dark:text-white">
                Follow me on
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <Link
                  to="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Facebook icon */}
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Twitter icon */}
                  </svg>
                </Link>
                {/* Add more social media icons as needed */}
              </div>
            </div>
            
          </div>
        </div>
      </div>      
                   
                    </div>

                  </div>
                </div>


          </div>


          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
            

                  
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </section>
        <Footer /> 

      </main>

      
    </>
  );
};

export default Profile;

































































































// import React, { useEffect, useState } from 'react';
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import DefaultLayout from '../layout/DefaultLayout';
// import coverImage from '../images/cover/cover-01.png';
// import profileImage from '../images/user/user-06.png'
// import { Link } from 'react-router-dom';
// import Header from '../layout/Header';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMedal } from '@fortawesome/free-solid-svg-icons';
// import ChartOne from './charts/chartone';
// import Chartcercle from './charts/cercelchart';
// import Doura from './charts/doura';
// import Stats from './stats/stats';
// interface UserData {
//   username: string;
//   email: string;
//   image: string;
//   password: string;
//   role: string;
//   bio: string;
  
//   gpts: number;
//   spts: number;
//   bpts: number;
//   phoneNumber:number;
  
//   // Add other properties if necessary
// }
// const Profile = () => {
//   let gptss: number = 0;
//   let sptss: number = 0;
//   let bptss: number = 0;
//   const [userData, setUserData] = useState<UserData | null>(null);
  
//   useEffect(() => {
//     // Retrieve data from local storage
//     const localStorageData = localStorage.getItem('user');
    

//     if (localStorageData) {
//       // Parse the data if necessary
//       const parsedData = JSON.parse(localStorageData);
//       // Set the user data to state
//       setUserData(parsedData);
//       console.log('gpts:', userData?.gpts);
//       console.log('spts:', userData?.spts);
//       console.log('bpts:', userData?.bpts);
//       let gptss: number = userData?.gpts ?? 0;
//       let sptss: number = userData?.spts ?? 0;
//       let bptss: number = userData?.bpts ?? 0;
//     } else {
//       // Handle the case where no user data is found
//       console.log('No user data found in local storage');
//     }
//   }, []);
  
//   return (
//     <>
//     <Header />
//     <div style={{ height: '100px' }}></div>

//       <Breadcrumb pageName="Profile" />

//       <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="relative z-20 h-35 md:h-65">
//           <img
//             src={coverImage}
//             alt="profile cover"
//             className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
//           />
//           <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
//             <label
//               htmlFor="cover"
//               className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
//             >
//               <input type="file" name="cover" id="cover" className="sr-only" />
//               <span>
//                 <svg
//                   className="fill-current"
//                   width="14"
//                   height="14"
//                   viewBox="0 0 14 14"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
//                     fill="white"
//                   />
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
//                     fill="white"
//                   />
//                 </svg>
//               </span>
//               <span>Edt</span>
//             </label>
//           </div>
//         </div>
//         <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
//           <div className="relative z-20 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
//             <div className="relative drop-shadow-2">
//               <img src={profileImage} alt="profile" />
//               <label
//                 htmlFor="profile"
//                 className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
//               >
//                 <svg
//                   className="fill-current"
//                   width="14"
//                   height="14"
//                   viewBox="0 0 14 14"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
//                     fill=""
//                   />
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
//                     fill=""
//                   />
//                 </svg>
//                 <input
//                   type="file"
//                   name="profile"
//                   id="profile"
//                   className="sr-only"
//                 />
//               </label>
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
//             {userData?.username ?? 'Loading...'} </h3>
//             <div style={{ textTransform: 'uppercase' }} className={`font-medium ${
//       userData?.role === 'admin' ? ' text-success' :
//       userData?.role === 'challenger' ? ' text-danger' :
//       userData?.role === 'company' ? ' text-purple-500' :
//       'bg-warning text-warning'
//     }`}>
//       {userData?.role ?? 'Loading...'}
//     </div>
// {/* <ChartOne/>  */}
// {/* <Chartcercle></Chartcercle> */}
// {/* <div style={{ height: '150px' ,width:'100px'}}  >
// <Doura gpts={33} spts={22} bpts={11} /></div> */}
// <Stats  ></Stats>
//          <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
//               <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
//                 <span className="font-semibold text-black dark:text-white">
//                 {userData?.gpts ?? 'Loading...'} 

//                 </span>
//                 <span className="text-sm">                                                 <FontAwesomeIcon icon={faMedal} className="text-yellow-500 mr-1" />
// <span></span>
// Gold</span>
//               </div>
//               <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
//                 <span className="font-semibold text-black dark:text-white">
//                 {userData?.spts ?? 'Loading...'} 

//                 </span>
//                 <span className="text-sm">                         <FontAwesomeIcon icon={faMedal} className="text-gray-300 mr-1" />
// <span></span>Silver</span>
//               </div>
//               <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
//                 <span className="font-semibold text-black dark:text-white">
//                 {userData?.bpts ?? 'Loading...'} 

//                 </span>
//                 <span className="text-sm">                                                <FontAwesomeIcon icon={faMedal} className="text-orange-500 mr-1" />

// <span></span>Bronze</span>
//               </div>
//             </div>

//             <div className="mx-auto max-w-180">
//               <h4 className="font-semibold text-black dark:text-white">
//                 About Me
//               </h4>
//               <p className="mt-4.5">
//               {userData?.bio ?? 'Loading...'}
//               </p>
//             </div>

//             <div className="mt-6.5">
//               <h4 className="mb-3.5 font-medium text-black dark:text-white">
//                 Follow me on
//               </h4>
//               <div className="flex items-center justify-center gap-3.5">
//                 <Link
//                   to="#"
//                   className="hover:text-primary"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     className="fill-current"
//                     width="22"
//                     height="22"
//                     viewBox="0 0 22 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clipPath="url(#clip0_30_966)">
//                       <path
//                         d="M12.8333 12.375H15.125L16.0416 8.70838H12.8333V6.87504C12.8333 5.93088 12.8333 5.04171 14.6666 5.04171H16.0416V1.96171C15.7428 1.92229 14.6144 1.83337 13.4227 1.83337C10.934 1.83337 9.16663 3.35229 9.16663 6.14171V8.70838H6.41663V12.375H9.16663V20.1667H12.8333V12.375Z"
//                         fill=""
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_966">
//                         <rect width="22" height="22" fill="white" />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </Link>
//                 <Link
//                   to="#"
//                   className="hover:text-primary"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     className="fill-current"
//                     width="23"
//                     height="22"
//                     viewBox="0 0 23 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clipPath="url(#clip0_30_970)">
//                       <path
//                         d="M20.9813 5.18472C20.2815 5.49427 19.5393 5.69757 18.7795 5.78789C19.5804 5.30887 20.1798 4.55498 20.4661 3.66672C19.7145 4.11405 18.8904 4.42755 18.0315 4.59714C17.4545 3.97984 16.6898 3.57044 15.8562 3.43259C15.0225 3.29474 14.1667 3.43617 13.4218 3.83489C12.6768 4.2336 12.0845 4.86726 11.7368 5.63736C11.3891 6.40746 11.3056 7.27085 11.4993 8.0933C9.97497 8.0169 8.48376 7.62078 7.12247 6.93066C5.76118 6.24054 4.56024 5.27185 3.59762 4.08747C3.25689 4.67272 3.07783 5.33801 3.07879 6.01522C3.07879 7.34439 3.75529 8.51864 4.78379 9.20614C4.17513 9.18697 3.57987 9.0226 3.04762 8.72672V8.77439C3.04781 9.65961 3.35413 10.5175 3.91465 11.2027C4.47517 11.8878 5.2554 12.3581 6.12304 12.5336C5.55802 12.6868 4.96557 12.7093 4.39054 12.5996C4.63517 13.3616 5.11196 14.028 5.75417 14.5055C6.39637 14.983 7.17182 15.2477 7.97196 15.2626C7.17673 15.8871 6.2662 16.3488 5.29243 16.6212C4.31866 16.8936 3.30074 16.9714 2.29688 16.8502C4.04926 17.9772 6.08921 18.5755 8.17271 18.5735C15.2246 18.5735 19.081 12.7316 19.081 7.66522C19.081 7.50022 19.0765 7.33339 19.0691 7.17022C19.8197 6.62771 20.4676 5.95566 20.9822 5.18564L20.9813 5.18472Z"
//                         fill=""
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_970">
//                         <rect
//                           width="22"
//                           height="22"
//                           fill="white"
//                           transform="translate(0.666138)"
//                         />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </Link>
//                 <Link
//                   to="#"
//                   className="hover:text-primary"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     className="fill-current"
//                     width="23"
//                     height="22"
//                     viewBox="0 0 23 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clipPath="url(#clip0_30_974)">
//                       <path
//                         d="M6.69548 4.58327C6.69523 5.0695 6.50185 5.53572 6.15786 5.87937C5.81387 6.22301 5.34746 6.41593 4.86123 6.41569C4.375 6.41545 3.90878 6.22206 3.56513 5.87807C3.22149 5.53408 3.02857 5.06767 3.02881 4.58144C3.02905 4.09521 3.22244 3.62899 3.56643 3.28535C3.91042 2.9417 4.37683 2.74878 4.86306 2.74902C5.34929 2.74927 5.81551 2.94265 6.15915 3.28664C6.5028 3.63063 6.69572 4.09704 6.69548 4.58327ZM6.75048 7.77327H3.08381V19.2499H6.75048V7.77327ZM12.5438 7.77327H8.89548V19.2499H12.5071V13.2274C12.5071 9.87244 16.8796 9.56077 16.8796 13.2274V19.2499H20.5005V11.9808C20.5005 6.32494 14.0288 6.53577 12.5071 9.31327L12.5438 7.77327Z"
//                         fill=""
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_974">
//                         <rect
//                           width="22"
//                           height="22"
//                           fill="white"
//                           transform="translate(0.333862)"
//                         />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </Link>
//                 <Link
//                   to="#"
//                   className="hover:text-primary"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     className="fill-current"
//                     width="22"
//                     height="22"
//                     viewBox="0 0 22 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clipPath="url(#clip0_30_978)">
//                       <path
//                         d="M18.3233 10.6077C18.2481 9.1648 17.7463 7.77668 16.8814 6.61929C16.6178 6.90312 16.3361 7.16951 16.038 7.41679C15.1222 8.17748 14.0988 8.79838 13.0011 9.25929C13.1542 9.58013 13.2945 9.89088 13.4182 10.1842V10.187C13.4531 10.2689 13.4867 10.3514 13.519 10.4345C14.9069 10.2786 16.3699 10.3355 17.788 10.527C17.9768 10.5527 18.1546 10.5802 18.3233 10.6077ZM9.72038 3.77854C10.6137 5.03728 11.4375 6.34396 12.188 7.69271C13.3091 7.25088 14.2359 6.69354 14.982 6.07296C15.2411 5.8595 15.4849 5.62824 15.7117 5.38088C14.3926 4.27145 12.7237 3.66426 11 3.66671C10.5711 3.66641 10.1429 3.70353 9.72038 3.77762V3.77854ZM3.89862 9.16396C4.52308 9.1482 5.1468 9.11059 5.76863 9.05121C7.27163 8.91677 8.7618 8.66484 10.2255 8.29771C9.46051 6.96874 8.63463 5.67578 7.75046 4.42296C6.80603 4.89082 5.97328 5.55633 5.30868 6.37435C4.64409 7.19236 4.16319 8.14374 3.89862 9.16396ZM5.30113 15.6155C5.65679 15.0957 6.12429 14.5109 6.74488 13.8747C8.07771 12.5089 9.65071 11.4455 11.4712 10.8589L11.528 10.8424C11.3768 10.5087 11.2347 10.2108 11.0917 9.93029C9.40871 10.4207 7.63588 10.7269 5.86946 10.8855C5.00779 10.9634 4.23504 10.9973 3.66671 11.0028C3.66509 12.6827 4.24264 14.3117 5.30204 15.6155H5.30113ZM13.7546 17.7971C13.4011 16.0144 12.9008 14.2641 12.2586 12.5639C10.4235 13.2303 8.96138 14.2047 7.83113 15.367C7.375 15.8276 6.97021 16.3362 6.62388 16.8841C7.88778 17.8272 9.42308 18.3356 11 18.3334C11.9441 18.3347 12.8795 18.1533 13.7546 17.799V17.7971ZM15.4715 16.8117C16.9027 15.7115 17.8777 14.1219 18.2096 12.3475C17.898 12.2696 17.5029 12.1917 17.0684 12.1312C16.1023 11.9921 15.1221 11.9819 14.1534 12.101C14.6988 13.6399 15.1392 15.2141 15.4715 16.8126V16.8117ZM11 20.1667C5.93729 20.1667 1.83337 16.0628 1.83337 11C1.83337 5.93729 5.93729 1.83337 11 1.83337C16.0628 1.83337 20.1667 5.93729 20.1667 11C20.1667 16.0628 16.0628 20.1667 11 20.1667Z"
//                         fill=""
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_978">
//                         <rect width="22" height="22" fill="white" />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </Link>
//                 <Link
//                   to="#"
//                   className="hover:text-primary"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     className="fill-current"
//                     width="23"
//                     height="22"
//                     viewBox="0 0 23 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clipPath="url(#clip0_30_982)">
//                       <path
//                         d="M11.6662 1.83337C6.6016 1.83337 2.49951 5.93546 2.49951 11C2.49847 12.9244 3.10343 14.8002 4.22854 16.3613C5.35366 17.9225 6.94181 19.0897 8.76768 19.6974C9.22602 19.7771 9.39743 19.5021 9.39743 19.261C9.39743 19.0438 9.38552 18.3224 9.38552 17.5542C7.08285 17.9786 6.48701 16.9932 6.30368 16.4771C6.2001 16.2131 5.75368 15.4 5.3641 15.1819C5.04326 15.0105 4.58493 14.586 5.35218 14.575C6.07451 14.5631 6.58968 15.2396 6.76201 15.5146C7.58701 16.9006 8.90518 16.511 9.43135 16.2709C9.51202 15.675 9.75218 15.2745 10.0162 15.0453C7.9766 14.8161 5.84535 14.025 5.84535 10.5188C5.84535 9.52146 6.2001 8.69737 6.78493 8.05479C6.69326 7.82562 6.37243 6.88604 6.8766 5.62562C6.8766 5.62562 7.64385 5.38546 9.39743 6.56612C10.1437 6.35901 10.9147 6.25477 11.6891 6.25629C12.4683 6.25629 13.2474 6.35896 13.9808 6.56521C15.7334 5.37354 16.5016 5.62654 16.5016 5.62654C17.0058 6.88696 16.6849 7.82654 16.5933 8.05571C17.1772 8.69737 17.5329 9.51046 17.5329 10.5188C17.5329 14.037 15.3906 14.8161 13.351 15.0453C13.6829 15.3313 13.9698 15.8813 13.9698 16.7411C13.9698 17.9667 13.9579 18.9521 13.9579 19.262C13.9579 19.5021 14.1302 19.7881 14.5885 19.6965C16.4081 19.0821 17.9893 17.9126 19.1094 16.3526C20.2296 14.7926 20.8323 12.9206 20.8329 11C20.8329 5.93546 16.7308 1.83337 11.6662 1.83337Z"
//                         fill=""
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_982">
//                         <rect
//                           width="22"
//                           height="22"
//                           fill="white"
//                           transform="translate(0.666138)"
//                         />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
