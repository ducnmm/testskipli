import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Thay thế bằng cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyAOaPkqeinhY3w1ehid5tRgKXznmgLwtuI",
  authDomain: "testskipli.firebaseapp.com",
  projectId: "testskipli",
  storageBucket: "testskipli.appspot.com",
  messagingSenderId: "441793330026",
  appId: "1:441793330026:web:8d16ee65cbd274c438c313",
  measurementId: "G-35HE9XHVVW"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const PhoneNumberForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Tạo reCAPTCHA verifier khi component mount
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        setError('reCAPTCHA expired. Please try again.');
      }
    });
  }, []);

  const handleSendCode = async () => {
    try {
      // Gọi API để tạo mã truy cập
      const response = await fetch('http://localhost:4000/auth/CreateNewAccessCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();

      if (!response.ok) {
        const appVerifier = window.recaptchaVerifier;
        console.log(appVerifier)
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            navigate('/verify-code', { state: { phoneNumber } });
          })
          .catch((error) => {
            console.error('Error sending SMS:', error);
            setError('Error sending SMS. Please try again.');
          });
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
          <div id="recaptcha-container"></div>
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