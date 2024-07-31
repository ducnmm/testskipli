// src/components/PhoneNumberForm.js
import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PhoneNumberForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      const response = await fetch('http://localhost:4000/CreateNewAccessCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // Here, you should integrate Firebase OTP to send the `accessCode` to the user's phone number
        // For example: 
        // firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        //  .then((confirmationResult) => {
        //    // SMS sent. Prompt user to type the code from the message.
        //  })
        //  .catch((error) => {
        //    // Error; SMS not sent
        //  });

        navigate('/verify-code', { state: { phoneNumber } });
      } else {
        setError(data.message || 'Failed to send code. Please try again.');
      }
    } catch (error) {
      console.error('Error sending code:', error);
      setError('Error sending code. Please try again later.');
    }
  };

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
          <Input
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSendCode}>
            Send Verification Code
          </Button>
          {error && <Text color="red.500">{error}</Text>}
        </VStack>
      </Box>
    </Box>
  );
};

export default PhoneNumberForm;
