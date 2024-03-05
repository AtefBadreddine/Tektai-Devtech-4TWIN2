import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type validation
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { FaEnvelope, FaLink, FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons/fa

const SearchTableComponent = ({ users }) => {
  const [userToDelete, setUserToDelete] = useState(null);

  const openGmail = (emailAddress) => {
    const encodedEmailAddress = encodeURIComponent(emailAddress);
    const gmailUrl = `https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${encodedEmailAddress}`;
    window.open(gmailUrl, '_blank');
  };

  const deleteUser = (user) => {
    setUserToDelete(user);
  };

  return (
    <div className="rounded-sm border-strokesm:px-7.5 xl:pb-1">
      <div className="max-w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Email
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Username
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    <span className="mr-2">
                      <FaEnvelope size={16} />
                    </span>
                    <button
                      className="text-black dark:text-white hover:text-orange-500"
                      onClick={() => openGmail(user.email)}
                    >
                      {user.email}
                    </button>
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    <a href={`/profile/${user.username}`} className="text-black dark:text-white flex items-center hover:text-blue-500">
                      <span className="mr-2">
                        <FaLink size={16} />
                      </span>
                      {user.username}
                    </a>
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    <a href={`https://wa.me/${user.phoneNumber}`} className="text-black dark:text-white relative flex items-center">
                      <span className="mr-2">
                        <FaWhatsapp size={32} color="green" />
                      </span>
                      <span className="text-black dark:text-white hover:text-green-500">
                        {user.phoneNumber}
                      </span>
                    </a>
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.image}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.birthdate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${user.role === 'admin'
                      ? 'bg-success text-success'
                      : user.role === 'challenger'
                        ? 'bg-danger text-danger'
                        : user.role === 'company'
                          ? 'bg-purple-500 text-purple-500'
                          : 'bg-warning text-warning'
                    }`}>
                    {user.role}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => deleteUser(user)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

SearchTableComponent.propTypes = {
  users: PropTypes.array.isRequired,
};

export default SearchTableComponent;
