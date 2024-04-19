// @ts-ignore
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, useDisclosure, Tooltip, Table, Tbody, Tr, Td, Thead, Th,
} from '@chakra-ui/react'

import userService from "../../services/userService";
import {FaArrowDown, FaArrowUp, FaEdit, FaEnvelope, FaLink, FaWhatsapp, FaBan, FaCheck, FaUser} from 'react-icons/fa'; // Import WhatsApp icon from react-icons/fa
import Updatedraw from './updatedrawer';
import ExportToExcel from './xlx';
import ExportToPDF from './pdf';
import {FaTrashCan} from "react-icons/fa6";
import {Pagination} from "flowbite-react";


const TableComponent = () => {
  const [userToDelete, setUserToDelete] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Set
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
      fetchUsers();
  }, []);
  const sortData = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked again, toggle sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If a new column is clicked, set it as the sort column and default to ascending order
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  const sortedData = [...data].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  // @ts-ignore
  const blockUser = async(user)  => {
    const blocked = await userService.banUser(user._id);
    if (blocked) {
        fetchUsers();
    }
  }  // @ts-ignore

  const fetchUsers = async () => {

    const userData = await userService.getAll();
    if (!userData.error)
      setData(userData);
  };

  const openGmail = (emailAddress) => {
    const encodedEmailAddress = encodeURIComponent(emailAddress);
    const gmailUrl = `https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${encodedEmailAddress}`;
    console.log(gmailUrl);
    window.open(gmailUrl, '_blank');
  };
  const finalRef = React.useRef(null)
  // @ts-ignore
  const deleteUser = async (): Promise<void> => {
    const response = await userService.deleteUser(userToDelete._id);
    if (!response.error) {
      setData(data.filter(item => item._id !== userToDelete._id));
      setUserToDelete(null);
    }
  }
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedData.slice(indexOfFirstUser, indexOfLastUser);


  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // @ts-ignore
  // @ts-ignore
  return (
    <div className="rounded-sm  border-strokesm:px-7.5 xl:pb-1">
      <div className="max-w-full ">
        <div className="flex py-4 gap-x-2">
          <ExportToExcel users={data}/>
          <ExportToPDF users={data}/>
        </div>
        <div className="overflow-x-auto w-full">
          <Table variant="simple" className="w-full">
            <Thead>
              <Tr>
                <Th>User</Th> {/* Combine Email and Username */}
                <Th className="hidden md:table-cell">Phone Number</Th> {/* Hide on small devices */}
                <Th>Role</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentUsers?.map((packageItem, key) => (
                  <Tr key={key}>
                    <Td>
                      <Tooltip label="Send an Email">
                        <div className="inline-flex gap-x-1 justify-center items-center">

                          <button onClick={() => openGmail(packageItem.email)} className="flex flex-col gap-1">
                            <div  className="inline-flex gap-x-1 items-center">
                              <FaUser size={16} color="darkblue" />
                              {packageItem.username}
                            </div>
                            <div className="inline-flex gap-x-1 items-center">
                              <FaEnvelope size={16} color="darkblue" />
                              {packageItem.email}
                            </div>
                          </button>
                        </div>
                      </Tooltip>
                    </Td>
                    <Td className="hidden md:table-cell"> {/* Hide on small devices */}
                      <Tooltip label="Contact on Whatsapp">
                        <div className="inline-flex gap-x-1 justify-center items-center">
                          <FaWhatsapp size={32} color="green" />
                          <a href={`https://wa.me/${packageItem.phoneNumber}`}>
                            {packageItem.phoneNumber}
                          </a>
                        </div>
                      </Tooltip>
                    </Td>
                    <Td>
          <span
              className={`rounded-full py-1 px-3 text-sm font-medium text-white ${
                  packageItem.role === 'admin'
                      ? 'bg-success'
                      : packageItem.role === 'challenger'
                          ? 'bg-danger'
                          : packageItem.role === 'company'
                              ? 'bg-purple-500'
                              : 'bg-warning text-warning'
              }`}
          >
            {packageItem.role}
          </span>
                    </Td>
                    <Td>
                      <div className="flex items-center space-x-3.5">
                        <Updatedraw user={packageItem} RefreshUsersList={fetchUsers} />
                        <button
                            className="inline-flex justify-center items-center gap-x-0.5 text-red-600 hover:text-red-800"
                            onClick={() => setUserToDelete(packageItem)}
                        >
                          <FaTrashCan />
                          Delete
                        </button>
                        {packageItem?.isBlocked ? (
                            <button
                                color="green"
                                className="inline-flex text-green-600 justify-center items-center gap-x-1 hover:text-primary"
                                onClick={() => blockUser(packageItem)}
                            >
                              <FaCheck color="green" />
                              Unban
                            </button>
                        ) : (
                            <button
                                color="black"
                                className="inline-flex text-black-600 justify-center items-center gap-x-1 hover:text-primary"
                                onClick={() => blockUser(packageItem)}
                            >
                              <FaBan color="black" />
                              Ban
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
              totalPages={Math.ceil(sortedData.length / usersPerPage)}
              onPageChange={onPageChange}
          />
        </div>

        <Modal finalFocusRef={finalRef} isOpen={userToDelete !== null} onClose={() => setUserToDelete(null)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="relative p-4 text-center  sm:p-5">
                <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this user {userToDelete?.username} ?</p>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => setUserToDelete(null)}>
                No, cancel
              </Button>
              <Button colorScheme='red' onClick={deleteUser}> Yes, I'm sure</Button>


            </ModalFooter>
          </ModalContent>
        </Modal>
        <div id="deleteModal" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">

            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
              <div className="flex justify-center items-center space-x-4">
                <button data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  No, cancel
                </button>
                <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};




export default TableComponent;
