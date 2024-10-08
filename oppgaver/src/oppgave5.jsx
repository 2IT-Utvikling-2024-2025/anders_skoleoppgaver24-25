import React, { useState } from 'react';
import './oppgave5.css'; // 

const Oppgave5 = () => {
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState('');

  const handleInputChange = (e) => {
    const word = e.target.value;
    setInputText(word);

    if (word.length === 6) {
      setIcon('👍'); 
      setMessage('Bra! Ordet består av 6 bokstaver.'); 
    } else {
      setIcon('👎'); 
      setMessage(`Ordet ditt består av ${word.length} bokstaver.`); 
    }
  };

  return (
    <div className="oppgave5">
      <input
        type="text"
        placeholder="Skriv et ord som består av 6 bokstaver"
        value={inputText}
        onChange={handleInputChange}
      />
      <div className="feedback">
        <span className="icon">{icon}</span>
        <span className="message">{message}</span>
      </div>
    </div>
  );
};

export default Oppgave5;
