import React from "react";
import s from '../styles/pagination.module.css'


export default function Pagination({paginationBack, paginationNext, allDogs, dogsPerPage, pagination, dogsFilter}){
    const numberOfPages = []
    if(dogsFilter<=0){
        for (let i = 0; i < Math.ceil(allDogs.length/dogsPerPage); i++) {
            numberOfPages.push(i+1)
        }
    }else{
        for (let i = 0; i < Math.ceil(dogsFilter.length/dogsPerPage); i++) {
            numberOfPages.push(i+1)
        }
    }
    
    return(
        <div className={s.containerPagination}>
            <article className={s.pagination}>
            <button onClick={paginationBack} className={s.paginationButton}>Previous</button> 
                {numberOfPages && numberOfPages.map(number=>{
                     return (
                        <button key={number} className={s.paginationNumberButtons} onClick={()=>pagination(number)}>{number}</button>
                        )
                })}
            <button onClick={paginationNext} className={s.paginationButton}>Next</button>
            </article>
        </div>
    )
}