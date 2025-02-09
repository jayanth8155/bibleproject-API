// src/RandomVerse.jsx
import { useState } from 'react';

function RandomVerse() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch a random verse from the API
  const fetchRandomVerse = async () => {
    setLoading(true);
    setError(null);
    try {
      // The API endpoint for a random verse (JSON format)
      const response = await fetch('https://labs.bible.org/api/?passage=random&type=json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // API returns an array of verses; we take the first one
      if (data.length > 0) {
        setVerse(data[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="random-verse">
      <h2>Random Bible Verse</h2>
      <button onClick={fetchRandomVerse}>Get Random Verse</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {verse && (
        <div className="verse">
          <p>
            <strong>
              {verse.bookname} {verse.chapter}:{verse.verse}
            </strong>{' '}
            - {verse.text}
          </p>
        </div>
      )}
    </div>
  );
}

export default RandomVerse;
