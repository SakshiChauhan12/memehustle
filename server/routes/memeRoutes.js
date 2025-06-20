const express = require('express');
const router = express.Router();


const { generateCaptionAndVibe } = require('../controllers/gemini');
const { supabase } = require('../supabaseClient');





router.get('/test', (req, res) => {
  console.log('🔥 test route hit');
  res.send('Hello from test');
});
router.post('/memes/:id/generate', async (req, res) => {
     console.log('🧠 Request received to generate caption for:', req.params.id);
  const { id } = req.params;

  const { data: meme, error } = await supabase
    .from('memes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !meme) return res.status(404).json({ error: 'Meme not found' });

  const tags = meme.tags ? meme.tags.split(',') : [meme.title];

  const { caption, vibe } = await generateCaptionAndVibe(tags);

  const { error: updateError } = await supabase
    .from('memes')
    .update({ caption, vibe })
    .eq('id', id);

  if (updateError) {
    return res.status(500).json({ error: 'Failed to update meme' });
  }

  return res.json({ caption, vibe });
});
module.exports = router; 

