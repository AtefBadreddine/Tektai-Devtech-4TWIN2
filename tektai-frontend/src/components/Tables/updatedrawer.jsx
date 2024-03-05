import React, { useEffect, useState } from 'react';
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input } from '@chakra-ui/react'; // Assuming Chakra UI imports
import { FaEdit } from 'react-icons/fa';
import userService from '../../services/userService'; // Import the userService

function Updatedraw({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [updatedUser, setUpdatedUser] = useState({ ...user }); // Initialize with user data passed in props

  useEffect(() => {
    // Set updatedUser to the user data passed in props whenever it changes
    setUpdatedUser({ ...user });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format the date if it's the birthdate field
    const newValue = name === 'birthdate' ? value.split('T')[0] : value;
    setUpdatedUser(prevUser => ({
      ...prevUser,
      [name]: newValue
    }));
  };

  const handleSave = async () => {
    try {
      // Call the userService update user function with updated user data
      await userService.updateUser(updatedUser.id, updatedUser);
      // Optionally handle success (e.g., show a success message)
      onClose(); // Close the drawer after successful update
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };
  

  return (
    <>
    <Button   onClick={onOpen}>
        <FaEdit size={16} />
        Update
      </Button>
      <Drawer size={"xl"}
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
            <label>Username</label>
            <Input
              name="username"
              value={updatedUser.username}
              onChange={handleChange}
            />
            <label>Email</label>
            <Input
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
            />
            <label>Role</label>
            <Input
              name="role"
              value={updatedUser.role}
              onChange={handleChange}
            />
            <label>Birthdate</label>
            <Input
              type='date'
              name="birthdate"
              value={updatedUser.birthdate}
              onChange={handleChange}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={handleSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Updatedraw;
