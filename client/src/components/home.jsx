import React from "react";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { getDogsByName, getAllDogs, getAllTemperaments, orderByName, orderByWeight, filterByTemperament, filterByFrom} from "../redux/actions";
import { useState, useEffect} from "react";
import SearchBar from  './searchBar.jsx'
import ListDogs from './listDogs';
import s from "../styles/home.module.css"
import logo from "../img/logo.jpg"
import Loading from "./loading";
import Pagination from "./pagination.jsx"

export default function Home (){
    //PRECARGO LA PAGINA CON TODAS LAS RECETAS
    const dispatch = useDispatch()
    const allDogs = useSelector(state => state.dogs.dogs); 
    const dogsFilter= useSelector(state => state.dogs.dogsFilter)

    useEffect(()=>{
    dispatch(getAllDogs());
    dispatch(getAllTemperaments())
    },[dispatch])  

    const [searchInput, setSearchInput]= useState("")
    const [isLoading, setIsLoading]= useState(true)
    const [currentPage, setCurrentPage] = useState(0)

    setTimeout(function(){
        setIsLoading(false)
    }, 3000);

    const onChangeSearch = (event)=>{
        setSearchInput(event.target.value)
    }

    const onClickSearch = (event)=> {
        event.preventDefault()
        setCurrentPage(0)
        dispatch(getDogsByName(searchInput))
    }

    const onChangeOrderAlpabethic = (event)=>{
        dispatch(orderByName(event.target.value))
        setCurrentPage(0)
    }

    const onChangeOrderWeight =(event)=>{
        dispatch(orderByWeight(event.target.value))
        setCurrentPage(0)
    }

    const onChangeTemperament = (event)=>{
        dispatch(filterByTemperament(event.target.value))
        setCurrentPage(0)
    }

    const onChangeFrom = (event)=>{
        dispatch(filterByFrom(event.target.value))
        setCurrentPage(0)
    }
    const paginationBack = ()=>{
        if(currentPage > 0) setCurrentPage(currentPage - 8)
    }

    const paginationNext = ()=>{
        if(allDogs.length > currentPage + 8) setCurrentPage(currentPage + 8)
    }

    const allDogsPagination = ()=>{
        return allDogs.slice(currentPage,currentPage + 8)
    }

    const dogsFilterPagination = ()=>{
            return dogsFilter.slice(currentPage,currentPage + 8)
    }
    

    return(
        <div>
            {isLoading? 
            <Loading/>: 
            <div className={s.home}>
            <article className={s.header}>
            <img src={logo} alt="logo" className={s.logo}/>
            <SearchBar onChangeSearch={onChangeSearch} onChangeOrderAlpabethic={onChangeOrderAlpabethic} onChangeTemperament={onChangeTemperament} onClickSearch={onClickSearch} onChangeOrderWeight={onChangeOrderWeight} onChangeFrom={onChangeFrom}/>
            </article>
            <Pagination paginationNext={paginationNext} paginationBack={paginationBack}/>
            <ListDogs allDogs={allDogsPagination()} dogsFilter={dogsFilterPagination()}/> 
            <Link to="/createDog"><button className={s.createRecipe}>Add new dog</button></Link>
            </div>}
        </div>
    )
}
