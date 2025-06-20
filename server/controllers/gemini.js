const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("GEMINI KEY:", GEMINI_API_KEY);

const generateCaptionAndVibe = async (tags = []) => {
  const prompt = `
Generate a funny meme caption and describe the vibe.
Tags: ${tags.join(', ')}

Respond ONLY in JSON:
{
  "caption": "Your funny caption here",
  "vibe": "The vibe description"
}
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      }
    );

    const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('🌐 Gemini raw response:', text);

    const jsonMatch = text?.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Gemini response didn't contain valid JSON.");
    }

  } catch (err) {
    console.error('❌ Gemini API failed:', err.message);
    return {
      caption: 'YOLO to the moon!',
      vibe: 'Chaos Vibes'
    };
  }
};

module.exports = { generateCaptionAndVibe };
