import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // 👈 New state for full name
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    let result;

    if (isSignUp) {
      result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // 👈 Save full name in metadata
          },
        },
      });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(isSignUp ? 'Signup successful! Check your email.' : 'Login successful!');
      setEmail('');
      setPassword('');
      setFullName('');
      // Optional: Redirect to home
      window.location.href = '/';
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-black text-white rounded-xl border border-pink-500">
      <h2 className="text-2xl font-bold text-center text-pink-400 mb-4">
        {isSignUp ? 'Sign Up' : 'Log In'}
      </h2>

      <form onSubmit={handleAuth} className="space-y-4">
        {isSignUp && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-pink-500"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-pink-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-pink-500"
        />

        <button
          type="submit"
          className="w-full p-2 bg-pink-500 hover:bg-pink-600 rounded font-bold"
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>

        {message && <p className="text-pink-300 text-sm">{message}</p>}
      </form>

      <p
        onClick={() => setIsSignUp(!isSignUp)}
        className="mt-4 text-center text-sm text-pink-400 cursor-pointer hover:underline"
      >
        {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
      </p>
    </div>
  );
};

export default Auth;
