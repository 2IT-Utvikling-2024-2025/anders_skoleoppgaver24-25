import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './button'
import Bluebutton from './bluebutton'

let isLoggedIn = true;
let content;


if (isLoggedIn) {
  content = <Button />;
} else {
  content = <Bluebutton />;
}



const products = [
  { title: 'Hvalbiff', Hvalcheck: true, id: 1 },
  { title: 'Hvallever', Hvalcheck: false, id: 2 },
  { title: 'Hvalnyre', Hvalcheck: false, id: 3 }
];
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

function App() {

  return (
    <>
      <div className='header'>
      <h1>Drikk en iskald coca cola i dag!</h1>
      </div>

      <div className='middle'>
      <h1> Velkommen til 2IT - React kurs</h1>
      {content}
      </div>

      <div className='footer'>
      <h1>Kjøp en saftig burger hos burger king!</h1>
      </div>
     </>
  )
}

export default App
