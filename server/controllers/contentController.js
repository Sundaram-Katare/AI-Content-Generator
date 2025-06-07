import { GoogleGenAI } from "@google/genai";
import Content from '../models/Content.js';

const generateContent = async (req, res) => {
  try {
    const { title, inputText, apiKey } = req.body;

    const keyToUse = apiKey || process.env.GEMINI_API_KEY;

    if (!keyToUse) {
      return res.status(500).json({ message: "Gemini API key is missing" });
    }

    // Initialize GoogleGenAI client
    const ai = new GoogleGenAI({ apiKey: keyToUse });

    const prompt = `${inputText}\n\nPlease keep your answer within 150 words.`;


    // Call the generateContent method
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const generatedText = response.text || "No response from Gemini";

    // Save the content to database
    const newContent = new Content({ title, inputText, generatedText });
    await newContent.save();

    res.status(200).json({ generatedText, id: newContent._id });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getContents = async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { generateContent, getContents };
