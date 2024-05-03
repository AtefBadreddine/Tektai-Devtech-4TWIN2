import {Link} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import React from "react";


const CreateChallengeBlock = () => {
    return (
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Create Your Challenge Today!</h1>
            <p className="text-xl text-gray-600">Inspire creativity, foster innovation, and drive change by launching your challenge on our platform !
            </p>
            {/* Button */}
            <Link to="/challenges/create" className="btn-smm inline-flex items-center font-bold py-2 px-4 rounded-md mt-4 focus:outline-none">
                Create challenge <FaArrowRight className="ml-2" />
            </Link>
        </div>
    )
}

export default CreateChallengeBlock;