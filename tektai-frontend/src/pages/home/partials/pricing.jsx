import React from 'react';
import { ReactNode } from 'react'; // Importing ReactNode
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons'; // Importing Chakra UI icons
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function PriceWrapper({ children }) {


  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

export default function ThreeTierPricing() {
  const createCheckout = async (plantype) => {
    try {
      const token = localStorage.getItem('token');
      console.log('token' , token);
      const response = await axios.post(
          'http://localhost:3000/payment/stripe/checkout',
          { plan : plantype},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );      window.location.href = response.data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  }

  return (
    <Box py={12}>
      <div className='mt-7' ></div>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Start with 14-day free trial. No credit card needed. Cancel at
          anytime.
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>


        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('blue.300', 'blue.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Most Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
             Premium Plan
              </Text>
              <HStack justifyContent="center">

                <Text fontSize="5xl" fontWeight="900">
                  100
                </Text>
                <Text fontSize="3xl" fontWeight="600">
                  DT
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={ArrowForwardIcon} color="green.500" /> {/* Using ArrowForwardIcon */}
                  Up to 5 challenges creation
                </ListItem>
                <ListItem>
                  <ListIcon as={ArrowForwardIcon} color="green.500" /> {/* Using ArrowForwardIcon */}
                  Responsive customer support
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="blue" onClick={ () =>  createCheckout('premium')} >
                  Enroll Now
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Platinium plan
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="5xl" fontWeight="900">
                300
              </Text>
              <Text fontSize="3xl" fontWeight="600">
                DT
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={ArrowForwardIcon} color="green.500" /> {/* Using ArrowForwardIcon */}
                Unlimited challenges creation
              </ListItem>
              <ListItem>
                <ListIcon as={ArrowForwardIcon} color="green.500" /> {/* Using ArrowForwardIcon */}
                Artificial Intelligence
              </ListItem>
              <ListItem>
                <ListIcon as={ArrowForwardIcon} color="green.500" /> {/* Using ArrowForwardIcon */}
                Expert offert à l'entreprise
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="blue" variant="outline" onClick={ () => createCheckout('platinium') }>
                Enroll Now
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}

export { ThreeTierPricing }; // Exporting ThreeTierPricing component
