import React, { useState } from 'react';
import './App.css';

function App() {
  const [cm, setCm] = useState('');
  const [inches, setInches] = useState(null);

  const handleConvert = () => {
    const cmValue = parseFloat(cm);
    if (!isNaN(cmValue)) {
      setInches(cmValue / 2.54);
    } else {
      setInches(null);
    }
  };

  return (
    <>
      <div className="name">


        <section id="example-element" tabIndex="0">
          <div className="face front">a</div>
          <div className="face back">b</div>
          <div className="face right">c</div>
          <div className="face left">d</div>
          <div className="face top">e</div>
          <div className="face bottom">f</div>
        </section>
      </div>

      <div className="converter">
        <input
          type="number"
          value={cm}
          onChange={(e) => setCm(e.target.value)}
          placeholder="Enter cm"
        />
        <button onClick={handleConvert}>Convert</button>
        {inches !== null && (
          <p>
            <strong>Inches:</strong> {inches.toFixed(2)}
          </p>
        )}
      </div>
    </>
  );
}

export default App;
