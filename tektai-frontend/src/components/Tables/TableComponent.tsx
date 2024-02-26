import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type validation

const TableComponent = ({ data }) => {
  return (
    <div className="rounded-sm  border-strokesm:px-7.5 xl:pb-1">
      <div className="max-w-full ">
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
              phoneNumber
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              image
              </th>
              
              <th className="py-4 px-4 font-medium text-black dark:text-white">
              birthdate
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
              Role
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
              Actions
              </th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.email}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.username}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.phoneNumber}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.image}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.birthdate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                           packageItem.role === 'admin'
                        ? 'bg-success text-success'
                        : packageItem.role === 'challenger'
                        ? 'bg-danger text-danger'
                        : packageItem.role === 'company'
                        ? 'bg-purple-500 text-purple-500'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {packageItem.role}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
  <div className="flex items-center space-x-3.5">
    <button className="hover:text-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M13.293 4.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L6 10.586l6.293-6.293a1 1 0 0 1 1.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Update
    </button>
    <button className="hover:text-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h2a1 1 0 0 1 0 2h-1v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5H5a1 1 0 0 1 0-2h2V5z"
          clipRule="evenodd"
        />
      </svg>
      Delete
    </button>
  </div>
</td>

               
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      {/* Button 1 */}
                    </button>
                    <button className="hover:text-primary">
                      {/* Button 2 */}
                    </button>
                    <button className="hover:text-primary">
                      {/* Button 3 */}
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

// Define PropTypes for data prop
TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableComponent;
