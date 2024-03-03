import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ChallengerImg from "../../images/dev.jpg";
import CompanyImg from "../../images/business.jpg";
import Header from '../../layout/Header';
<<<<<<< Updated upstream
import {useAuth} from "../../auth/AuthProvider";
=======
import AuthProvider from "../../auth/AuthProvider";
import UserService from "../../services/userService";
import userService from "../../services/userService";
import {useAuth} from "../../auth/useAuth";
import PhoneInput from 'react-phone-number-input';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
>>>>>>> Stashed changes
hii

function SignUp() {

  const [step,setStep] = useState(1);
  const [input, setInput] = useState({
    username : "",
    email: "",
    password: "",
    tel : "",
    birthday : "",
    companyName : "",
    adresse : "",
    role : "challenger"
    
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };





  const handleNext = () => {
    // Compare passwords
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Clear error and proceed to next step
    setError('');
    nextStep();
    setStep(prevStep => prevStep + 1);

  };


  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };
  return (
      <div className="flex flex-col min-h-screen overflow-hidden">

        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="flex-grow">

          <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                <div className="container mx-auto pb-10 max-w-2xl">


                  <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                    <li className={` ${ step === 1 ? 'text-blue-600' : 'text-gray-500'} flex md:w-full items-center   sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
            <span
                className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
           { step === 1 ?  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 20 20">
             <path
                 d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
           </svg> : <span className="me-2">1</span> }
              Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        </span>
                    </li>
                    <li className={` ${ step === 2 ? 'text-blue-600' : 'text-gray-500'} flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
        <span
            className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 ">
            { step === 2 ?  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
              <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg> : <span className="me-2">2</span> }
          Account <span className="hidden sm:inline-flex sm:ms-2">Type</span>
        </span>
                    </li>
                    <li className={` ${ step === 3 ? 'text-blue-600' : 'text-gray-500'} flex items-center`}>
                      { step === 3 ?  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                           fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                      </svg> : <span className="me-2">3</span> }
                      Finalizing
                    </li>
                  </ol>

                </div>

                {/* Form */}
                <div className=" max-w-2xl mx-auto">

                  {step === 1 && (
                      <div    className="mx-auto max-w-xl">
                        <StepOne
                            formData={input}
                            handleInput={handleInput}
                            handleNext={handleNext}
                            
                        />
                        <div className="flex items-center my-6">
                          <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                          <div className="text-gray-600 italic">Or</div>
                          <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                        </div>
                        <form>
                          <div className="flex flex-wrap -mx-3 mb-3">
                            <div className="w-full px-3">
                              <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                                <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                                </svg>
                                <span className="flex-auto pl-16 pr-8 -ml-16">Continue with GitHub</span>
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3">
                              <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                                <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                                </svg>
                                <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                              </button>
                            </div>
                          </div>
                        </form>
                        <div className="text-gray-600 text-center mt-6">
                          Already using Tektai? <Link to="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
                        </div>
                      </div>

                  )}
                  {step === 2 && (
                      <StepTwo
                          formData={input}
                          handleInput={handleInput} // Pass handleInput here
                          handleNext={handleNext}
                          handlePrevious={handlePrevious}
                      />
                  )}
                  {step === 3 && (
                      <StepThree
                          formData={input}
                          handleChange={handleInput}
                          handleNext={handleSubmit}
                          handlePrevious={handlePrevious}
                      />
                  )}

                </div>

              </div>
            </div>
          </section>

        </main>



      </div>
  );
}

const StepOne = ({ formData, handleInput, handleNext,handleSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => {
      const { value } = e.target;
      setConfirmPassword(value);
    };
    const handlePhoneChange = (value) => {
      if (value) {
        // Extract digits after the country code and plus sign
        const digitsAfterCountryCode = value.replace(/^\D+/, '');
        setPhoneNumber(digitsAfterCountryCode);
        handleInput({ target: { name: 'tel', value: digitsAfterCountryCode } });
      } else {
        setPhoneNumber(''); // Reset phone number if value is empty
        handleInput({ target: { name: 'tel', value: '' } }); // Reset tel field in formData
      }
    };
    
    
    
    
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form onSubmit={handleSubmit}>

<div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full px-3">
        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="username">
          Username <span className="text-red-600">*</span>
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInput}
          className="form-input w-full text-gray-800"
          placeholder="Enter your username"
          required
        />
        {formData.username.trim() === '' && <p className="text-red-600 text-sm mt-1">Username is required</p>}
      </div>
    </div>
    
    {/* Email Field */}
    <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full px-3">
        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInput}
          className="form-input w-full text-gray-800"
          placeholder="Enter your email address"
          required
        />
        {formData.email.trim() === '' && <p className="text-red-600 text-sm mt-1">Email is required</p>}
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              name="password"
              value={formData.password}
              onChange={handleInput}
              className="form-input w-full text-gray-800 pr-10"
              placeholder="Enter your password"
              required
              minLength="8"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$"
              />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (e.g., @$!%*?&).
          </p>
          {formData.password.trim() === '' && <p className="text-red-600 text-sm mt-1">Password is required</p>}
          {formData.password.length > 0 && formData.password.length < 8 && (
            <p className="text-red-600 text-sm mt-1">Password must be at least 8 characters long</p>
          )}
          {!/(?=.*[a-z])/.test(formData.password) && (
            <p className="text-red-600 text-sm mt-1">Password must contain at least one lowercase letter</p>
          )}
          {!/(?=.*[A-Z])/.test(formData.password) && (
            <p className="text-red-600 text-sm mt-1">Password must contain at least one uppercase letter</p>
          )}
          {!/(?=.*[@$!%*?&])/.test(formData.password) && (
            <p className="text-red-600 text-sm mt-1">Password must contain at least one special character (e.g., @$!%*?&)</p>
          )}
        </div>
      </div>

{/* Confirm Password Field */}
<div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="confirmPassword">
            Confirm Password <span className="text-red-600">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handlePasswordChange}
            className="form-input w-full text-gray-800"
            placeholder="Confirm your password"
            required
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
      </div>
            


















      {/* Phone Number Field */}
<div className="flex flex-wrap -mx-3 mb-4">
  <div className="w-full px-3">
    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="tel">
      Phone number <span className="text-red-600">*</span>
    </label>
    <PhoneInput
      id="tel"
      placeholder="Enter your phone number"
      value={phoneNumber}
      onChange={handlePhoneChange}
      className="form-input w-full sm:w-40 text-gray-800"
      minLength={8}
      maxLength={15}
      pattern="\d{8}"
      required
    />
    {formData.tel && (formData.tel.trim() === '' || !(/^\d{8}$/.test(formData.tel))) && (
      <p className="text-red-600 text-sm mt-1">Please enter a valid 8-digit phone number</p>
    )}
  </div>
</div>

      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="birthday">Date of birth <span className="text-red-600">*</span></label>
          <input id="birthday" type="date" name="birthday" onChange={handleInput} className="form-input w-full text-gray-800" required />
        </div>


      </div>

      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" type="submit">Sign up</button>
        </div>
      </div>
      <div className="text-sm text-gray-500 text-center mt-3">
        By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
      </div>
      </form>
  );
};

const StepTwo = ({ formData, handleInput, handleNext, handlePrevious }) => {
  console.log( "user",formData)
  const handleRole = (role) => {
    handleInput({ target: { name: 'role', value: role } });
    handleNext();
  }
  return (
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Choose Your Account Type</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div onClick={() => handleRole('challenger')} className="cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <img className="rounded-t-lg" src={ChallengerImg} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">Challenger</h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 text-center">Sign up as a challenger to participate in competitions.</p>
            </div>
          </div>
          <div onClick={() => handleRole('company') } className="cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <img className="rounded-t-lg" src={CompanyImg} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">Company</h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 text-center">Sign up as a company to post challenges and hire data scientists.</p>
            </div>
          </div>
        </div>
      </div>
  );
};

const StepThree = ( { formData, handleInput, handleNext, handlePrevious } ) => {
  console.log("step 3" ,formData)
  const auth = useAuth();
<<<<<<< Updated upstream
=======
  const navigate = useNavigate();
>>>>>>> Stashed changes
  const [submitted,setSubmitted] = useState(false);

  useEffect(() => {
          if (formData.role === 'challenger') {
              setTimeout(async () => {
                  await submit()
              }, 4000)
          }



  }, [])

  const submit = async () => {
      setSubmitted(true);
      const response = await UserService.signup(formData);
        console.log('res:',response)
      if (response.statusCode === 201) {
          const data = await userService.getJWT(formData.username, formData.password);
          console.log('data:',data)
          if (data && data.access_token) {
              const {access_token} = data;

              const user = await userService.getUser(access_token, formData.username)
                console.log('user:',user)
              auth.login(access_token, user);
              if (user && user.role === 'admin') {
                  navigate('/admin')
              } else {
                  navigate('/')
              }
          }

      }
      else {
         return  <div className="">
              <h1 className="h2 text-red-600 pb-4">An Error Ocuured ! </h1>
              <div className="inline-flex gap-x-2">You will be redirected to home page in few seconds
              </div>
          </div>
      }
  }
    if (formData.role === 'challenger' || submitted === true) {
        return (
            <div className="">
                <h1 className="h2 text-blue-600 pb-4">You are all set ! </h1>
                <div className="inline-flex gap-x-2">You will be redirected to challenges page in few seconds

                    <div role="status">
                        <svg aria-hidden="true"
                             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className="h2 text-blue-600 pb-8">You are almost done ! </h1>
                <form onSubmit={submit}>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="companyName">Company
                                name <span className="text-red-600">*</span></label>
                            <input id="companyName" type="text" name="companyName" onChange={handleInput}
                                   className="form-input w-full text-gray-800" placeholder="Enter your company name"
                                   required/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="adresse">Legal
                                Address <span className="text-red-600">*</span></label>
                            <input id="adresse" type="text" name="adresse" onChange={handleInput}
                                   className="form-input w-full text-gray-800" placeholder="Enter your email address"
                                   required/>
                        </div>
                    </div>


                    <div className="flex flex-wrap mx-auto max-w-xs mt-6">
                        <div className="w-full px-3">
                            <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                                    type="submit">Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;