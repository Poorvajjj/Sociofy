import app from './api/index.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`🚀 Sociofy Express Backend running on port ${PORT}`);
  console.log(`🔑 Gemini Key Configured: ${Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '') ? 'YES' : 'NO (Using Intelligent Fallback Mode)'}`);
  console.log(`================================================`);
});
