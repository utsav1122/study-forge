const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

// Initialize Gemini AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat history to maintain context (if needed)
let chatHistory = [];

exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is missing");
    }
    
    // Validate message
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }
    
    console.log("Connecting to Gemini...");
    
    try {
      // Get the model with appropriate configuration
      // Using gemini-pro which is widely available
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });
      
      // Send message directly without chat history for now
      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();
      
      // Send successful response
      res.status(200).json({
        success: true,
        response: text
      });
    } catch (modelError) {
      console.error("Gemini Model Error:", modelError);
      throw new Error(`Failed to generate response: ${modelError.message}`);
    }
  } catch (error) {
    console.error("Chat Error Details:", {
      message: error.message,
      stack: error.stack,
    });
    
    res.status(500).json({
      success: false,
      message: "Failed to get response from AI",
      error: error.message
    });
  }
};

// Test endpoint
exports.testConnection = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro'
    });
    
    const result = await model.generateContent('Test connection');
    const response = await result.response;
    
    res.json({
      success: true,
      message: "Gemini API connection successful",
      test_response: response.text()
    });
  } catch (error) {
    console.error("Connection Test Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Export the CORS middleware for use in your routes
exports.corsMiddleware = cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
});
