import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { Link } from "react-router-dom";

function CreateChallenge() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            <main className="flex-grow container mx-auto max-w-3xl pb-8 mt-32">
                <div className="mx-6">
                    <h3 className="text-xl mb-4 font-bold">Start a Challenge</h3>
                    <p className="mb-10">Our free, self-service platform is ideal for educators, small businesses, or AI enthusiasts. Need to tackle challenging AI problems? Explore our <Link to="/challenges" className="text-blue-500">Featured Challenges</Link>.</p>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4 sm:col-span-5 md:col-span-7">
                            <div className="mb-6">
                                <h5 className="mb-2 font-bold">Initial Setup</h5>
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="Enter a descriptive title" className="w-full p-2 border border-gray-300 rounded"/>
                            </div>
                            <div className="mb-4">
                                <textarea placeholder="Provide a description explaining what participants will do." className="w-full p-2 border border-gray-300 rounded" rows="8"></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dataset" className="block mb-2 font-bold">Upload Dataset</label>
                                <input type="file" id="dataset" className="w-full p-2 border border-gray-300 rounded"/>
                            </div>


                            <div className="mb-4">
                                <h5 className="mb-2 font-bold">Privacy, Access & Resources</h5>
                            </div>
                            <div className="mb-4">
                                <div className="mb-4">
                                    <p className="mb-2 font-bold">Visibility *</p>
                                    <select className="w-full p-2 border border-gray-300 rounded">
                                        <option>Public</option>
                                        <option>Private</option>
                                    </select>
                                    <p className="text-sm text-gray-500">The challenge will be visible on TektAI.</p>
                                </div>
                                <div className="mb-4">
                                    <p className="mb-2 font-bold">Eligible Participants *</p>
                                    <select className="w-full p-2 border border-gray-300 rounded">
                                        <option>Anyone</option>
                                        <option>Invitation-only</option>
                                    </select>
                                    <p className="text-sm text-gray-500">Participants can join via TektAI or by using the challenge URL.</p>
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <label className="mb-2">Enable Notebooks and Models</label>
                                    </div>
                                    <p className="text-sm text-gray-500">Allow participants to work directly on TektAI with your dataset using Notebooks. Disable this option for increased privacy. <span className="underline">Learn more.</span></p>
                                </div>
                            </div>
                            <div className="my-8">
                                <span className="mb-4 font-bold">Terms of Agreement *</span>
                                <div className="inline-flex items-center">
                                    <input type="checkbox" className="mr-2"/>
                                    <p>I agree to comply with TektAI’s terms and conditions and will not offer monetary rewards without prior approval from the TektAI Team.</p>
                                </div>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Create Challenge</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CreateChallenge;
