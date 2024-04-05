import React, { useState, useEffect } from 'react';

import TableComponent from '../Tables/TableComponent';
import DefaultLayout from '../../layout/DefaultLayout';
import { Breadcrumb } from '@chakra-ui/react';

const UserList = () => {

  return (
    <DefaultLayout>
          <Breadcrumb pageName="Settings" />

      {/* <Header /> */}
    <TableComponent/>
    
    
    </DefaultLayout>

     
  );
};

export default UserList;
