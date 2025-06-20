import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const LandingPage = () => {
  const navigate = useNavigate();

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* ✨ Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: '#000' } },
          particles: {
            number: { value: 100 },
            color: { value: ['#f0f', '#0ff', '#ff0'] },
            shape: { type: 'circle' },
            opacity: { value: 0.6 },
            size: { value: 3 },
            move: { enable: true, speed: 2 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* 🧠 Text and Buttons */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-neon mb-6"
        >
          ⚡ MemeHustle
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
        >
          Welcome to the neon battleground of memes — bid, rise, dominate.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <button
            onClick={() => navigate('/memes')}
            className="bg-pink-500 hover:bg-pink-600 px-6 py-3 text-lg rounded-full font-bold neon-btn"
          >
            🔍 Explore Memes
          </button>
          <button
            onClick={() => navigate('/create')}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 text-lg rounded-full font-bold neon-btn"
          >
            🎨 Create Meme
          </button>
          <button
            onClick={() => navigate('/memes')}
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 text-lg rounded-full font-bold neon-btn text-black"
          >
            📈 Trending
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
 