import React, { useState } from 'react';
import './oppgave3.css';



export default function Oppgave3() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [sum, setSum] = useState(0);
    const [message, setMessage] = useState('');

    const generateNumbers = () => {
        const randomNum1 = Math.floor(Math.random() * 11);
        const randomNum2 = Math.floor(Math.random() * 11);
        const sum = randomNum1 + randomNum2;

        setNum1(randomNum1);
        setNum2(randomNum2);
        setSum(sum);

        let parityMessage = '';
        if (randomNum1 % 2 === 0 && randomNum2 % 2 === 0) {
            parityMessage = 'Super kombo, begge er partall!.';
        } else if (randomNum1 % 2 !== 0 && randomNum2 % 2 !== 0) {
            parityMessage = 'Kombobombo, begge er oddetall!.';
        } else {
            parityMessage = 'Uff da, ingen kombo :(.';
        }

        const sumMessage = sum > 10 ? 'Summen er høyere en 10' 
                          : sum < 10 ? 'Summen er mindre en 10.' 
                          : 'Summen tilsvarer 10';

        setMessage(`${parityMessage} ${sumMessage}`);
    };

    return (
        <div className="container">
            <h1>Tallgal - Gamblecrazy</h1>
            <p>Tall 1: {num1}</p>
            <p>Tall 2: {num2}</p>
            <p>Sum: {sum}</p>
            <p>{message}</p>
            <button onClick={generateNumbers}>Spinn på nytt!</button>
        </div>
    );
}
