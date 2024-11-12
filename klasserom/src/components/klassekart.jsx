import { useEffect, useState } from "react"
import klasseinfo from "./data/klasseinfo"
import Elev from "./Elev"
import './css/klassekart.css'

export default function Klassekart() {

    return (
        <div className="container">

        <div className='leftside'>

            <div className='box'>

              <div className='sitteplasser'>
                <button>
                  <Elev name="Jo"/>
                  <Elev name="Jacob"/>
                </button>
              </div>

              <div className='sitteplasser'> 
                <button>
                  <Elev name="Birk"/>
                  <Elev name="Yevhenni"/>
                </button>
              </div>

              <div className='sitteplasser'> 
                <button>
                  <Elev name="Oscar"/>
                  <Elev name="Storm"/>
                </button>
              </div>

            </div>
          </div>
            

        <div className='rightside'>

        <div className='box'>

            <div className='sitteplasser'> 
              <button>
                <Elev name="Amanda"/>
                <Elev name="Angelina"/>
                <Elev name="Nora"/>
              </button>
              </div>

            <div className='sitteplasser'> 
              <button>
                <Elev name="Sigurd"/>
                <Elev name="Sander"/>
                <Elev name="Sindre"/>
              </button>
              </div>

              <div className='sitteplasser'> 
              <button>
                <Elev name="Mubashir"/>
                <Elev name="Anders"/>
                <Elev name="Sebastian"/>
              </button>
              </div>
            
          </div>

          </div>


        </div>
    )
}