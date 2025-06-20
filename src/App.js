// // App.js
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
// import CreateMeme from './components/CreateMeme';
// import MemeList from './components/MemeList';
// import Auth from './components/Auth';
// import LandingPage from './components/LandingPage';
// import TrendingMemes from './components/TrendingMemes'; // ✅ NEW
// import { supabase } from './supabaseClient';

// const Navbar = () => {
//   const location = useLocation();
//   const [session, setSession] = useState(null);

//   // Fetch auth session
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//     return () => listener?.subscription?.unsubscribe();
//   }, []);

//   // 🛸 Hide navbar on landing page
//   if (location.pathname === '/') return null;

//   return (
//     <nav className="w-full px-6 py-4 bg-black/70 backdrop-blur-md shadow-xl border-b border-fuchsia-600 flex justify-between items-center text-white z-50">
//       <h1 className="text-fuchsia-500 font-extrabold text-2xl tracking-widest drop-shadow-[0_0_10px_#ff00ff]">
//         ⚡ MemeHustle
//       </h1>

//       <div className="flex gap-4 md:gap-6 text-sm md:text-base font-semibold">
//         <NavButton to="/memes" label="🚀 Explore Memes" />
//         <NavButton to="/create" label="🎨 Create Meme" />
//         <NavButton to="/trending" label="🌟 Trending" /> {/* ✅ New trending button */}
//         {!session && <NavButton to="/auth" label="🔐 Login here" />}
//         {session && (
//           <button
//             onClick={async () => {
//               await supabase.auth.signOut();
//               window.location.href = '/auth';
//             }}
//             className="px-4 py-1 rounded-xl bg-gradient-to-br from-pink-600 to-fuchsia-700 hover:from-pink-500 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-400 text-white"
//           >
//             🚪 Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// // Reusable NavButton with glow + gradient hover
// const NavButton = ({ to, label }) => (
//   <Link
//     to={to}
//     className="px-4 py-1 rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 hover:from-pink-500 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-md shadow-fuchsia-500 text-white"
//   >
//     {label}
//   </Link>
// );

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/memes" element={<MemeList />} />
//         <Route path="/create" element={<CreateMeme />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route path="/trending" element={<TrendingMemes />} /> {/* ✅ Route added */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import CreateMeme from './components/CreateMeme';
import MemeList from './components/MemeList';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import TrendingMemes from './components/TrendingMemes';
import { supabase } from './supabaseClient';

const Navbar = () => {
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  if (location.pathname === '/') return null;

  return (
    <nav className="w-full px-4 sm:px-6 py-4 bg-black/70 backdrop-blur-md shadow-xl border-b border-fuchsia-600 flex flex-wrap justify-between items-center text-white z-50 relative">
      <h1 className="text-fuchsia-500 font-extrabold text-2xl tracking-widest drop-shadow-[0_0_10px_#ff00ff]">
        ⚡ MemeHustle
      </h1>

      <button
        className="sm:hidden text-white text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className={`w-full sm:w-auto flex-col sm:flex-row sm:flex gap-4 md:gap-6 text-sm md:text-base font-semibold ${menuOpen ? 'flex' : 'hidden'} sm:flex mt-4 sm:mt-0`}>
        <NavButton to="/memes" label="🚀 Explore Memes" />
        <NavButton to="/create" label="🎨 Create Meme" />
        <NavButton to="/trending" label="🌟 Trending" />
        {!session && <NavButton to="/auth" label="🔐 Login here" />}
        {session && (
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = '/auth';
            }}
            className="px-4 py-1 rounded-xl bg-gradient-to-br from-pink-600 to-fuchsia-700 hover:from-pink-500 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-400 text-white"
          >
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const NavButton = ({ to, label }) => (
  <Link
    to={to}
    className="px-4 py-1 rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 hover:from-pink-500 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-md shadow-fuchsia-500 text-white text-center"
  >
    {label}
  </Link>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/memes" element={<MemeList />} />
        <Route path="/create" element={<CreateMeme />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/trending" element={<TrendingMemes />} />
      </Routes>
    </Router>
  );
}

export default App;
