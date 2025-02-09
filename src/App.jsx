import RandomVerse from "./RandomVerse";
import SpecificVerse from "./SpecificVerse";

function App() {
  return (
    <div className="container">
      <h1>📖 Bible Verse App</h1>

   
      <RandomVerse />


      <SpecificVerse />

      <p className="footer">Created with React + Vite</p>
    </div>
  );
}

export default App;
