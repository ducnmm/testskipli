
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAOaPkqeinhY3w1ehid5tRgKXznmgLwtuI",
    authDomain: "testskipli.firebaseapp.com",
    projectId: "testskipli",
    storageBucket: "testskipli.appspot.com",
    messagingSenderId: "441793330026",
    appId: "1:441793330026:web:8d16ee65cbd274c438c313",
    measurementId: "G-35HE9XHVVW"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth, firebase };
