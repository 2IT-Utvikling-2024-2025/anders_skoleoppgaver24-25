import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './button'
import Profile from './Profile'

 


function App() {

  return (
    <>
      <div className='header'>
      </div>
      <div className='middle'>
      <h1> Velkommen til 2IT - React kurs</h1>
       <Button/>
       <Profile/>
      </div>
      <div className='footer'>
      </div>
     </>
  )
}

export default App
