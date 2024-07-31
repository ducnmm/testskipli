// src/components/AccessCodeForm.js
import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const AccessCodeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber } = location.state || {};
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmitCode = async () => {
    try {
      const response = await fetch('http://localhost:4000/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, accessCode }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        alert('Access code verified!');
        navigate('/'); // Redirect to a different route after successful verification
      } else {
        setError('Invalid access code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setError('Error verifying code. Please try again later.');
    }
  };

  if (!phoneNumber) {
    return <Text>Invalid access. Please start over.</Text>;
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4}>
          <Text fontSize="2xl">Welcome to Skipli AI</Text>
          <Text>SkipliAI has sent an OTP code to: {phoneNumber}</Text>
          <Input
            placeholder="Enter your code here"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSubmitCode}>
            Submit
          </Button>
          {error && <Text color="red.500">{error}</Text>}
        </VStack>
      </Box>
    </Box>
  );
};

export default AccessCodeForm;
