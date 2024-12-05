import { useState, useEffect } from 'react'
import './App.css'

export default function App() {

  const [time, setTime] = useState(new Date())


  
  
  useEffect(() => {
    console.log('Nå endret komponenten seg');
    let myinterval = setInterval(() => {
      setTime(new Date())
    }, 1000);

    return clearInterval(myinterval);
  }, [])

  return (
    <>
      <div className='header'>
      </div>

      <div className='middle'>
          <p>{time.toLocaleDateString()}</p> 
          <p>{time.toLocaleTimeString()}</p>  
      </div>

      <div className='footer'>
      </div>
    </>
  )
}
