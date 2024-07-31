import React, { useState } from 'react';
import { Box, Button, Heading, Input, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const GetInspired = () => {
  const [topic, setTopic] = useState('');
  const [error, setError] = useState(''); // Add state for error messages
  const navigate = useNavigate();

  const handleGenerateIdeas = async () => {
    try {
      const response = await fetch('http://localhost:4000/getPostIdeas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store ideas in localStorage or context if needed
        localStorage.setItem('postIdeas', JSON.stringify(data.ideas));
        navigate('/ideas');
      } else {
        // Handle HTTP errors
        if (response.status === 400) {
          setError('The input contains inappropriate or offensive content. Please modify your input and try again');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error generating ideas:', error);
      setError('Error generating ideas. Please try again later.');
    }
  };

  return (
    <Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <Sidebar currentPath={'/'} />
      <Box flex="1" padding="2rem" overflowY="auto">
        <VStack spacing={6} align="start" maxWidth="600px" margin="0 auto">
          <Heading>Get Inspired</Heading>
          <Text>
            Stuck staring at a blank page? Tell us what topic you have in mind and Skipli AI will generate a list of post ideas and captions for you.
          </Text>
          <Text fontWeight="bold">What topic do you want ideas for?</Text>
          <Input
            placeholder="Enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleGenerateIdeas}>
            Generate ideas
          </Button>

          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default GetInspired;
