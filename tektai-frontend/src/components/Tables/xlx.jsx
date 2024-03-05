import React from 'react';
import { Button } from '@chakra-ui/react';
import * as XLSX from 'xlsx';

function ExportToExcel({ users }) {
  const exportToExcel = () => {
    const data = users.map(user => ({
      UserId: user.userId,
      Username: user.username,
      Email: user.email,
      PhoneNumber: user.phoneNumber,
      Birthday: user.birthday,
      CompanyName: user.companyName,
      Address: user.address,
      Role: user.role,
      BPTS: user.bpts,
      GPTS: user.gpts,
      SPTS: user.spts
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    // Save the Excel file
    XLSX.writeFile(workbook, 'users.xlsx');
  };

  return (
    <Button colorScheme="blue" onClick={exportToExcel}>
      Export to Excel
    </Button>
  );
}

export default ExportToExcel;
