import { useNavigate } from 'react-router-dom';

export default function Elev(props) {

    let name = props.name;
    
    return (


            <div className='elev'> {name} </div>

    )
}