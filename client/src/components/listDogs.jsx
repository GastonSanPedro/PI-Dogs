 import React, { useEffect, useState } from "react";
 import s from '../styles/listDogs.module.css'
 import CardDog from "./cardDog";

 export default function ListDogs({allDogs,dogsFilter}){

    const [isEmpty,setIsEmpty]=useState(false)

    useEffect(()=>{
        if(allDogs.length<=0){
            setIsEmpty(true)
        }else{
        setIsEmpty(false)
        }
    },[allDogs])

    console.log(allDogs.length)
    console.log(isEmpty)
    return(
        <div className={s.container}>
            {isEmpty? <h1 className={s.anyDog}>Sorry, there aren't any dog with that name...</h1>: dogsFilter.length>0? dogsFilter.map((dog)=><CardDog name={dog.name} img={dog.img} temperament={dog.temperament} weight={dog.weight} id={dog.id} key={dog.id}/>):
                allDogs && allDogs.map((dog)=><CardDog name={dog.name} img={dog.img} temperament={dog.temperament} weight={dog.weight} id={dog.id} key={dog.id}/>)
            }
        </div>
    )
}
