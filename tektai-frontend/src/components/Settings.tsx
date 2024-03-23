import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Header from '../layout/Header';
import userService from "../services/userService";
import ImageUpload from './ImageUpload';
import UploadImageForm from './ImageUpload';

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
              <img
                className="w-10 h-10 object-cover rounded-full"
                alt="User avatar"
                src="https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <h1 className="text-gray-600">{userData?.username ?? 'Loading...'}</h1>
            </div>
          </div>
        </div>


        <div className="bg-white space-y-6">
{/* section2     */}

          {/* <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4  text-gray-900 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto bold">Account Settings</h2>
            {/* <div className="md:w-2/3 max-w-sm mx-auto">
              <label class="text-sm text-gray-400">Email</label>
              <div class="w-full inline-flex border">
                <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg
                    fill="none"
                    class="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="email@example.com"
                  disabled
                />
              </div>
            </div> 
          </div> */}

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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
</form>
          <hr />
{/* section4     */}
   
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
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
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


            {/* <div className="md:w-3/12 text-center md:pl-6">
              <button className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right">
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
            </div> */}


          <hr />
{/* section5     */}
          <div className="w-full p-4 text-right text-gray-800">
            <button className="inline-flex items-center focus:outline-none mr-4">
              <svg
                fill="none"
                className="w-4 mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete account
            </button>
          </div>
        </div>
      </div>
    </section>
      





    {/* <div className="mx-auto max-w-270">
    <div style={{ height: '100px' }}></div>
      <Breadcrumb pageName="Settings" />
      {flashMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">
            {flashMessage}
          </div>
      )}
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleUpdate}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                              fill="" />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                              fill="" />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="username"
                        id="fullName"
                        placeholder="Devid Jhon"
                        onChange={handleInput}
                        value={input.username} />
                        </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={input.phoneNumber}
                      onChange={handleInput}
                      />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
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
                     <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="companyName"
                      >
                        Company Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="companyName"
                        id="companyName"
                        onChange={handleInput}
                        value={input.companyName}
                      />
                    </div>
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="adresse"
                      >
                        Company adresse

                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="adresse"
                        id="adresse"
                        onChange={handleInput}
                        value={input.adresse}
                      />
                    </div>
                    </div>
                    
                  )}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="birthday"
                    >
                      birthday
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="date"
                      name="birthday"
                      id="birthday"
                      placeholder=""
                      value={input.birthday}
                      onChange={handleInput}
                    />
                  </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Username"
                  >
                    BIO
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </span>

                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="bio"
                      id="bio"
                      rows={6}
                      placeholder="Write your bio here"
                      value={input.bio}
                      onChange={handleInput}

                    ></textarea>
                  </div>
                </div>
                
                {/* <ImageUpload userId={userData?._id} /> */}
 {/*             <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        
        
      </div>
    </div>
    
    <h1>uploaaaaadd imageeeee {userData?._id} </h1>
     <UploadImageForm userId={userData?._id}/>

    {flashMessage && <div>{flashMessage}</div>}  */}
    </>
  );
};

export default Settings;
