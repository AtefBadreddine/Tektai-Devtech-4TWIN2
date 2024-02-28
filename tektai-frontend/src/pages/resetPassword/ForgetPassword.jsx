import React, {useState} from 'react';

import Header from '../../layout/Header';
import axios from "axios";
import {useSearchParams} from "react-router-dom";


function Forgetpassword() {
  const [password,setPassword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [flashMessage, setFlashMessage] = useState(""); // State for flash message


  const submit =async (e) => {
    e.preventDefault();
       const token = searchParams.get('token')
    let  userData= {
         'token' : token,
         'newPassword' : password
    }
    const response = await axios.post(`http://localhost:3000/auth/reset-password`, userData);


    setFlashMessage("Password updated !");
    }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Let’s get you back up on your feet</h1>
                <p className="text-xl text-gray-600">Enter the email address you used when you signed up for your account, and we’ll email you a link to for your forgotten password.</p>
              </div>
              {flashMessage && (
                  <div className="bg-green-500 text-white p-4 mb-4">
                    {flashMessage}
                  </div>
              )}
              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={submit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input id="email" type="email" name="email" className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" name="password" value={password} onChange={ (e) => setPassword(e.target.value)} className="form-input w-full text-gray-800" placeholder="Enter your password address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button type="submit" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Reset password</button>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>



    </div>
  );
}

export default Forgetpassword;