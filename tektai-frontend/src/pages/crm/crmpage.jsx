import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

const CrmForm = () => {
  const [crmData, setCrmData] = useState({
    about: '',
    termsOfService: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/settings/65f8a38e39a328e497879df2');
        const { about, termsOfService } = response.data;
        setCrmData({ about, termsOfService });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
  
    fetchSettings();
  }, []);
  

  const handleChange = (event) => {
    setCrmData({ ...crmData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('http://localhost:3000/settings/65f8a38e39a328e497879df2', crmData);
      alert('CRM data updated successfully!');
    } catch (error) {
      console.error('Error updating CRM data:', error);
      alert('Failed to update CRM data. Please try again later.');
    }
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">CRM Information</h2>
        <div className="flex flex-col">
          <label htmlFor="about" className="mb-1">About Us:</label>
          <textarea id="about" name="about" value={crmData.about} onChange={handleChange} rows="5" cols="30" required className="resize-none border rounded-md p-2"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="termsOfService" className="mb-1">Terms of Service:</label>
          <textarea id="termsOfService" name="termsOfService" value={crmData.termsOfService} onChange={handleChange} rows="5" cols="30" required className="resize-none border rounded-md p-2"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none">Submit</button>
      </form>
    </DefaultLayout>
  );
};

export default CrmForm;
