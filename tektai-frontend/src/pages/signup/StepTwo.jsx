import React from "react";
import ChallengerImg from "../../images/dev.jpg";
import CompanyImg from "../../images/business.jpg";

export default function StepTwo({ formData, handleInput, handleNext, handlePrevious }) {
    const handleRole = (role) => {
        handleInput({ target: { name: 'role', value: role } });
        handleNext();
    };

    const handleBack = () => {
        handlePrevious();
    };

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
                <div onClick={() => handleRole('company')} className="cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            <div className="flex flex-wrap mx-auto max-w-xs mt-6">
                <div className="w-full px-3">
                    <button className="btn text-white bg-gray-600 hover:bg-gray-700 w-full" onClick={handleBack}>Back</button>
                </div>
            </div>
        </div>
    );
}
