 import React from "react";
 import s from '../styles/listDogs.module.css'
 import CardDog from "./cardDog";

 export default function ListDogs({allDogs,dogsFilter}){
    
    return(
        <div className={s.container}>
            {dogsFilter.length>0? dogsFilter.map((dog)=><CardDog name={dog.name} img={dog.img} temperament={dog.temperament} weight={dog.weight} id={dog.id} key={dog.id}/>):
                allDogs && allDogs.map((dog)=><CardDog name={dog.name} img={dog.img} temperament={dog.temperament} weight={dog.weight} id={dog.id} key={dog.id}/>)
            }
        </div>
    )
}
