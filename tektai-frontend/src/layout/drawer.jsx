import React from 'react';
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input } from '@chakra-ui/react'; // Assuming Chakra UI imports

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
          <p>We are a platform driven by a passion for innovation and collaboration in the field of data science. At TektAI, we provide a dynamic space where companies can submit real-world challenges, spanning diverse industries, and developers can come together to create innovative solutions. With automated performance evaluation, transparent prize allocation processes, and a strong emphasis on community engagement, TektAI is more than just a platform – it's a hub for aspiring and seasoned data scientists alike to connect, collaborate, and push the boundaries of what's possible with data. Join us on our journey to revolutionize the world of data science, one challenge at a time.</p>
 
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
