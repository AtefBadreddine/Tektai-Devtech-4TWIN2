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
    const columns = Object.keys(users[0]);

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
      pdf.autoTable({
        head: [columns],
        body: data,
        startY: 20,
        theme: 'striped',
        headStyles: { fillColor: [100, 100, 255] },
        columnStyles: { 0: { cellWidth: 40 } }, // Adjust column width if necessary
      });

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
