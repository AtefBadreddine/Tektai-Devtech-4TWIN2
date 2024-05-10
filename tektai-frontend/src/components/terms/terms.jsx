import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import DefaultLayout from '../../layout/DefaultLayout';
import CoverOne from '../../images/cover/cover-01.png';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import TermsOfUse from './tos';

const TermsAndConditions = () => {
  const [crmData, setCrmData] = useState({
    about: '',
    termsOfService: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    github:'',
  });
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/settings/65f8a38e39a328e497879df2`);
        const { about, termsOfService, facebook, linkedin, twitter, github } = response.data;
        setCrmData({ about, termsOfService, facebook, linkedin, twitter, github });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
  
    fetchSettings();
  }, []);

  return (
    <>
     <Header />
    <div className="container mx-auto px-4 py-8">
     
      <div style={{ height: '100px' }}></div>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              Terms and Conditions
            </h3>
            <p className="text-m text-gray-600 mb-6 mt-6">
              Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">TektAI</span> {crmData.termsOfService}
            </p>
            <TermsOfUse />
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default TermsAndConditions;
