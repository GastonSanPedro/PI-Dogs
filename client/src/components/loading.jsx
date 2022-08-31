import React from "react";
import s from "../styles/loading.module.css"



export default function Loading (){
    return(
        <div className={s.loading}>
            <img className={s.imgLoading} src="http://northerntechmap.com/assets/img/loading-dog.gif" alt="giff_loading" />
        </div>
    )
}