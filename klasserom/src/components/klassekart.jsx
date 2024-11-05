import klasseinfo from "./data/klasseinfo"
import Elev from "./Elev"
import './css/klassekart.css'

export default function Klassekart() {

    return (
        <div className="container">

        <div className='leftside'>

            <div className='box'>

              <div className='sitteplasser'>
                <Elev name="Jo"/>
                <Elev name="Jacob"/>
              </div>

              <div className='sitteplasser'> 
                <Elev name="Birk"/>
                <Elev name="Yevhenni"/>
              </div>

              <div className='sitteplasser'> 
                <Elev name="Oscar"/>
                <Elev name="Storm"/>
              </div>

            </div>
          </div>
            

        <div className='rightside'>

        <div className='box'>

            <div className='sitteplasser'> 
                <Elev name="Amanda"/>
                <Elev name="Angelina"/>
                <Elev name="Nora"/>
              </div>

            <div className='sitteplasser'> 
                <Elev name="Sigurd"/>
                <Elev name="Sander"/>
                <Elev name="Sindre"/>
              </div>

              <div className='sitteplasser'> 
                <Elev name="Mubashir"/>
                <Elev name="Anders"/>
                <Elev name="Sebastian"/>
              </div>
            
          </div>

          </div>


        </div>
    )
}