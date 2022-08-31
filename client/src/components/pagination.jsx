import React from "react";
import s from '../styles/pagination.module.css'


export default function Pagination({paginationBack, paginationNext}){
    return(
        <div className={s.pagination}>
            <button onClick={paginationBack} className={s.paginationButton}>Previous</button>
            <button onClick={paginationNext} className={s.paginationButton}>Next</button>
        </div>
    )
}