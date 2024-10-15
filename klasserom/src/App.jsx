import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Klassekart from './klassekart'
import klasseinfo from './components/data/klasseinfo'

function App() {
  const [count, setCount] = useState(0)

  

  return (
    <>
      {console.log(klasseinfo["2ITA"][3])}
    <div>
      <div className='Header'>
        <h1>Header</h1>
      </div>

      <div className='Middle'>
        <h1>Middle</h1>
      </div>

      <div className='Footer'>
        <h1>Footer</h1>
      </div>
    </div>
    </>
  )
}

export default App
