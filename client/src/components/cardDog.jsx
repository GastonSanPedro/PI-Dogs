import React from 'react'
import s from '../styles/cardDog.module.css'
import {Link} from 'react-router-dom'

export default function CardDog({name, img, temperament, weight, id}){
    
    return(
        <div className={s.cardContainer}>
                <img src={img} alt="img" />
                <article className={s.infoCard}>
                    <h1 className={s.tittle}>{name}</h1>
                        <p className={s.temperament}>{temperament}</p>
                        <p>Weight: {weight}</p>
                        <Link to={`/dogDetail/${id}`} style={{ textDecoration: 'none' }}>
                            <section className={s.buttonVerMas}>See +</section>
                        </Link>
                </article>
        </div>
    )
}
