import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Klassekart from './komponenter/klassekart.jsx';
import Elevinfo from './komponenter/elevinfo.jsx';
import folkData from './data/folk.json';

function App() {
  const students = folkData["2ITB"];
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Klassekart />} />
        <Route path="/student/:studentId" element={<Elevinfo students={students} />} />
      </Routes>
    </Router>
  );
}

export default App;
