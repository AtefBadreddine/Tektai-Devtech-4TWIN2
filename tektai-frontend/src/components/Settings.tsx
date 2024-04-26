import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Header from '../layout/Header';
import userService from "../services/userService";
import ImageUpload from './ImageUpload';
import UploadImageForm from './ImageUpload';
import FileUploadComponent from './upload';

interface UserData {
  _id : string;
  username: string;
  email: string;
  image: string;
  password: string;
  role: string;
  bio: string;
  
  gpts: number;
  spts: number;
  bpts: number;
  phoneNumber:number;
  
  // Add other properties if necessary
}
const Settings = () => {
  
  const [passwordData, setPasswordData] = useState({
    email: '',
    currentPassword: '',
    newPassword: ''
  });
  const [flashMessage, setFlashMessage] = useState(""); // State for flash message
  const [userData, setUserData] = useState<UserData | null>(null);
  const [input, setInput] = useState({
    username: "",
    email: "",
    image: "",
    bio: "",
    phoneNumber: "",
    companyName : "",
    adresse : "",
    birthday : ""

  });



  
  // @ts-ignore
  useEffect(  () => {
    // @ts-ignore
    const getuser =async () => {

      const localStorageData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (token && localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        const user = await userService.getUser(token,parsedData.username)
        setUserData(user);

        setInput({
          username: user.username || "",
          email: user.email || "",
          image: user.image || "",
          bio: user.bio || "",
          phoneNumber: user.phoneNumber || "",
          companyName: user.companyName || "",
          adresse: user.adresse || "",
          birthday: user.birthday || ""
        });
      }
    }
    getuser();

  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // @ts-ignore
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      // Call the updateUser function with the current user ID and input data
      const updatedUser = await userService.updateUser(userData?._id, input);

      // Update the input fields with the updated user data
      setInput({
        username: updatedUser.username || "",
        email: updatedUser.email || "",
        image: updatedUser.image || "",
        bio: updatedUser.bio || "",
        phoneNumber: updatedUser.phoneNumber || "",
        companyName: updatedUser.companyName || "",
        adresse: updatedUser.adresse || "",
        birthday: updatedUser.birthday || ""
      });
      setFlashMessage("Profile updated successfully");
      window.location.href = '/profile';

    } catch (error) {
      // Display an error message if updating the user fails
      setFlashMessage("Failed to update profile. Please try again later.");
      console.error("Error updating user:", error);
    }
  };
  //change password 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.changePassword(passwordData.email, passwordData.currentPassword, passwordData.newPassword);
      setFlashMessage('Password changed successfully');
    } catch (error) {
      setFlashMessage('Failed to change password. Please try again later.');
      console.error('Error changing password:', error);
    }
  };

  return (
    <>
      <Header />
      <section className="py-40 bg-gray-100  bg-opacity-50 h-screen">
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
{/* section1      */}
        <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
            {userData && userData.image ? (
      <img
        src={`http://localhost:3000/uploads/${userData.image}`}
        alt="Profile"
        className="w-10 h-10 object-cover rounded-full"
        />
    ) : (
      <img
        src="/default-profile-picture.png" // path to the static default image
        alt="Default Profile"
        className="w-10 h-10 object-cover rounded-full"
      />
    )}
              <h1 className="text-gray-600">{userData?.username ?? 'Loading...'}</h1>
            </div>
          </div>
        </div>


        <div className="bg-white space-y-6">
{/* section2     */}
          <hr />
{/* section3     */}

<form onSubmit={handleUpdate}>
        {flashMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">
            {flashMessage}
          </div>
        )}

          <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">


              <div>
                <label className="text-sm text-gray-400" htmlFor="fullName">Full name</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    type="text"
                    name="username"
                    id="fullName"
                    placeholder="Devid Jhon"
                    onChange={handleInput}
                    value={input.username}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400" htmlFor="phoneNumber">Phone Number</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={input.phoneNumber}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400" htmlFor="emailAddress">Email Address</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                     <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill="" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill="" />
                        </g>
                    </svg>
                  </div>
                  <input
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    type="email"
                    name="email"
                    id="emailAddress"
                    placeholder="devidjond45@gmail.com"
                    value={input.email}
                    onChange={handleInput}
                  />
                </div>
              </div>

            {userData?.role === 'company' && (
            <div>
              <div>
                <label className="text-sm text-gray-400" htmlFor="companyName">Company Name</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                     <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill="" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill="" />
                        </g>
                    </svg>
                  </div>
                  <input
                        className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                        type="text"
                        name="companyName"
                        id="companyName"
                        onChange={handleInput}
                        value={input.companyName}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400" htmlFor="adresse">Company Adress</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                     <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill="" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill="" />
                        </g>
                    </svg>
                  </div>
                  <input
                        className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                        type="text"
                        name="adresse"
                        id="adresse"
                        onChange={handleInput}
                        value={input.adresse}
                  />
                </div>
              </div>
            </div>      
            )}

              <div>
                <label className="text-sm text-gray-400" htmlFor="birthday">Birthday</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                     <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill="" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill="" />
                        </g>
                    </svg>
                  </div>
                  <input
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      type="date"
                      name="birthday"
                      id="birthday"
                      placeholder=""
                      value={input.birthday}
                      onChange={handleInput}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400" htmlFor="bio">BIO</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                    <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                            fill="" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                            fill="" />
                        </g>
                        <defs>
                          <clipPath id="clip0_88_10224">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                    </svg>
                  </div>
                   <textarea
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      name="bio"
                      id="bio"
                      rows={6}
                      placeholder="Write your bio here"
                      value={input.bio}
                      onChange={handleInput}

                    ></textarea>
                </div>
              </div>

            </div>
          </div>

                {/* <ImageUpload userId={userData?._id} /> */}
                <div className="flex justify-end gap-4.5">
                  <button
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    type="button"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Cancel</span>
                    
                  </button>
                  <button
                    className="flex justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
</form>
          <hr />
{/* section4    */}

           <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto bold">Profile image</h2>
             <div className="md:w-2/3 max-w-sm mx-auto"> 
             <UploadImageForm userId={userData?._id}/>
            </div> 
          </div> 


          <hr />
{/* section5     */}
   
           <form onSubmit={handleSubmit}>
          {flashMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">
            {flashMessage}
          </div>
        )}
          <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm">Change password</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">  

              <div>
              <label className="text-sm text-gray-400" htmlFor="crrent">Current password</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                    </svg>
                  </div>
                  <input
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400" htmlFor="new">New password</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                    </svg>
                  </div>
                  <input
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

          </div>
          </div>
              <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    type="submit"
                    >
                   <svg
                     fill="none"
                     className="w-4 text-white mr-2"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                   >
                     <path
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                     />
                   </svg>
                   Update
                  </button>
                </div>

            </form>

          <hr />
{/* section6     */}
          <div className="w-full p-4 text-right text-gray-800">
          <button className="button" type="button">
  <span className="button__text">Delete Account</span>
  <span className="button__icon">
  <svg
    className="svg"
    height="512"
    viewBox="0 0 512 512"
    width="512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title></title>
    <path
      d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
      style={{ fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
    ></path>
    <line
      style={{ stroke: '#fff', strokeLinecap: 'round', strokeMiterlimit: '10', strokeWidth: '32px' }}
      x1="80"
      x2="432"
      y1="112"
      y2="112"
    ></line>
    <path
      d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
      style={{ fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
    ></path>
    <line
      style={{ fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
      x1="256"
      x2="256"
      y1="176"
      y2="400"
    ></line>
    <line
      style={{ fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
      x1="184"
      x2="192"
      y1="176"
      y2="400"
    ></line>
    <line
      style={{ fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
      x1="328"
      x2="320"
      y1="176"
      y2="400"
    ></line>
  </svg>
</span>
</button>
          </div>


    {flashMessage && <div>{flashMessage}</div>}

        </div>
      </div>
    </section>

    {flashMessage && <div>{flashMessage}</div>}

    </>
  );
};

export default Settings;
