import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Main = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" width="100vw" height="100vh" alignItems="center"
    justifyContent="center">
      <Sidebar currentPath={'/'}/>
      <Box flex="1" padding="2rem" overflowY="auto">
        <VStack spacing={6} align="start" maxWidth="600px" margin="0 auto">
          <Heading>Skipli AI</Heading>
          <Text>Generate post ideas and captions in seconds</Text>
          <Button
            width="100%"
            colorScheme="blue"
            onClick={() => navigate('/start-from-scratch')}
          >
            Start from scratch
          </Button>
          <Button
            width="100%"
            colorScheme="blue"
            variant="outline"
            onClick={() => navigate('/get-inspired')}
          >
            Get inspired
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Main;