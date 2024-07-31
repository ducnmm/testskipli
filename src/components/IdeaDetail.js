import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const IdeaDetail = () => {
  const { ideaId } = useParams();
  const [topic, setTopic] = useState(`${ideaId}`);
  const [generatedCaptions, setGeneratedCaptions] = useState([]);
  const [error, setError] = useState(''); // Add state for error messages

  const handleGenerateCaption = async () => {
    try {
      const response = await fetch('http://localhost:4000/createCaptionsFromIdeas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Ideas: topic }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedCaptions(data.captions);
        setError(''); // Clear error message if successful
      } else {
        // Handle HTTP errors
        if (response.status === 400) {
          setError('The input contains inappropriate or offensive content. Please modify your input and try again');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
        setGeneratedCaptions([]); // Clear captions on error
      }
    } catch (error) {
      console.error('Error generating captions:', error);
      setError('Error generating captions. Please try again later.');
      setGeneratedCaptions([]); // Clear captions on error
    }
  };

  return (
    <Box display="flex" width="100vw" height="100vh">
      <Sidebar currentPath={`/`} />
      <Box flex="1" padding="2rem" overflowY="auto" height="100vh">
        <VStack spacing={6} align="start" maxWidth="600px" margin="0 auto">
          <Heading>Your Idea</Heading>
          
          <Text>What topic do you want a caption for?</Text>
          <Input
            placeholder="Enter your topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          
          <Button colorScheme="blue" onClick={handleGenerateCaption}>
            Generate caption
          </Button>

          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          {generatedCaptions.length > 0 && (
            <Box width="100%">
              <Heading as="h2" size="md" my={4}>Captions generated for you</Heading>
              <VStack spacing={4} align="stretch">
                {generatedCaptions.map((caption, index) => (
                  <Box key={index} borderWidth={1} borderRadius={8} p={4} mb={4}>
                    <Text mb={4}>{caption}</Text>
                    <Box display="flex" justifyContent="space-between">
                      <Button colorScheme="teal">Share</Button>
                      <Button variant="outline">Save</Button>
                    </Box>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default IdeaDetail;
