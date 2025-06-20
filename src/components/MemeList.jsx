// import React, { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';
// import io from 'socket.io-client';
// import { useLocation } from 'react-router-dom';

// const socket = io('http://localhost:3001');

// const MemeList = () => {
//   const [memes, setMemes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [bids, setBids] = useState({});
//   const [bidInputs, setBidInputs] = useState({});


// useEffect(() => {
//   fetchMemes();      // ✅ get memes
//   fetchBids();       // ✅ get highest bids

//   socket.on('broadcast_bid', (newBid) => {
//     setBids((prev) => {
//       const existing = prev[newBid.meme_id];
//       if (!existing || newBid.credits > existing.credits) {
//         return { ...prev, [newBid.meme_id]: newBid };
//       }
//       return prev;
//     });
//   });

//   return () => socket.off('broadcast_bid');
// }, []);
// const fetchMemes = async () => {
//   setLoading(true);

//   const { data, error } = await supabase
//     .from('memes')
//     .select('*')
//     .order('created_at', { ascending: false });

//   if (error) {
//     console.error('❌ Failed to fetch memes:', error.message);
//   } else {
//     setMemes(data);
//   }

//   setLoading(false);
// };

// //   const fetchMemes = async () => {
// //     setLoading(true);
// //     const { data, error } = await supabase
// //       .from('memes')
// //       .select('*')
// //       .order('created_at', { ascending: false });

// //     if (!error) {
// //       setMemes(data);
// //     } else {
// //       console.error('❌ Failed to fetch memes:', error.message);
// //     }

// //     setLoading(false);
// //   };

// // Sample logic for setting bids correctly
// const fetchBids = async () => {
//   const { data, error } = await supabase
//     .from('bids')
//     .select('meme_id, user_id, credits')
//     .order('credits', { ascending: false });

//   if (!error && data) {
//     const highestBids = {};

//     // ✅ Keep only the highest bid per meme
//     data.forEach((bid) => {
//       const id = bid.meme_id;
//       if (!highestBids[id] || bid.credits > highestBids[id].credits) {
//         highestBids[id] = {
//           user_id: bid.user_id,
//           credits: bid.credits,
//         };
//       }
//     });

   
//     setBids(highestBids);
//   } else {
//     console.error("❌ Error fetching bids:", error?.message);
//   }
// };



//  const handleUpvote = async (id) => {
//   const meme = memes.find((m) => m.id === id);
//   const current = meme?.upvotes || 0;

//   const { error } = await supabase
//     .from('memes')
//     .update({ upvotes: current + 1 })
//     .eq('id', id);

//   if (!error) {
//   setMemes((prevMemes) =>
//     prevMemes.map((m) =>
//       m.id === id ? { ...m, upvotes: current + 1 } : m
//     )
//   );
// }
// else {
//     console.error('❌ Upvote failed:', error.message);
//   }
// };

// const handleDownvote = async (id) => {
//   const meme = memes.find((m) => m.id === id);
//   const current = meme?.upvotes || 0;

//   if (current === 0) return;

//   const { error } = await supabase
//     .from('memes')
//     .update({ upvotes: current - 1 })
//     .eq('id', id);

//   if (!error) {
//     fetchMemes(); // ✅ Refresh list again
//   } else {
//     console.error('❌ Downvote failed:', error.message);
//   }
// };


//   const handleBid = async (memeId) => {
//   const credits = parseInt(bidInputs[memeId], 10);
//   const user_id = 'cyberpunk420';

//   if (isNaN(credits)) {
//     alert('❌ Enter a valid credit amount');
//     return;
//   }

//   const { error } = await supabase
//     .from('bids')
//     .insert([{ meme_id: memeId, credits, user_id }]);

//   if (!error) {
//     socket.emit('new_bid', { meme_id: memeId, credits, user_id });

//     // Also update local UI if this is the highest
//     setBids((prev) => {
//       const existing = prev[memeId];
//       if (!existing || credits > existing.credits) {
//         return { ...prev, [memeId]: { user_id, credits } };
//       }
//       return prev;
//     });

//     setBidInputs((prev) => ({ ...prev, [memeId]: '' }));
//   } else {
//     alert('❌ Failed to place bid!');
//   }
// };


//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-b from-black via-[#0f0f1b] to-black grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//       {loading ? (
//         <p className="text-white text-xl text-center">🚀 Loading memes...</p>
//       ) : (
//         memes.map((meme) => (
//           <div
//             key={meme.id}
//             className="bg-[#0a0a0a] border-2 border-fuchsia-600 rounded-2xl p-4 shadow-xl hover:scale-[1.02] hover:shadow-fuchsia-400/50 transition-all"
//           >
//             <img
//               src={meme.image_url}
//               alt={meme.title}
//               className="w-full h-64 object-cover rounded-xl border border-fuchsia-500 mb-4"
//             />
//             <h3 className="text-xl font-bold text-fuchsia-400 mb-1">{meme.title}</h3>
//             <p className="text-gray-300 mb-2">{meme.caption}</p>
//             <p className="text-sm text-gray-400">
//               Vibe: {meme.vibe} | Upvotes: {meme.upvotes ?? 0}
//             </p>
//             <p className="text-xs italic text-gray-400">🛸 Posted by: {meme.user_name || 'Unknown'}</p>
//           <p className="text-sm text-yellow-400 mt-2 font-semibold">
//   💸 Highest Bid: <span className="text-white">{bids[meme.id]?.credits || 0}</span> credits by{' '}
//   <span className="text-pink-300">{bids[meme.id]?.user_id || '—'}</span>
// </p>
//             <div className="flex mt-3 gap-2">
//               <input
//                 type="number"
//                 placeholder="Enter credits"
//                 value={bidInputs[meme.id] || ''}
//                 onChange={(e) => setBidInputs({ ...bidInputs, [meme.id]: e.target.value })}
//                 className="flex-1 px-2 py-1 rounded bg-black border border-fuchsia-500 text-white"
//               />
//               <button
//                 onClick={() => handleBid(meme.id)}
//                 className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded font-bold text-black"
//               >
//                 🚀 Bid
//               </button>
//             </div>
//             <div className="flex gap-2 mt-4 justify-between">
//               <button
//                 onClick={() => handleUpvote(meme.id)}
//                 className="flex-1 bg-green-600 hover:bg-green-500 text-white py-1 rounded"
//               >
//                 👍 Upvote
//               </button>
//               <button
//                 onClick={() => handleDownvote(meme.id)}
//                 className="flex-1 bg-red-600 hover:bg-red-500 text-white py-1 rounded"
//               >
//                 👎 Downvote
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MemeList;
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const MemeList = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState({});
  const [bidInputs, setBidInputs] = useState({});

  useEffect(() => {
    fetchMemes();
    fetchBids();

    socket.on('broadcast_bid', (newBid) => {
      setBids((prev) => {
        const existing = prev[newBid.meme_id];
        if (!existing || newBid.credits > existing.credits) {
          return { ...prev, [newBid.meme_id]: newBid };
        }
        return prev;
      });
    });

    return () => socket.off('broadcast_bid');
  }, []);

  const fetchMemes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setMemes(data);
    } else {
      console.error('❌ Failed to fetch memes:', error.message);
    }
    setLoading(false);
  };

  const fetchBids = async () => {
    const { data, error } = await supabase
      .from('bids')
      .select('meme_id, user_id, credits')
      .order('credits', { ascending: false });

    if (!error && data) {
      const highestBids = {};
      data.forEach((bid) => {
        const id = bid.meme_id;
        if (!highestBids[id] || bid.credits > highestBids[id].credits) {
          highestBids[id] = { user_id: bid.user_id, credits: bid.credits };
        }
      });
      setBids(highestBids);
    } else {
      console.error("❌ Error fetching bids:", error?.message);
    }
  };

  const handleUpvote = async (id) => {
    const meme = memes.find((m) => m.id === id);
    const current = meme?.upvotes || 0;

    const { error } = await supabase
      .from('memes')
      .update({ upvotes: current + 1 })
      .eq('id', id);

    if (!error) {
      setMemes((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, upvotes: current + 1 } : m
        )
      );
      socket.emit('meme_upvoted', { ...meme, upvotes: current + 1 });
    } else {
      console.error('❌ Upvote failed:', error.message);
    }
  };

  const handleDownvote = async (id) => {
    const meme = memes.find((m) => m.id === id);
    const current = meme?.upvotes || 0;
    if (current === 0) return;

    const { error } = await supabase
      .from('memes')
      .update({ upvotes: current - 1 })
      .eq('id', id);

    if (!error) {
      fetchMemes();
    } else {
      console.error('❌ Downvote failed:', error.message);
    }
  };

  const handleBid = async (memeId) => {
    const credits = parseInt(bidInputs[memeId], 10);
    const user_id = 'cyberpunk420';

    if (isNaN(credits)) {
      alert('❌ Enter a valid credit amount');
      return;
    }

    const { error } = await supabase
      .from('bids')
      .insert([{ meme_id: memeId, credits, user_id }]);

    if (!error) {
      socket.emit('new_bid', { meme_id: memeId, credits, user_id });
      setBids((prev) => {
        const existing = prev[memeId];
        if (!existing || credits > existing.credits) {
          return { ...prev, [memeId]: { user_id, credits } };
        }
        return prev;
      });
      setBidInputs((prev) => ({ ...prev, [memeId]: '' }));
    } else {
      alert('❌ Failed to place bid!');
    }
  };

  const generateCaption = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/memes/${id}/generate`, {
        method: 'POST'
      });
      const result = await response.json();

      if (response.ok) {
        setMemes((prev) =>
          prev.map((meme) =>
            meme.id === id
              ? {
                  ...meme,
                  caption: result.caption || '😅 No caption',
                  vibe: result.vibe || '✨ No vibe'
                }
              : meme
          )
        );
      } else {
        alert('❌ Gemini API failed: ' + result.error);
      }
    } catch (err) {
      console.error('❌ Gemini error:', err.message);
      alert('❌ Failed to generate caption');
    }
  };

 return (
  <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-black via-[#0a0116] to-black grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {loading ? (
      <p className="text-fuchsia-400 text-xl text-center animate-pulse">⚡ Loading memes from the grid...</p>
    ) : (
      memes.map((meme) => (
        <div
          key={meme.id}
          className="bg-[#0c0c1c] border border-fuchsia-700 rounded-2xl p-4 shadow-lg hover:shadow-[0_0_20px_#ff00ff66] transition-transform hover:scale-105"
        >
          <img
            src={meme.image_url}
            alt={meme.title}
            className="w-full h-64 object-cover rounded-xl border border-purple-700 mb-3"
          />

          <h3 className="text-xl font-bold text-fuchsia-400 mb-1 tracking-wider">{meme.title}</h3>

          <p className="text-gray-200 text-sm mb-2 italic">
            {meme.caption || '💬 No caption yet'}
          </p>

          <p className="text-sm text-fuchsia-200 mb-2">
            ✨ Vibe: <span className="italic">{meme.vibe || 'Unknown'}</span> | ❤️ {meme.upvotes ?? 0}
          </p>

          <p className="text-xs text-purple-300 mb-2">
            🧑 Posted by: <span className="italic">{meme.user_name || 'Anonymous Hacker'}</span>
          </p>

          <p className="text-sm text-emerald-300 font-semibold mb-2">
            💸 Highest Bid: <span className="text-white">{bids[meme.id]?.credits || 0}</span> cr by{' '}
            <span className="text-pink-400">{bids[meme.id]?.user_id || '—'}</span>
          </p>

          <div className="flex mt-3 gap-2">
            <input
              type="number"
              placeholder="Bid credits"
              value={bidInputs[meme.id] || ''}
              onChange={(e) => setBidInputs({ ...bidInputs, [meme.id]: e.target.value })}
              className="flex-1 px-3 py-1 rounded bg-black border border-fuchsia-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={() => handleBid(meme.id)}
              className="px-4 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded shadow hover:shadow-yellow-400/40 font-bold transition-all"
            >
              💰 Bid
            </button>
          </div>

          <button
            onClick={() => generateCaption(meme.id)}
            className="mt-3 w-full bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-fuchsia-700 text-white font-semibold py-1 rounded shadow hover:shadow-purple-500/40 transition-all"
          >
            🧠 Generate Caption & Vibe
          </button>

          <div className="flex gap-2 mt-4 justify-between">
            <button
              onClick={() => handleUpvote(meme.id)}
              className="flex-1 bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-500 hover:to-lime-400 text-white py-1 rounded shadow hover:shadow-lime-300/40 transition-all"
            >
              👍 Upvote
            </button>
            <button
              onClick={() => handleDownvote(meme.id)}
              className="flex-1 bg-gradient-to-r from-rose-600 to-red-500 hover:from-red-500 hover:to-pink-500 text-white py-1 rounded shadow hover:shadow-red-400/40 transition-all"
            >
              👎 Downvote
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);

 
};

export default MemeList;
