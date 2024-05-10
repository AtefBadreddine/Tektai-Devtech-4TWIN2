import React, {useState} from 'react';

import Header from '../../layout/Header';
import UserService from "../../services/userService";
import {useTimeout} from "@chakra-ui/react";
function ResetPassword() {
  const [email,setEmail] = useState('');
  const [sent,setSent] = useState(false);
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const resetAction = async (e) => {
    e.preventDefault();
    const response = await UserService.resetPwd(email);
    console.log(response);
    if (!response.error) {
      setSent(true);
    }
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
                {
                  sent ? <div>
                        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                          <h1 className="h1 mb-4">Password reset email has been sent !</h1>
                        </div>
                      </div> :
                      <div>
                        {/* Page header */}
                        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                          <h1 className="h1 mb-4">Let’s get you back up on your feet</h1>
                          <p className="text-xl text-gray-600">Enter the email address you used when you signed up for your account, and we’ll email you a link to reset your password.</p>
                        </div>

                        {/* Form */}
                        <div className="max-w-sm mx-auto">
                          <form>
                            <div className="flex flex-wrap -mx-3 mb-4">
                              <div className="w-full px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                                <input id="email" type="email" name="email" onChange={handleInput}  className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                              </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mt-6">
                              <div className="w-full px-3">
                                <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={resetAction}>Send reset link</button>
                              </div>
                            </div>
                          </form>
                        </div>

                      </div>}


              </div>
            </div>
          </section>

        </main>



      </div>
  );
}

export default ResetPassword;