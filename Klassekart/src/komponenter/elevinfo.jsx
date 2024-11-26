import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import folkData from '../data/folk.json';

const calculateAge = (birthday) => {
  if (!birthday) return "Unknown"; 
  const [day, month, year] = birthday.split('/');
  const birthDate = new Date(year || '2007', (month - 1) || 0, day || '1');
  const currentDate = new Date();

  const ageDiff = currentDate - birthDate;
  const ageDate = new Date(ageDiff); 
  return Math.abs(ageDate.getUTCFullYear() - 1970); 
};

const profilePicture = (gender) => {
  const dummy_female = "https://upload.wikimedia.org/wikipedia/en/b/b9/Princess_Fiona.png";
  const dummy_male = "https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png";
  const custom1 = "";
  const custom2 = "";
  const custom3 = "";

  
  if (gender?.toLowerCase() === "male") {
    return <img src={dummy_male} alt="Male profile" />;
  } else if (gender?.toLowerCase() === "female") {
    return <img src={dummy_female} alt="Female profile" />;
  } else {
    return <div>Unknown gender</div>;
  }
};

export default function Elevinfo() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  
  const students = folkData["2ITB"];

  
  const student = students.find(({ id }) => id.toString() === studentId);

  if (!student) {
    return <div>Elev ikke funnet
    </div>;
  }

  const { navn, birthday, gender } = student; 

  return (
    <div className='parent'>
      
      {profilePicture(gender)}
      <h2>{navn}</h2>
      <p>Age: {calculateAge(birthday)} years old</p>
      <button className='tilbake' onClick={() => navigate('/')}>
        Tilbake til Klassekart
      </button>
    </div>
  );
}
