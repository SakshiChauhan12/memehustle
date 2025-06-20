// // src/components/TrendingMemes.js
// import React, { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';

// const TrendingMemes = () => {
//   const [topMemes, setTopMemes] = useState([]);

//   const fetchTopMemes = async () => {
//     const { data, error } = await supabase
//       .from('memes')
//       .select('*')
//       .order('upvotes', { ascending: false })
//       .limit(10);

//     if (!error) setTopMemes(data);
//     else console.error("❌ Failed to fetch trending memes:", error.message);
//   };

// useEffect(() => {
//   fetchTopMemes();
//   const interval = setInterval(fetchTopMemes, 5000); // ⏱️ every 5 seconds
//   return () => clearInterval(interval);
// }, []);

//   return (
//     <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black via-[#0f0f1b] to-black">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-pink-500 tracking-wider drop-shadow-[0_0_15px_#ff00ff]">
//         🚀 Trending Memes Leaderboard
//       </h1>

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {topMemes.map((meme, index) => (
//           <div key={meme.id} className="bg-black/80 p-4 rounded-xl border border-fuchsia-700 shadow-lg hover:shadow-fuchsia-500 transition-all">
//             <h2 className="text-xl font-bold text-fuchsia-400 mb-2">
//               #{index + 1} {meme.title}
//             </h2>
//             <img
//               src={meme.image_url}
//               alt={meme.title}
//               className="w-full h-60 object-cover rounded-lg border border-fuchsia-500"
//             />
//             <p className="text-pink-300 mt-3 font-medium">🔥 {meme.upvotes} Upvotes</p>
//             <p className="text-gray-400 text-sm mt-1">Posted by: {meme.user_name || 'Unknown'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendingMemes;
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const TrendingMemes = () => {
  const [topMemes, setTopMemes] = useState([]);

  const fetchTopMemes = async () => {
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('upvotes', { ascending: false })
      .limit(10);

    if (!error) setTopMemes(data);
    else console.error("❌ Failed to fetch trending memes:", error.message);
  };

  useEffect(() => {
    fetchTopMemes();
    const interval = setInterval(fetchTopMemes, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRankBadge = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black via-[#0f0f1b] to-black">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-pink-500 tracking-wider drop-shadow-[0_0_15px_#ff00ff]">
        🚀 Trending Memes Leaderboard
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {topMemes.map((meme, index) => (
          <div
            key={meme.id}
           className={`p-4 rounded-xl border-2 ${
  index === 0
    ? 'bg-[#0a0a0a] border-pink-500 shadow-[0_0_20px_3px_rgba(255,105,180,0.5)]'
    : 'bg-[#0a0a0a] border-fuchsia-700 shadow-lg'
} hover:scale-[1.02] transition-transform`}
          >
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              {getRankBadge(index)} {meme.title}
            </h2>
            <img
              src={meme.image_url}
              alt={meme.title}
              className="w-full h-60 object-cover rounded-lg border border-fuchsia-500"
            />
            <p className="text-pink-300 mt-3 font-medium">
              🔥 {meme.upvotes} Upvotes
            </p>
            <p className="text-gray-400 text-sm mt-1">
              🛸 Posted by: {meme.user_name || 'Unknown'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMemes;
