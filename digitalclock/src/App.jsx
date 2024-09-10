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
          return nowTime - 1; 
        } else {
          setShowExplosion(true); 
          return 0; 
        }
      });
    }, 1000);
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

      </div>
      <div className='middle'>
        {showExplosion ? (
          <Explosion size="400" delay={0} repeatDelay={0} repeat={10} radius={16} />
        ) : (
          <p>{time}</p>
        )}
      </div>

      <div className='footer'></div>
    </>
  );
}
