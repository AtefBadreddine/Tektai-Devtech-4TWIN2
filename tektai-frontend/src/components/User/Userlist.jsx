import React, { useState, useEffect } from 'react';

import TableComponent from '../Tables/TableComponent';
import userService from "../../services/userService";
import {useAuth} from "../../auth/useAuth";
const UserList = () => {

  return (
    <div>
      <h2>User List</h2>
      <TableComponent />
    </div>
  );
};

export default UserList;
