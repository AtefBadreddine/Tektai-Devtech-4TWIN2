import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'; // Assuming Chakra UI imports

function TermsOfUse() {
  const terms = [
    {
      title: "Account Registration:",
      content: "You may be required to create an account to access certain features of TektAI. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account."
    },
    {
      title: "Use of Services:",
      content: "You agree to use TektAI solely for lawful purposes and in accordance with these terms. You may not use TektAI in any manner that could damage, disable, overburden, or impair the platform."
    },
    {
      title: "Intellectual Property:",
      content: "TektAI and its content, features, and functionality are owned by TektAI and are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of TektAI without our prior written consent."
    },
    {
      title: "User Content:",
      content: "By submitting content to TektAI, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content."
    },
    {
      title: "Privacy:",
      content: "Your use of TektAI is subject to our Privacy Policy, which governs the collection, use, and disclosure of your personal information."
    },
    {
      title: "Additional Restrictions:",
      content: "We reserve the right to impose additional restrictions on your use of TektAI as deemed necessary to protect the integrity of the platform and its users."
    },
    {
      title: "Your Rights:",
      content: "You retain all rights to any content you submit to TektAI. By submitting content, you grant us the right to use and distribute such content as described in these terms."
    },
    {
      title: "Termination:",
      content: "We reserve the right to terminate or suspend your access to TektAI at any time for any reason without prior notice."
    },
    {
      title: "Governing Law:",
      content: "These terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions."
    },
    {
      title: "Changes to Terms:",
      content: "We reserve the right to modify or revise these terms at any time. Any changes will be effective immediately upon posting on TektAI. Continued use of TektAI after any such changes constitutes your acceptance of the revised terms."
    }
  ];

  return (
    <Accordion>
      {terms.map((term, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
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
