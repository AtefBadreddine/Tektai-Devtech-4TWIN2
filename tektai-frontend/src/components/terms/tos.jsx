import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import axios from 'axios';

function TermsOfUse() {
  const [terms, setTerms] = useState([]);
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${API_URL}/term`);
        setTerms(response.data);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
  }, []);

  return (

    <Accordion allowToggle>
      {terms.map((term, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {term.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {term.content}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default TermsOfUse;
