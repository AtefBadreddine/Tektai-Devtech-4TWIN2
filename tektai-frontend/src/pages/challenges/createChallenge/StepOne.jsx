import React from 'react';

function StepOne({ formData, errors, handleChange, nextStep }) {
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any additional validation for Step 1 if needed
        nextStep(); // Proceed to next step
    };

    return (
        <div>
            <h3 className="text-xl mb-4 font-bold">Start a Challenge</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <h5 className="mb-2 font-bold">Challenge title:</h5>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter a descriptive title"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                    <h5 className="mb-2 font-bold">Challenge Details</h5>
                    <textarea
                        name="description"
                        placeholder="Provide a description explaining what participants will do."
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="8"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" type="submit">
                    Next
                </button>
            </form>
        </div>
    );
}

export default StepOne;
