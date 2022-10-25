import React from "react";
import s from '../styles/temperaments.module.css'


export default function Temperaments ({temperament, deleteTemperament}){
   
    return(
        <div className={s.temperaments}>
            <p>{temperament}</p>
            <button onClick={(e)=>deleteTemperament(e,temperament)}>X</button>
        </div>
    )
}