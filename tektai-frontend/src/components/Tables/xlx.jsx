import React from 'react';
import { Button } from '@chakra-ui/react';
import * as XLSX from 'xlsx';

function ExportToExcel({ users }) {
  const exportToExcel = () => {
    const data = users.map(user => ({
      Username: user.username,
      Email: user.email,
      Role: user.role,
      PhoneNumber: user.phoneNumber,
      Birthday: user.birthday,
      CompanyName: user.companyName,
      Address: user.address,

    }));
    const worksheet = XLSX.utils.json_to_sheet(data);

// Auto-size columns
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const wscols = [];
    for (let i = range.s.c; i <= range.e.c; i++) {
      wscols[i] = { wch: 20 }; // Set the default width to 20 (adjust as needed)
    }
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

// Save the Excel file
    XLSX.writeFile(workbook, 'users.xlsx');

  };

  return (

    <Button colorScheme="green" onClick={exportToExcel}>
      Export to Excel
    </Button>
  );
}

export default ExportToExcel;
