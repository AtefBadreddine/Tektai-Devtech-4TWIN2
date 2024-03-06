import React from 'react';
import { Button } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import jspdf-autotable plugin

function ExportToPDF({ users }) {
  const exportToPDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Define the columns for the table
    const columns = [
      'username',
        'email',
        'role',
        'phoneNumber',
        'birthday',
        'companyName',
    ];

    // Create an empty array to hold the table data
    const data = [];

    // Iterate over the users array and extract data
    users.forEach(user => {
      const rowData = [];
      columns.forEach(column => {
        rowData.push(user[column]);
      });
      data.push(rowData);
    });

    // Set the title for the table
    const title = 'Users';

    // Check if autoTable function is available
    if (typeof pdf.autoTable === 'function') {
      // AutoTable plugin for jsPDF to generate table
      const tableOptions = {
        head: [columns], // Column headers
        body: data, // Table data
        startY: 20, // Y position to start the table
        theme: 'striped', // Table theme
        headStyles: { fillColor: [100, 100, 255], textColor: [255, 255, 255], fontSize: 10 }, // Header styles
        styles: { textColor: [0, 0, 0], fontSize: 10, cellPadding: 2 }, // Table body styles
        columnStyles: { 0: { cellWidth: 40 } }, // Column-specific styles (e.g., column width)
        margin: { top: 20, bottom: 20, left: 5, right: 5 }, // Table margins
        showHead: 'firstPage', // Show header on the first page only
      };

// Generate the table using autoTable plugin
      pdf.autoTable(tableOptions);

      // Save the PDF file
      pdf.save('users.pdf');
    } else {
      console.error('autoTable function not found');
    }
  };

  return (
    <Button colorScheme="blue" onClick={exportToPDF}>
      Export to PDF
    </Button>
  );
}

export default ExportToPDF;
