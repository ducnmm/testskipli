const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // Để truy cập API_KEY từ file .env

const { db, UserCollection, setDoc, getDoc, updateDoc, deleteDoc, addDoc, getDocs, doc ,collection } = require('./config');

const app = express();
app.use(express.json());
app.use(cors());
console.log("API_KEY:", process.env.API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyAZqHt3Ye7JEphunqtYZzgq-Z6YU67tNx0");
// Helper function to generate a 6-digit access code
const generateAccessCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// POST: CreateNewAccessCode
app.post('/CreateNewAccessCode', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const accessCode = generateAccessCode();

  try {
    // Save the access code to Firestore
    await setDoc(doc(UserCollection, phoneNumber), { accessCode });
    
    // Send the SMS with Firebase
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Handle confirmationResult here
        res.send({ accessCode });
      }).catch((error) => {
        console.error("Error sending SMS:", error);
        res.status(500).send({ error: 'Error sending SMS' });
      });

  } catch (error) {
    console.error("Error creating access code:", error);
    res.status(500).send({ error: 'Error creating access code' });
  }
});

// GET: Simple Test Route
app.get('/hi',async (req, res) => {
  res.send('Hello, World!');
});
// POST: ValidateAccessCode
app.post('/validate', async (req, res) => {
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
});

app.post('/generatePostCaptions', async (req, res) => {
  const { socialNetwork, subject, tone } = req.body;

  try {
    // Tạo một prompt dựa trên các thông tin đầu vào
    const prompt = `Generate 5 captions for a post on ${socialNetwork} about ${subject} in a ${tone} tone, without additional explanations or headings. NO introduction, NO and do not generate indices like 1, 2, 3, etc.`;

    // Sử dụng mô hình Gemini 1.5 để tạo nội dung
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Phân chia văn bản đầu ra thành các caption riêng biệt (nếu cần)
    const captions = text.split('\n').filter(caption => caption.trim() !== '');

    res.send({ captions });
  } catch (error) {
    console.error("Error generating post captions:", error);

    if (error.message.includes('SAFETY')) {
      // Nếu lỗi liên quan đến vấn đề an toàn nội dung, trả về phản hồi với mã trạng thái 400
      res.status(400).send({ error: 'The input contains inappropriate or offensive content. Please modify your input and try again.' });
    } else {
      // Xử lý các lỗi khác
      res.status(500).send({ error: 'Error generating post captions' });
    }
  }
});


app.post('/getPostIdeas', async (req, res) => {
  const { topic } = req.body;

  try {
    // Tạo mô hình Gemini 1.5
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Tạo prompt cho AI yêu cầu tạo 10 ý tưởng ngắn gọn
    const prompt = `Generate 5 creative post ideas for the topic: ${topic}. Each idea should be about 10 words long and separated by a newline. and do not generate indices like 1, 2, 3, etc.`;

    // Sử dụng AI để tạo nội dung
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();  // Đọc nội dung từ phản hồi

    // Chia văn bản thành các ý tưởng dựa trên dấu phân cách (dòng mới)
    const ideas = text.split('\n').filter(line => line.trim() !== '');

    // Giới hạn số lượng ý tưởng trả về chỉ còn 10 ý tưởng
    const limitedIdeas = ideas.slice(0, 10);

    // Trả về các ý tưởng đã giới hạn
    res.send({ ideas: limitedIdeas });
  } catch (error) {
    console.error("Error getting post ideas:", error);

    if (error.message.includes('SAFETY')) {
      // Nếu lỗi liên quan đến vấn đề an toàn nội dung, trả về phản hồi với mã trạng thái 400
      res.status(400).send({ error: 'The input contains inappropriate or offensive content. Please modify your input and try again.' });
    } else {
      // Xử lý các lỗi khác
      res.status(500).send({ error: 'Error getting post ideas' });
    }
  }
});


// POST: CreateCaptionsFromIdeas
app.post('/createCaptionsFromIdeas', async (req, res) => {
  const { idea } = req.body;

  try {
    // Tạo một prompt dựa trên ý tưởng bài đăng
    const prompt = `Generate 5 captions based on the following idea: "${idea}". Each caption should be around 100 words and include hashtags, without additional explanations or headings. NO introduction, NO and do not generate indices like 1, 2, 3, etc.`;

    // Sử dụng mô hình Gemini 1.5 để tạo nội dung
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Phân chia văn bản đầu ra thành các caption riêng biệt và loại bỏ dòng tiêu đề
    const captions = text.split('\n').filter(caption => caption.trim() !== '').slice(0, 5);

    // Chỉ trả về danh sách các caption
    res.send({ captions });
  } catch (error) {
    console.error('Error generating captions from ideas:', error);

    if (error.message.includes('SAFETY')) {
      // Nếu lỗi liên quan đến vấn đề an toàn nội dung, trả về phản hồi với mã trạng thái 400
      res.status(400).send({ error: 'The input contains inappropriate or offensive content. Please modify your input and try again.' });
    } else {
      // Xử lý các lỗi khác
      res.status(500).send({ error: 'Error generating captions from ideas' });
    }
  }
});


// POST: SaveGeneratedContent
app.post('/saveGeneratedContent', async (req, res) => {
  const { phoneNumber, topic, data } = req.body;
  
  try {
    const userContentRef = collection(doc(UserCollection, phoneNumber), 'Contents');
    await addDoc(userContentRef, { topic, data });
    res.send({ success: true });
  } catch (error) {
    console.error("Error saving generated content:", error);
    res.status(500).send({ error: 'Error saving generated content' });
  }
});

// GET: GetUserGeneratedContents
app.get('/getUserGeneratedContents', async (req, res) => {
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
});

// POST: UnSaveContent
app.post('/unSaveContent', async (req, res) => {
  const { phoneNumber, captionId } = req.body;
  
  try {
    await deleteDoc(doc(collection(doc(UserCollection, phoneNumber), 'Contents'), captionId));
    res.send({ success: true });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).send({ error: 'Error deleting content' });
  }
});

app.listen(4000, () => console.log('Server is running on port 40002'+process.env.API_KEY));