// src/components/StartFromScratch.js
import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Sidebar from './Sidebar';

const StartFromScratch = () => {
  return (
    <Box display="flex" width="100vw" height="100vh" alignItems="center"
    justifyContent="center">
      <Sidebar currentPath={'/'}/>
      <Box flex="1" padding="2rem" overflowY="auto">
        <VStack spacing={6} align="start" maxWidth="600px" margin="0 auto">
            <Heading>Generate unique captions from scratch</Heading>
            <Text>Choose the type of post you want a caption for, and let Skipli AI write it for you.</Text>
            <Text>What kind of post do you want a caption for?</Text>
            <Button
              width="100%"
              colorScheme="blue"
              as={RouterLink}
              to="/facebook-post"
            >
              Facebook post
              <Text fontSize="sm">Generate caption for a post</Text>
            </Button>
            <Button
              width="100%"
              colorScheme="blue"
              variant="outline"
              as={RouterLink}
              to="/instagram-post"
            >
              Instagram post
              <Text fontSize="sm">Generate caption for a post</Text>
            </Button>
            <Button
              width="100%"
              colorScheme="blue"
              variant="outline"
              as={RouterLink}
              to="/twitter-post"
            >
              Twitter post
              <Text fontSize="sm">Generate caption for a post</Text>
            </Button>
          </VStack>
      </Box>
    </Box>
  );
};

export default StartFromScratch;