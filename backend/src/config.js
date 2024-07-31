// src/config.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc, getDoc } = require('firebase/firestore');
const { getAuth, RecaptchaVerifier } = require('firebase/auth');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9a22ueLe69soYshdJQN-2Sip7wNIVnrg",
  authDomain: "node-e881b.firebaseapp.com",
  projectId: "node-e881b",
  storageBucket: "node-e881b.appspot.com",
  messagingSenderId: "896316567493",
  appId: "1:896316567493:web:3318500201842693dfa5ac",
  measurementId: "G-66RTKFDMKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const UserCollection = collection(db, "Users");

// Exporting Firestore and Auth functions
module.exports = { 
  db, 
  UserCollection, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  deleteDoc, 
  addDoc, 
  getDocs, 
  doc, 
  auth, // Export Firebase Auth
  RecaptchaVerifier // Export RecaptchaVerifier
};
