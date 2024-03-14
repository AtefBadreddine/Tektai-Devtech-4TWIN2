import React, { useEffect, useState } from 'react';
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input } from '@chakra-ui/react'; // Assuming Chakra UI imports

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [crmData, setCrmData] = useState({
    aboutUs: '',
    termsOfService: '',
    instagram: '',
    facebook: '',
    github: '',
    linkedin: '',
  });
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
    <>
      <Button ref={btnRef} colorScheme='blue' onClick={onOpen}>
      About Us
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> About Us</DrawerHeader>

          <DrawerBody>
          <p>{crmData.aboutUs}</p>
 
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
