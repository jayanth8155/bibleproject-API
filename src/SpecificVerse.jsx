import { useState, useEffect } from 'react';

const books = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
  "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah",
  "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans",
  "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians",
  "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
  "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

function SpecificVerse() {
  const [book, setBook] = useState("John");
  const [chapter, setChapter] = useState(3);
  const [verse, setVerse] = useState(16);
  const [verseData, setVerseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVerse = async () => {
    setLoading(true);
    setError(null);

    try {
      const passage = `${book} ${chapter}:${verse}`;
      const response = await fetch(`https://labs.bible.org/api/?passage=${encodeURIComponent(passage)}&type=json`);
      if (!response.ok) throw new Error("Failed to fetch verse");
      
      const data = await response.json();
      if (data.length > 0) setVerseData(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse(); // Fetch verse on component load
  }, []);

  return (
    <div className="specific-verse">
      <h2>Select a Specific Verse</h2>

      <div className="selectors">
        <label>
          Book:
          <select value={book} onChange={(e) => setBook(e.target.value)}>
            {books.map((b, index) => (
              <option key={index} value={b}>{b}</option>
            ))}
          </select>
        </label>

        <label>
          Chapter:
          <input
            type="number"
            min="1"
            max="150"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
        </label>

        <label>
          Verse:
          <input
            type="number"
            min="1"
            max="176"
            value={verse}
            onChange={(e) => setVerse(e.target.value)}
          />
        </label>

        <button onClick={fetchVerse}>Get Verse</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {verseData && (
        <div className="verse">
          <p>
            <strong>
              {verseData.bookname} {verseData.chapter}:{verseData.verse}
            </strong>{" "}
            - {verseData.text}
          </p>
        </div>
      )}
    </div>
  );
}

export default SpecificVerse;
