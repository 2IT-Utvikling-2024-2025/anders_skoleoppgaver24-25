import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import Explosion from 'react-explode/Corregidor'; 

export default function App() {
  const [time, setTime] = useState(10); 
  const [showExplosion, setShowExplosion] = useState(false); 

  useEffect(() => {
    const myInterval = setInterval(() => {
      setTime((nowTime) => {
        if (nowTime > 0) {
          const newTime = nowTime - 0.10;
          return parseFloat(newTime.toFixed(1)); 
        } else {
          setShowExplosion(true); 
          return 0; 
        }
      });
    }, 10);
    return () => clearInterval(myInterval);
  }, []);

  useEffect(() => {
    if (showExplosion) {
      const explosionTimeout = setTimeout(() => {
        setShowExplosion(false); 
        setTime(10); 
      }, 5000); 

      return () => clearTimeout(explosionTimeout);
    }
  }, [showExplosion]);

  return (
    <>
      <div className='header'>
         <a target='_blank' href="https://github.com/Eplestein"> <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png" alt="" /> </a>
      </div>
      <div className='middle'>
        {showExplosion ? (
          <Explosion size="400" delay={0} repeatDelay={0} repeat={5} radius={16} />
        ) : (
          <p>{time.toFixed(1)}</p> 
        )}
      </div>
      <div className='footer'>

      </div>
    </>
  );
}
