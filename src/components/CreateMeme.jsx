import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const CreateMeme = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // 🔐 Get logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) setUser(user);
      else {
        alert('Please log in to post memes!');
        window.location.href = '/auth';
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('User not authenticated.');
      return;
    }

    const meme = {
      title,
      image_url: imageUrl || 'https://picsum.photos/200',
      caption,
      vibe: 'funny',
      upvotes: 0,
      downvotes: 0,
      user_id: user.id,
      user_email: user.email,
      user_name: user.user_metadata.full_name || 'Anonymous', // ✅ Full Name
    };

    const { data, error } = await supabase.from('memes').insert([meme]);

    if (error) {
      console.error('❌ Supabase Insert Error:', error.message);
      setError(error.message);
    } else {
      alert('✅ Meme created successfully!');
      setTitle('');
      setImageUrl('');
      setCaption('');
      setError('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-black text-white p-6 rounded-xl shadow-md neon-border">
      <h2 className="text-2xl mb-4 font-bold text-pink-400">Create a Meme</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Meme Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-pink-500"
          required
        />
        <input
          type="text"
          placeholder="Image URL (or leave blank for placeholder)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-pink-500"
        />
        <input
          type="text"
          placeholder="Caption (e.g. ‘Doge HODL’)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-pink-500"
        />
        <button
          type="submit"
          className="w-full p-2 bg-pink-500 hover:bg-pink-600 rounded font-bold"
        >
          Post Meme 🚀
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateMeme;
