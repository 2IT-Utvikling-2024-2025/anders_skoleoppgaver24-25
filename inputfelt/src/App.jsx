import { useState } from 'react'
import './App.css'

function App() {
  // State for the quiz answer
  const [answer, setAnswer] = useState('');
  // State for image animation
  const [animate, setAnimate] = useState(false);

  // Update the quiz answer state
  function updateAnswer(e) {
    setAnswer(e.target.value);
    console.log(e.target.value);
  }

  // Check if the selected answer is correct
  function checkAnswer() {
    if (answer === 'Dynamittveien 25A') {
      alert('Riktig svar!');
    } else {
      alert('Feil svar');
    }
  }

  // Handle image hover animation
  const handleMouseEnter = () => {
    setAnimate(true);
  };

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <>
      <div className='header'>
        <div className="image-container">
          <img 
            src="https://images.firstpost.com/uploads/2024/09/Biden-2024-09-1dd7b1fa72ae51b7bf1295cc43868d74.jpg?im=FitAndFill=(596,336)" 
            alt="Biden" 
            className={animate ? 'animate' : ''} 
            onMouseEnter={handleMouseEnter} 
            onAnimationEnd={handleAnimationEnd} 
          />
        </div>
        <h1>Quiz om drømtorp</h1>
      </div>
      <div className='middle'>
        <div className='question'>
          <p>Hva er adressen til drømtorp?</p>
          <input type="text" onChange={updateAnswer} className='box'/>

          <label>
            <input type="radio" value="Dynamittveien 25A" name="address" onChange={updateAnswer} />
            Dynamittveien 25A
          </label>

          <label>
            <input type="radio" value="Skiveien 32" name="address" onChange={updateAnswer} />
            Skiveien 32
          </label>

          <label>
            <input type="radio" value="Åsveien 24" name="address" onChange={updateAnswer} />
            Åsveien 24
          </label>

          <button className='button' onClick={checkAnswer}>Sjekk svaret</button>
        </div>
      </div>
      <div className='footer'>
        {/* You can add footer content here */}
      </div>
    </>
  );
}

export default App;
