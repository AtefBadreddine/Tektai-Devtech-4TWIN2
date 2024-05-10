import {useEffect, useState} from "react";
import {useAuth} from "../../../auth/useAuth";
import axios from "axios";
import userService from "../../../services/userService";

const Stats = () => {
    const auth = useAuth();
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';
    const [stats,setStats] = useState({
        all : 0,
        completed : 0,
        ongoing : 0,
        upcoming : 0
    });
    const fetchChallengeCounts = async (id) => {
        try {
            const path = `${API_URL}/challenges/count/${id}`;
            const response = await axios.get(path);
            return  response.data;
        } catch (error) {
            console.error('Error fetching challenge counts:', error);
            return 0;
        }
    };
    const fetchcompletedCounts = async (id) => {
        try {
            const path = `${API_URL}/challenges/completed/${id}`;
            const response = await axios.get(path);
            return  response.data;

        } catch (error) {
            console.error('Error fetching challenge counts:', error);
            return 0;
        }
    };
    const fetchongoingCounts = async (id) => {
        try {
            const path = `${API_URL}/challenges/ongoing/${id}`;
            const response = await axios.get(path);
            return response.data;

        } catch (error) {
            console.error('Error fetching challenge counts:', error);
            return 0;
        }
    };
    const fetchupcomingCounts = async (id) => {
        try {
            const path = `${API_URL}/challenges/upcoming/${id}`;

            const response = await axios.get(path);
            return  response.data;

        } catch (error) {
            console.error('Error fetching challenge counts:', error);
            return 0;
        }
    };
    const fetchCompanyStats =async (id) => {
        const all = await  fetchChallengeCounts(id);
        const completed = await  fetchcompletedCounts(id);
        const ongoing = await  fetchongoingCounts(id);
        const upcoming = await  fetchupcomingCounts(id);
        return {
            all,
            completed,
            ongoing,
            upcoming
        };
    }
    useEffect( () => {

        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const user = await userService.getConnectedUser(token);
                const stats = await fetchCompanyStats(user._id);
                setStats(stats);
            }
        }

        fetchUser();

        },[])
    return (
        <div className="p-16 w-full mx-auto xl:max-w-3/4">
            <div className="grid gap-4 lg:gap-8 grid-cols-2 lg:grid-cols-4 sm:p-8 pt-20">
                <div className="relative p-2 sm:p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                        <div
                            className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                            <span>My challenges</span>
                        </div>

                        <div className="text-3xl dark:text-gray-100">
                            { stats.all }
                        </div>

                        <div
                            className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-blue-600">

                            <span>All challenges</span>

                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                 fill="currentColor"
                                 aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="relative p-2 sm:p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                        <div
                            className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                            <span>Ongoing</span>
                        </div>

                        <div className="text-3xl dark:text-gray-100">
                            { stats.ongoing }
                        </div>

                        <div
                            className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">

                            <span>Ongoing challenges</span>

                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                 fill="currentColor"
                                 aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="relative p-2 sm:p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                        <div
                            className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                            <span>Completed</span>
                        </div>

                        <div className="text-3xl dark:text-gray-100">
                            { stats.completed }
                        </div>

                        <div
                            className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">

                            <span>Completed challenges</span>

                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                 fill="currentColor"
                                 aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>

                </div>

                <div className="relative p-2 sm:p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                    <div className="space-y-2">
                        <div
                            className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">

                            <span>Upcoming</span>
                        </div>

                        <div className="text-3xl dark:text-gray-100">
                            { stats.upcoming }
                        </div>

                        <div
                            className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-yellow-400">

                            <span>Upcoming challenges</span>

                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                 fill="currentColor"
                                 aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;