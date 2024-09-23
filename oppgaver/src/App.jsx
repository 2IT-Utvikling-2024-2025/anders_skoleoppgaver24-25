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
          <div className="face front">1</div>
          <div className="face back">2</div>
          <div className="face right">3</div>
          <div className="face left">4</div>
          <div className="face top">5</div>
          <div className="face bottom">6</div>
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

        <div className='oppgave2'>
          
        </div>
    </>
  );
}

export default App;
