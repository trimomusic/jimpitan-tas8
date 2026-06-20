import React, { useState } from 'react';
import { Laugh, Loader } from 'lucide-react';

export default function JokeGenerator() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jokeType, setJokeType] = useState('general');

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    try {
      let url = '';
      
      // menggunakan JokeAPI (https://jokeapi.dev/)
      if (jokeType === 'general') {
        url = 'https://v2.jokeapi.dev/joke/Any?format=txt';
      } else if (jokeType === 'programming') {
        url = 'https://v2.jokeapi.dev/joke/Programming?format=txt';
      } else if (jokeType === 'knock-knock') {
        url = 'https://v2.jokeapi.dev/joke/Knock-Knock?format=txt';
      }

      const response = await fetch(url);
      const data = await response.text();
      setJoke(data);
    } catch (err) {
      setError('Gagal mengambil joke. Coba lagi!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4 flex items-center justify-center\">
      <div className=\"max-w-md w-full bg-white rounded-lg shadow-2xl p-8\">
        {/* Header */}\n        <div className=\"flex items-center justify-center mb-6\">\n          <Laugh className=\"text-purple-600 mr-3\" size={32} />\n          <h1 className=\"text-3xl font-bold text-gray-800\">Joke Generator</h1>\n        </div>\n\n        {/* Joke Type Selector */}\n        <div className=\"mb-6\">\n          <label className=\"block text-sm font-semibold text-gray-700 mb-2\">Pilih Tipe Joke:</label>\n          <select\n            value={jokeType}\n            onChange={(e) => setJokeType(e.target.value)}\n            className=\"w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500\"\n          >\n            <option value=\"general\">😂 General Jokes</option>\n            <option value=\"programming\">💻 Programming Jokes</option>\n            <option value=\"knock-knock\">🚪 Knock Knock Jokes</option>\n          </select>\n        </div>\n\n        {/* Joke Display */}\n        <div className=\"mb-6 min-h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 flex items-center justify-center\">\n          {loading ? (\n            <div className=\"flex flex-col items-center\">\n              <Loader className=\"animate-spin text-purple-600 mb-2\" size={32} />\n              <p className=\"text-gray-600\">Sedang cari joke yang lucu...</p>\n            </div>\n          ) : error ? (\n            <p className=\"text-red-600 text-center font-semibold\">{error}</p>\n          ) : joke ? (\n            <p className=\"text-gray-800 text-center text-lg font-semibold\">{joke}</p>\n          ) : (\n            <p className=\"text-gray-500 text-center\">Klik tombol di bawah untuk mendapatkan joke random!</p>\n          )}\n        </div>\n\n        {/* Buttons */}\n        <div className=\"flex gap-3\">\n          <button\n            onClick={fetchJoke}\n            disabled={loading}\n            className=\"flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed\"\n          >\n            {loading ? 'Loading...' : '😂 Get Joke'}\n          </button>\n          <button\n            onClick={() => {\n              setJoke('');\n              setError('');\n            }}\n            className=\"flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition\"\n          >\n            Clear\n          </button>\n        </div>\n\n        {/* Footer Info */}\n        <p className=\"text-center text-xs text-gray-500 mt-6\">Powered by JokeAPI.dev</p>\n      </div>\n    </div>\n  );\n}\n