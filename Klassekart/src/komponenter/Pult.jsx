import React from 'react';
import './pult.css'
function Pult({ student, onClick }) {
  return (
    <button className='pult' onClick={onClick}>
      {student ? <p className='elevnavn'>{student.navn}</p> : <p>Klikk for å plassere elev</p>}
    </button>
  );
}

export default Pult;