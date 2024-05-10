import React, { useState, useEffect } from 'react';


import {
    Breadcrumb, Button,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr
} from '@chakra-ui/react';
import DefaultLayout from "../../../layout/DefaultLayout";
import {FaBan, FaCaretSquareUp, FaCheck, FaEnvelope, FaEye, FaMoneyBill, FaUser, FaWhatsapp} from "react-icons/fa";
import {FaCircleInfo, FaTrashCan} from "react-icons/fa6";
import {Pagination} from "flowbite-react";
import axios from "axios";
import UsersService from "../../../services/userService";
import updateChallenge from "../../challenges/updateChallenge";

const ApproveChallenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [displayedChallenges, setDisplayedChallenges] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [challengesPerPage] = useState(8);
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const indexOfLastChallenge = currentPage * challengesPerPage;
        const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
        const newchallenges = challenges.slice(indexOfFirstChallenge,indexOfLastChallenge);
        setDisplayedChallenges(newchallenges);
    },[currentPage])
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

    const fetchUser = async (userId) => {
        return  await UsersService.getUserById(userId);
    }
    const fetchChallenges = async () => {
        try {
            const response = await axios.get(`${API_URL}/challenges`);
            Promise.all(response.data.map(async (challenge) => {
                const user = await fetchUser(challenge.company_id);
                challenge['user'] = user._id ? user : null;
                return challenge;
            })).then(updatedChallenges => {

                setChallenges(updatedChallenges); // Reverse the array of challenges
                const indexOfLastChallenge = currentPage * challengesPerPage;
                const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
                const newchallenges = updatedChallenges.slice(indexOfFirstChallenge,indexOfLastChallenge);
                setDisplayedChallenges(newchallenges);
            }).catch(error => {
            });



        } catch (error) {
            console.error('Error fetching challenges:', error);
        }
    };

    useEffect(() => {


        fetchChallenges();
    }, []);

    const handleApprove = async (challenge) => {
        let token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `${API_URL}/challenges/approve/${challenge._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
          await fetchChallenges();
        } catch (error) {
            return { error: "failed" };
        }
    }
    return (
        <DefaultLayout>

            <div className="rounded-sm  border-strokesm:px-7.5 xl:pb-1">
                <div className="max-w-full ">
               {/*     <div className="flex py-4 gap-x-2">
                        <ExportToExcel users={data}/>
                        <ExportToPDF users={data}/>
                    </div>*/}
                    <div className="overflow-x-auto w-full">
                        <Table variant="simple" className="w-full">
                            <Thead>
                                <Tr>
                                    <Th>Challenge</Th> {/* Combine Email and Username */}
                                    <Th className="hidden md:table-cell">Description</Th> {/* Hide on small devices */}
                                    <Th>Additional info</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {displayedChallenges?.map((packageItem, key) => (
                                    <Tr key={key}>
                                        <Td>

                                                <div className="inline-flex gap-x-1 justify-center items-center">

                                                    <button  className="flex flex-col gap-1">
                                                        <div  className="inline-flex gap-x-1 items-center">
                                                           <span className="font-bold">Title :</span>  {packageItem.title}
                                                        </div>
                                                        <div className="inline-flex gap-x-1 items-center">
                                                         <span className="font-bold">Company: </span>   {packageItem.user?.username}
                                                        </div>
                                                    </button>
                                                </div>

                                        </Td>
                                        <Td className="hidden md:table-cell"> {/* Hide on small devices */}

                                                <div className="inline-flex gap-x-1 justify-center items-center">
                                                        {packageItem.description}
                                                </div>

                                        </Td>
                                        <Td className=""> {/* Hide on small devices */}

                                            <div className="inline-flex gap-x-2 justify-center items-center">
                                                <div className="inline-flex gap-x-1"><FaMoneyBill color="blue" /> Prize:  {packageItem.prize} DT</div>
                                                <div className="inline-flex gap-x-1"><FaEye color="orange" />Visibility : {packageItem.visibility}</div>
                                            </div>

                                        </Td>
                                        <Td>
                                            <div className="flex items-center space-x-3.5">
                                                {packageItem?.approved ? (
                                                    <button
                                                        color="black"
                                                        className="inline-flex text-black-600 justify-center items-center gap-x-1 hover:text-primary"
                                                        onClick={() => handleApprove(packageItem)}
                                                    >
                                                        <FaBan color="red" />
                                                        Reject
                                                    </button>
                                                ) : (
                                                    <button
                                                    color="green"
                                                    className="inline-flex text-green-600 justify-center items-center gap-x-1 hover:text-primary"
                                                    onClick={() => handleApprove(packageItem)}
                                            >
                                                <FaCheck color="green" />
                                                Approve
                                            </button>
                                                )}
                                            </div>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                    </div>


                <div className="flex overflow-x-auto justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(challenges.length / challengesPerPage)}
                            onPageChange={onPageChange}
                        />
                </div>


                </div>
            </div>




        </DefaultLayout>


    );
};

export default ApproveChallenges;
