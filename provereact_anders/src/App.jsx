import React from 'react';
import Weather from './weather';
import Converter from './Converter';
import './App.css';
import axios from 'axios';

const App = () => {
  return (
    <div className='container'>
      <div className='half1'>
        <h1>Vær</h1>
        <Weather />
      </div>

      <div className='half2'>
        <h1></h1>
        <h1>Valuta</h1>
        <Converter/>
      </div>
    </div>
  );
};

export default App;