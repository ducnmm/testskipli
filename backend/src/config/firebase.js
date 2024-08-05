const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyAOaPkqeinhY3w1ehid5tRgKXznmgLwtuI",
  authDomain: "testskipli.firebaseapp.com",
  projectId: "testskipli",
  storageBucket: "testskipli.appspot.com",
  messagingSenderId: "441793330026",
  appId: "1:441793330026:web:8d16ee65cbd274c438c313",
  measurementId: "G-35HE9XHVVW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db, auth };