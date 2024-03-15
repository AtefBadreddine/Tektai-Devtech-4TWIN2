import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import Header from '../../layout/Header';
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepOnePartOne from './StepOnePartOne';
import StepOnePartTwo from './StepOnePartTwo';
import Footer from "../../layout/Footer"; // Import eye icons

function SignUp( ) {
    const [step,setStep] = useState(0);
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

    const [fromAuth,setFromAuth] = useState({
        username : '',
        email : ''
    });
    /*    const searchParams = new URLSearchParams(window.location.search);*/
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        const email = searchParams.get('email');
        const username = searchParams.get('username')
        if (username) {
            setFromAuth(prevState => ({
                ...prevState,
                username: username
            }));
        }
        if (email) {
            setFromAuth(prevState => ({
                ...prevState,
                email: email
            }));
        }



    },[])


    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNext = () => {
        setStep(prevStep => prevStep + 1);
    };
    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();


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

                            <div className="container mx-auto pb-10 max-w-2xl">


                                <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                                    <li className={` ${ step === 1 ? 'text-blue-600' : 'text-gray-500'} flex md:w-full items-center   sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
            <span
                className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
           { step === 1 ?
               <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
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
                                { fromAuth.username.length ? <h2 className="mb-4">Welcome <span className="font-bold text-blue-600">{fromAuth.username}</span> ,Please continue the sign up process !</h2> : '' }
                                {step === 0 && (
                                    <div    className="mx-auto max-w-xl">
                                        <div>
                                            <StepOnePartOne
                                                step={step}
                                                formData={input}
                                                fromAuth={fromAuth}
                                                handleInput={handleInput}
                                                handleNext={handleNext}
                                            />

                                        </div>
                                        {
                                            !fromAuth.email.length && (
                                                <div className="flex flex-col items-center my-6">
                                                    <div className="text-gray-600 italic mb-3">Or</div>
                                                    <div className="flex flex-col space-y-3">
                                                        <a
                                                            href="http://localhost:3000/auth/github"
                                                            rel="noopener noreferrer"
                                                            target="_self"
                                                            className="btn text-white bg-gray-900 hover:bg-gray-800 w-full flex items-center"
                                                            onClick={(e) => e.preventDefault()} // Prevent default behavior
                                                        >
                                                            <svg
                                                                className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                                                                viewBox="0 0 16 16"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                                                            </svg>
                                                            <span className="flex-auto pl-16 pr-8 -ml-16">Continue with GitHub</span>
                                                        </a>
                                                        <a
                                                            href="http://localhost:3000/auth/google"
                                                            rel="noopener noreferrer"
                                                            target="_self"
                                                            className="btn text-white bg-red-600 hover:bg-red-700 w-full flex items-center"
                                                            onClick={(e) => e.preventDefault()} // Prevent default behavior
                                                        >
                                                            <svg
                                                                className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                                                                viewBox="0 0 16 16"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                                                            </svg>
                                                            <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                                                        </a>
                                                    </div>
                                                    <div className="text-gray-600 text-center mt-6">
                                                        Already using Tektai?{' '}
                                                        <Link to="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">
                                                            Sign in
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>

                                )}
                                {step === 1 && (
                                    <StepOnePartTwo
                                        formData={input}
                                        handleInput={handleInput}
                                        handleNext={handleNext}
                                        handlePrevious={handlePrevious}
                                    />
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


            {/* <Footer/> */}
        </div>
    );
}




export default SignUp;