import React, { useState } from 'react';
import './oppgave2.css';

export default function Oppgave2() {

  const erPartall = (tall) => {
    return tall % 2 === 0;
  };


  const filtrerPartall = (array) => {
    return array.filter(erPartall);
  };

  const [tilfeldigeTall, setTilfeldigeTall] = useState([]);
  const [partall, setPartall] = useState([]);

 
  const genererTilfeldigeTall = () => {
    const nyeTall = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setTilfeldigeTall(nyeTall);
    setPartall(filtrerPartall(nyeTall));
  };

  return (
    <div>
      <h1>Partall filtrering</h1>
      <button onClick={genererTilfeldigeTall}>Generer tilfeldige tall</button>
      
      <h2>Tilfeldige tall:</h2>
      <ul>
        {tilfeldigeTall.map((tall, index) => (
          <li key={index}>{tall}</li>
        ))}
      </ul>

      <h2>Partall:</h2>
      <ul>
        {partall.map((tall, index) => (
          <li key={index}>{tall}</li>
        ))}
      </ul>
    </div>
  );
}
