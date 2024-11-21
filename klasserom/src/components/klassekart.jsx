import { useEffect, useState } from "react";
import klasseinfo from "./data/klasseinfo";
import Elev from "./Elev";
import './css/klassekart.css';
import larer from "./data/lærere";

export default function Klassekart() {
    const [students, setStudents] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [tableAssignments, setTableAssignments] = useState({
        left: Array(3).fill([null, null]),  
        right: Array(3).fill([null, null, null]),
        teacher: Array(1).fill([null])
    });

    useEffect(() => {
        setStudents(klasseinfo["2ITB"]);
    }, []);

    const handleSeatClick = (side, tableIndex, seatIndex) => {
        setSelectedSeat({ side, tableIndex, seatIndex });
    };

    const assignStudentToSeat = (student) => {
        if (selectedSeat) {
            const { side, tableIndex, seatIndex } = selectedSeat;
            setTableAssignments(prevAssignments => {
                const updatedAssignments = { ...prevAssignments };
                updatedAssignments[side][tableIndex] = updatedAssignments[side][tableIndex].map((s, i) =>
                    i === seatIndex ? student : s  
                );
                return updatedAssignments;
            });
            setSelectedSeat(null);  
        }
    };

    return (
        <div className="container">
            
            <div className="leftside">
                <div className="box">
                    {tableAssignments.left.map((table, tableIndex) => (
                        <div key={`left-${tableIndex}`} className="sitteplasser">
                            {table.map((student, seatIndex) => (
                                <button
                                    key={seatIndex}
                                    onClick={() => handleSeatClick('left', tableIndex, seatIndex)}
                                >
                                    <Elev name={student ? student.navn : "Velg elev"} />
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

           
            <div className="rightside">
                <div className="box">
                    {tableAssignments.right.map((table, tableIndex) => (
                        <div key={`right-${tableIndex}`} className="sitteplasser">
                            {table.map((student, seatIndex) => (
                                <button
                                    key={seatIndex}
                                    onClick={() => handleSeatClick('right', tableIndex, seatIndex)}
                                >
                                    <Elev name={student ? student.navn : "Velg elev"} />
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            
            {selectedSeat && (
                <div className="student-selection-modal">
                    <h3>Velg elev</h3>
                    <ul>
                        {students.map((student) => (
                            <li key={student.id} onClick={() => assignStudentToSeat(student)}>
                                {student.navn}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setSelectedSeat(null)}>Lukk</button>
                </div>
            )}
        </div>
    );
}
