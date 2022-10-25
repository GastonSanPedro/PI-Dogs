import React from "react";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { getDogsByName, getAllDogs, getAllTemperaments, orderByName, orderByWeight, filterByTemperament, filterByFrom, clearAllFilters} from "../redux/actions";
import { useState, useEffect} from "react";
import SearchBar from  './searchBar.jsx'
import ListDogs from './listDogs';
import s from "../styles/home.module.css"
import logo from "../img/logo.jpg"
import Loading from "./loading";
import Pagination from "./pagination.jsx"
import fotoAddDog from "../img/addDog.jpg"

export default function Home (){
    //PRECARGO LA PAGINA CON TODAS LAS RECETAS
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs.dogs); 
    const dogsFilter= useSelector(state => state.dogs.dogsFilter);

    useEffect(()=>{
    dispatch(getAllDogs());
    dispatch(getAllTemperaments())
    },[dispatch])  


    const [searchInput, setSearchInput]= useState("")
    const [isLoading, setIsLoading]= useState(true)
//Paginado -----------------------------------------------------------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog-dogsPerPage
    const currentDog = allDogs.slice(indexOfFirstDog,indexOfLastDog)
    const currentDogFilter= dogsFilter.slice(indexOfFirstDog,indexOfLastDog)

    const pagination = (numberOfPage)=>{
        setCurrentPage(numberOfPage)
    }

    const paginationBack = ()=>{
        if(currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const paginationNext = ()=>{
        if(dogsFilter.length>0){
            if(Math.ceil((dogsFilter.length/dogsPerPage)) >= currentPage + 1) setCurrentPage(currentPage + 1)
        }else{
            if(Math.ceil((allDogs.length/dogsPerPage)) >= currentPage + 1) setCurrentPage(currentPage + 1)
        }
    }
//Aca TERMINA EL PAGINADO-----------------------------------------------------------------------------------

//Loading
    setTimeout(function(){
        setIsLoading(false)
    }, 3000);

//input search
    const onChangeSearch = (event)=>{
        setSearchInput(event.target.value)
    }

    const onClickSearch = (event)=> {
        event.preventDefault()
        setCurrentPage(1)
        dispatch(getDogsByName(searchInput))
        setSearchInput("")
    }

//orders
    const onChangeOrderAlpabethic = (event)=>{
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
    }

    const onChangeOrderWeight =(event)=>{
        dispatch(orderByWeight(event.target.value))
        setCurrentPage(1)
    }

//filters
    const onChangeTemperament = (event)=>{
        dispatch(filterByTemperament(event.target.value))
        setCurrentPage(1)
    }

    const onChangeFrom = (event)=>{
        dispatch(filterByFrom(event.target.value))
        setCurrentPage(1)
    }

    const clearFilters= (event)=>{
        dispatch(clearAllFilters(event.target.value))
        setCurrentPage(1)
    }

    return(
        <div>
            {isLoading? 
            <Loading/>: 
            <div className={s.home}>
            <article className={s.header}>
            <img src={logo} alt="logo" className={s.logo}/>
            <SearchBar onChangeSearch={onChangeSearch} onChangeOrderAlpabethic={onChangeOrderAlpabethic} onChangeTemperament={onChangeTemperament} onClickSearch={onClickSearch} onChangeOrderWeight={onChangeOrderWeight} onChangeFrom={onChangeFrom} clearFilters={clearFilters} searchInput={searchInput}/>
            </article>
            <Pagination allDogs={allDogs} dogsPerPage={dogsPerPage} pagination={pagination} dogsFilter={dogsFilter} paginationNext={paginationNext} paginationBack={paginationBack}/>
            <ListDogs allDogs={currentDog} dogsFilter={currentDogFilter}/> 
            <Link to="/createDog"><p className={s.addDog}><img src={fotoAddDog} alt="perro" className={s.createDog}/></p></Link>
            <Pagination allDogs={allDogs} dogsPerPage={dogsPerPage} pagination={pagination} dogsFilter={dogsFilter} paginationNext={paginationNext} paginationBack={paginationBack}/>
            </div>}
        </div>
    )
}
