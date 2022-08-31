import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDogById } from '../redux/actions'
import s from '../styles/dogDetail.module.css'
import Loading from "./loading";
import { Link } from 'react-router-dom'

export default function DogDetail(){
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    let {id} = useParams();

    useEffect(()=>{
        dispatch(getDogById(id))
    },[dispatch, id])
     
    setTimeout(function(){
        setIsLoading(false)
    }, 3000);

    const dog = useSelector(state => state.dogs.dogDetail)
    return(
        <div className={s.container}>
            {isLoading? 
            <Loading/>:
            <div className={s.containerDetail}>
                <h1>{dog.name}</h1>
             <img src={dog.img} alt="img" />
                <article className={s.infoCard}>
                    <p className={s.temperament}>Temperaments: {dog.temperament}</p>
                    <p>Weight: {dog.weight}</p>
                    <p>Height: {dog.height}</p>
                    <p>Life span: {dog.life_span}</p>
                    <Link to="/home"><button className={s.back}>Go Back</button></Link>
                </article>  
            </div>
            }
        </div>
    )
}