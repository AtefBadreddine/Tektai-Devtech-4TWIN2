import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
// import styles from './CrmForm.module.css'; // Import CSS Module

const CrmForm = () => {
  const [crmData, setCrmData] = useState({
    aboutUs: '',
    termsOfService: '',
    instagram: '',
    facebook: '',
    github: '',
    linkedin: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    localStorage.setItem('crm', JSON.stringify(crmData)); // Store in local storage
    alert('CRM data submitted successfully!'); // Clear form or provide success feedback
    setCrmData({ // Reset form state to clear fields
      aboutUs: '',
      termsOfService: '',
      instagram: '',
      facebook: '',
      github: '',
      linkedin: '',
    });
  };

  const handleChange = (event) => {
    setCrmData({ ...crmData, [event.target.name]: event.target.value });
  };

  // Fetch CRM data from local storage on component mount
  useEffect(() => {
    const storedCrmData = localStorage.getItem('crm');
    if (storedCrmData) {
      try {
        const parsedCrmData = JSON.parse(storedCrmData);
        setCrmData(parsedCrmData);
      } catch (error) {
        console.error('Error parsing CRM data from local storage:', error);
        // Handle potential parsing errors gracefully (e.g., reset form or display an error message)
      }
    }
  }, []);

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} class="w-full flex flex-col gap-4">
  <h2 class="text-xl font-bold mb-4">CRM Information</h2>
  <div class="flex flex-col">
    <label for="aboutUs" class="mb-1">About Us:</label>
    <textarea id="aboutUs" name="aboutUs" value={crmData.aboutUs} onChange={handleChange} rows="5" cols="30" required class="resize-none border rounded-md p-2"></textarea>
  </div>
  <div class="flex flex-col">
    <label for="termsOfService" class="mb-1">Terms of Service:</label>
    <textarea id="termsOfService" name="termsOfService" value={crmData.termsOfService} onChange={handleChange} rows="5" cols="30" required class="resize-none border rounded-md p-2"></textarea>
  </div>
  <div class="flex flex-col">
    <label for="instagram" class="mb-1">Instagram Link:</label>
    <input type="url" id="instagram" name="instagram" value={crmData.instagram} onChange={handleChange} required class="border rounded-md p-2 focus:outline-none"/>
  </div>
  <div class="flex flex-col">
    <label for="facebook" class="mb-1">Facebook Link:</label>
    <input type="url" id="facebook" name="facebook" value={crmData.facebook} onChange={handleChange} required class="border rounded-md p-2 focus:outline-none"/>
  </div>
  <div class="flex flex-col">
    <label for="github" class="mb-1">Github Link:</label>
    <input type="url" id="github" name="github" value={crmData.github} onChange={handleChange} required class="border rounded-md p-2 focus:outline-none"/>
  </div>
  <div class="flex flex-col">
    <label for="linkedin" class="mb-1">LinkedIn Link (Optional):</label>
    <input type="url" id="linkedin" name="linkedin" value={crmData.linkedin} onChange={handleChange} class="border rounded-md p-2 focus:outline-none"/>
  </div>
  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none">Submit</button>
</form>

    </DefaultLayout>
  );
};

export default CrmForm;
