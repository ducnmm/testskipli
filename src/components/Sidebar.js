// src/components/Sidebar.js
import React from 'react';
import { Box, VStack, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = ({ currentPath }) => {
  return (
    <Box
      width="250px"
      height="100vh"
      backgroundColor="gray.100"
      padding="2rem"
    >
      <VStack spacing={4} align="start" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">Skipli AI</Text>
        <Box
          as={RouterLink}
          to="/"
          width="100%"
          padding="0.5rem 1rem"
          borderRadius="md"
          backgroundColor={currentPath === '/' ? 'gray.300' : 'transparent'}
          display="flex"
          alignItems="center"
        >
          <Text fontSize="lg">
            Services
          </Text>
        </Box>
        <Box
          as={RouterLink}
          to="/profile"
          width="100%"
          padding="0.5rem 1rem"
          borderRadius="md"
          backgroundColor={currentPath === '/profile' ? 'gray.300' : 'transparent'}
          display="flex"
          alignItems="center"
        >
          <Text fontSize="lg">
            Profile
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;