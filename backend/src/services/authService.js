const { db, auth } = require('../config');
const { collection, doc, setDoc, getDoc, updateDoc } = require('firebase/firestore');
const { signInWithPhoneNumber } = require('firebase/auth');
const { generateAccessCode } = require('../utils/helpers');

const UserCollection = collection(db, "Users");

exports.createNewAccessCode = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const accessCode = generateAccessCode();

  try {
    await setDoc(doc(UserCollection, phoneNumber), { accessCode });
    
    const appVerifier = req.body.recaptchaToken; 

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        res.send({ accessCode });
      }).catch((error) => {
        console.error("Error sending SMS:", error);
        res.status(500).send({ error: 'Error sending SMS' });
      });

  } catch (error) {
    console.error("Error creating access code:", error);
    res.status(500).send({ error: 'Error creating access code' });
  }
};

exports.validateAccessCode = async (req, res) => {
  const { accessCode, phoneNumber } = req.body;
  
  try {
    const userDoc = await getDoc(doc(UserCollection, phoneNumber));
    if (userDoc.exists() && userDoc.data().accessCode === accessCode) {
      await updateDoc(doc(UserCollection, phoneNumber), { accessCode: "" });
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error("Error validating access code:", error);
    res.status(500).send({ error: 'Error validating access code' });
  }
};