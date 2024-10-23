import { useState, useEffect } from 'react'
import './App.css'
import klassekart from './klassekart'
import klasseinfo from './components/data/klasseinfo'

function App() {
  

  return (
    <>
      {console.log(klasseinfo["2ITB "])}
    <div>
      <div className='Header'>
        <h1>Header</h1>
      </div>

      <div className='Middle'>
        <h1>Middle</h1>
        <div className='right'>
          <h1>Right</h1>
        </div>
        <div className='left'>
          <h1>Left</h1>
        </div>
      </div>

      <div className='Footer'>
        <h1>Footer</h1>
      </div>
    </div>
    </>
  )
}

export default App
