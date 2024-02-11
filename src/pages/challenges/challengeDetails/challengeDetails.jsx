import Header from "../../../layout/Header";
import React from "react";
import Footer from "../../../layout/Footer";


function challengeDetails() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header/>
            <main className="flex-grow container mx-auto space-y-12">
                <div className=" min-h-screen mt-32">
                    <main className="container mx-auto py-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4">The Challenge</h2>
                                <p className="text-gray-600 mb-4">The sinking of the Titanic is one of the most infamous shipwrecks in history. On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg.</p>
                                <p className="text-gray-600 mb-4">In this challenge, we ask you to build a predictive model that answers the question: “what sorts of people were more likely to survive?” using passenger data (ie name, age, gender, socio-economic class, etc).</p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000"
                                    alt="Kaggle Competition"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">How to Submit your Prediction to Kaggle</h2>
                                    <p className="text-gray-600 mb-4">Once you’re ready to make a submission and get on the leaderboard:</p>
                                    <ol className="list-decimal list-inside text-gray-600">
                                        <li>Click on the “Submit Predictions” button</li>
                                        <li>Upload a CSV file in the submission file format. You’re able to submit 10 submissions a day.</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
                                    alt="Kaggle Competition"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">Recommended Tutorial</h2>
                                    <p className="text-gray-600 mb-4">We highly recommend Alexis Cook’s Titanic Tutorial that walks you through making your very first submission step by step and this starter notebook to get started.</p>
                                    <a href="#" className="text-blue-600 hover:underline">Read more</a>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            </main>
            <Footer/>
        </div>
    );




}

export default challengeDetails;