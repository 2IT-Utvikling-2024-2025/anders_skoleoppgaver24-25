import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Pult from "./Pult.jsx";
import folkData from '../data/folk.json';

export default function Klassekart() {
  const students = folkData["2ITB"];
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith('/student/')) {
    return null;
  }

  const handleStudentClick = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const renderPults = (start, end) =>
    students.slice(start, end).map(student => (
      <div key={student.id} onClick={() => handleStudentClick(student.id)}>
        <Pult student={student} />
      </div>
    ));

  return (
    <div className='parent'>
      <h1>Klassekart 2ITB</h1>
      <p className='lærer'>Joakim</p>
      <div className='klassekart'>
        <div className='venstreside'>{renderPults(0, 9)}</div>
        <div className='midtgang'></div>
        <div className='hoyreside'>{renderPults(9, students.length)}</div>
      </div>
    </div>
  );
}
