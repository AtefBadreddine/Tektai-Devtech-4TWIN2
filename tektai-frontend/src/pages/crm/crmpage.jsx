import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

const CrmForm = () => {
  const [crmData, setCrmData] = useState({
    about: '',
    termsOfService: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    github: '',
  });

  const [termTitles, setTermTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [termData, setTermData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/settings/65f8a38e39a328e497879df2');
        const { about, termsOfService, facebook, linkedin, twitter, github } = response.data;
        setCrmData({ about, termsOfService, facebook, linkedin, twitter, github });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    const fetchTermTitles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/term');
        const titles = response.data.map(term => term.title);
        setTermTitles(titles);
      } catch (error) {
        console.error('Error fetching term titles:', error);
      }
    };

    fetchSettings();
    fetchTermTitles();
  }, []);
  const handleTitleSelect = async (selectedTitle) => {
    try {
      const response = await axios.get(`http://localhost:3000/term/title/${selectedTitle}`);
      if (response.data && response.data.content) {
        setTermData({ title: selectedTitle, content: response.data.content });
      }
    } catch (error) {
      console.error('Error fetching term content:', error);
    }
  };
  

  const handleChange = (event) => {
    setCrmData({ ...crmData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Update settings
      await axios.put('http://localhost:3000/settings/65f8a38e39a328e497879df2', crmData);
  
      // Update term by title
      await axios.put(`http://localhost:3000/term/title/${termData.title}`, termData);
  
      alert('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update data. Please try again later.');
    }
  };
  
  
  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">CRM Information</h2>
        <div className="flex flex-col">
          <label htmlFor="about" className="mb-1">About Us:</label>
          <textarea id="about" name="about" value={crmData.about} onChange={handleChange} rows="5" cols="30" required className="resize-none border rounded-md p-2 dark:text-black"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="termsOfService" className="mb-1">Terms of Service:</label>
          <textarea id="termsOfService" name="termsOfService" value={crmData.termsOfService} onChange={handleChange} rows="5" cols="30" required className="resize-none border rounded-md p-2 dark:text-black"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="termsTitle" className="mb-1">Terms Title:</label>
          <select id="termsTitle" name="title" value={selectedTitle} onChange={(event) => handleTitleSelect(event.target.value)} className="resize-none border rounded-md p-2 dark:text-black">
            <option value="">Select a title</option>
            {termTitles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="termsContent" className="mb-1">Terms Content:</label>
          <textarea id="termsContent" name="content" value={termData.content} onChange={(event) => setTermData({ ...termData, content: event.target.value })} rows="5" cols="30" required className="resize-none border rounded-md p-2 dark:text-black"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="github" className="mb-1">GitHub Link:</label>
          <input id="github" name="github" value={crmData.github} onChange={handleChange} rows="5" cols="30" required className="resize-none border rounded-md p-2 dark:text-black"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="facebook" className="mb-1">Facebook Link:</label>
          <input id="facebook" name="facebook" value={crmData.facebook} onChange={handleChange} rows="5" cols="30" required className="resize-none border rounded-md p-2 dark:text-black"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="twitter" className="mb-1">Twitter Link:</label>
          <input id="twitter" name="twitter" value={crmData.twitter} onChange={handleChange} rows="5" cols="30" required className="resize-none border rounded-md p-2 dark:text-black"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="linkedin" className="mb-1">LinkedIn Link:</label>
          <input id="linkedin" name="linkedin" value={crmData.linkedin} onChange={handleChange} rows="5" cols="30" required className="resize-none border rounded-md p-2 dark:text-black"/>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none">Submit</button>
      </form>
    </DefaultLayout>
  );
};

export default CrmForm;
