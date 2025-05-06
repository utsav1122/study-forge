const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Main chat route
router.post('/chat', handleChat);

// Test route to verify Gemini connection
router.get('/test', async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        await model.generateContent('Test connection');
        res.json({ success: true, message: "Gemini API connection successful" });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

module.exports = router; 