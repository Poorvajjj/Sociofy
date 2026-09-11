import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeInput } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
  res.json({
    status: 'ok',
    gemini_key_configured: hasKey,
    timestamp: new Date().toISOString()
  });
});

// Primary Analysis Endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { text, imageBase64, mimeType, liveLocation } = req.body;

    if ((!text || text.trim() === '') && !imageBase64 && !liveLocation) {
      return res.status(400).json({
        error: 'Please provide text description, voice transcription, live location, or an image to analyze.'
      });
    }

    console.log(`[Backend API] Analyzing request. Text length: ${text?.length || 0}, Has Image: ${Boolean(imageBase64)}, Live Location: ${liveLocation || 'None'}`);

    const result = await analyzeInput({
      text: text || '',
      imageBase64: imageBase64 || null,
      mimeType: mimeType || 'image/jpeg',
      liveLocation: liveLocation || null
    });

    return res.json(result);
  } catch (error) {
    console.error('[Backend API] Analysis failed:', error);
    return res.status(500).json({
      error: 'An error occurred while processing your request with Gemini.',
      details: error.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`🚀 Sociofy Express Backend running on port ${PORT}`);
  console.log(`🔑 Gemini Key Configured: ${Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '') ? 'YES' : 'NO (Using Intelligent Fallback Mode)'}`);
  console.log(`================================================`);
});
