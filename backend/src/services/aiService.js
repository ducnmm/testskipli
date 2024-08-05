const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

exports.generatePostCaptions = async (req, res) => {
  const { socialNetwork, subject, tone } = req.body;

  try {
    const prompt = `Generate 5 captions for a post on ${socialNetwork} about ${subject} in a ${tone} tone, without additional explanations or headings. NO introduction, NO and do not generate indices like 1, 2, 3, etc.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const captions = text.split('\n').filter(caption => caption.trim() !== '');

    res.send({ captions });
  } catch (error) {
    console.error("Error generating post captions:", error);

    if (error.message.includes('SAFETY')) {
      res.status(400).send({ error: 'The input contains inappropriate or offensive content. Please modify your input and try again.' });
    } else {
      res.status(500).send({ error: 'Error generating post captions' });
    }
  }
};

exports.getPostIdeas = async (req, res) => {
  const { topic } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate 5 creative post ideas for the topic: ${topic}. Each idea should be about 10 words long and separated by a newline. and do not generate indices like 1, 2, 3, etc.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const ideas = text.split('\n').filter(line => line.trim() !== '');
    const limitedIdeas = ideas.slice(0, 10);

    res.send({ ideas: limitedIdeas });
  } catch (error) {
    console.error("Error getting post ideas:", error);

    if (error.message.includes('SAFETY')) {
      res.status(400).send({ error: 'The input contains inappropriate or offensive content. Please modify your input and try again.' });
    } else {
      res.status(500).send({ error: 'Error getting post ideas' });
    }
  }
};

exports.createCaptionsFromIdeas = async (req, res) => {
  const { idea } = req.body;

  try {
    const prompt = `Generate 5 captions based on the following idea: "${idea}". Each caption should be around 100 words and include hashtags, without additional explanations or headings. NO introduction, NO and do not generate indices like 1, 2, 3, etc.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const captions = text.split('\n').filter(caption => caption.trim() !== '').slice(0, 5);

    res.send({ captions });
  } catch (error) {
    console.error('Error generating captions from ideas:', error);

    if (error.message.includes('SAFETY')) {
      res.status(400).send({ error: 'The input contains inappropriate or offensive content. Please modify your input and try again.' });
    } else {
      res.status(500).send({ error: 'Error generating captions from ideas' });
    }
  }
};