// src/components/GeneratedIdeas.js
import React from 'react';
import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const GeneratedIdeas = () => {
  const navigate = useNavigate();
  const postIdeas = JSON.parse(localStorage.getItem('postIdeas')) || [];

  const handleIdeaClick = (idea) => {
    navigate(`/idea/${idea}`);
  };

  return (
    <Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <Sidebar currentPath={'/ideas'} />
      <Box flex="1" padding="2rem" overflowY="auto">
        <VStack spacing={6} align="start" maxWidth="600px" margin="0 auto">
          <Heading>Generated Ideas</Heading>
          <Text>Choose an idea to build some posts</Text>
          {postIdeas.length > 0 ? (
            postIdeas.map((idea, index) => (
              <Box key={index} padding="1rem" borderWidth="1px" borderRadius="md" width="100%">
                <Button variant="link" onClick={() => handleIdeaClick(idea)}>
                  {idea}
                </Button>
              </Box>
            ))
          ) : (
            <Text>No ideas available. Please generate some ideas first.</Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default GeneratedIdeas;
