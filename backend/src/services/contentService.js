const { db } = require('../config');
const { collection, doc, addDoc, getDocs, deleteDoc } = require('firebase/firestore');
const UserCollection = collection(db, "Users");

exports.saveGeneratedContent = async (req, res) => {
    const { phoneNumber, topic, data } = req.body;
    
    try {
      const userContentRef = collection(doc(UserCollection, phoneNumber), 'Contents');
      await addDoc(userContentRef, { topic, data });
      res.send({ success: true });
    } catch (error) {
      console.error("Error saving generated content:", error);
      res.status(500).send({ error: 'Error saving generated content' });
    }
  };
  
  exports.getUserGeneratedContents = async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    
    try {
      const userContents = [];
      const contentDocs = await getDocs(collection(doc(UserCollection, phoneNumber), 'Contents'));
      contentDocs.forEach((doc) => userContents.push({ id: doc.id, ...doc.data() }));
      res.send(userContents);
    } catch (error) {
      console.error("Error fetching user contents:", error);
      res.status(500).send({ error: 'Error fetching user contents' });
    }
  };
  
  exports.unSaveContent = async (req, res) => {
    const { phoneNumber, captionId } = req.body;
    
    try {
      await deleteDoc(doc(collection(doc(UserCollection, phoneNumber), 'Contents'), captionId));
      res.send({ success: true });
    } catch (error) {
      console.error("Error deleting content:", error);
      res.status(500).send({ error: 'Error deleting content' });
    }
  };