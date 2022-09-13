import React, { useEffect, useState } from "react";
import { createDog, getAllTemperaments } from "../redux/actions";
import s from "../styles/createDog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const validate = (input) => {

  let errors = {}
  //Name ERRORS
  if(!input.name) {
      errors.name = "Name is required"
  }
  if(input.name.length < 3){
    errors.name = "Name length can't be less than 3"
  }
  //Height ERRORS
  if(!input.heightMin || !input.heightMax) {
      errors.height = "Height is required"
  }
  if(input.heightMin < 0 || input.heightMax < 0) {
    errors.height = "Height can't be less than 0"
  }
  if(input.heightMin > 999 || input.heightMax > 999) {
    errors.height = "Height can't be higher than 999"
  }
  if(input.heightMax < input.heightMin){
    errors.height = "Height min can't be higher than height max"
  }
  //Weight ERRORS
  if(!input.weightMin || !input.weightMax) {
      errors.weight = "Weight is required"
  }
  if(input.weightMin < 0 || input.weightMax < 0) {
    errors.weight = "Weight can't be less than 0"
  }
  if(input.weightMin > 999 || input.weightMax > 999) {
    errors.weight = "Weight can't be higher than 999"
  }
  if(input.weightMax < input.weightMin){
    errors.weight = "Weight min can't be higher than Weight max"
  }
//LifeSpan ERRORS
  if(!input.life_spanMin || !input.life_spanMax) {
      errors.life_span = "Life Span is required"
  }
  if(input.life_spanMin < 0 || input.life_spanMax < 0) {
    errors.life_span = "Life Span can't be less than 0"
  }
  if(input.life_spanMin > 999 || input.life_spanMax > 999) {
    errors.life_span = "Life Span can't be higher than 999"
  }
  if(input.life_spanMax < input.life_spanMin){
    errors.life_span = "Life span min can't be higher than Life span max"
  }

  return errors
}


export default function CreateDog() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllTemperaments())
  },[])
  const allTemperaments = useSelector((state) => state.temperaments.temperaments);

  const[activateButton, setIsActivateButton]=useState(true)

  const [errors, setErrors] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_spanMin: "",
    life_spanMax: "",
    img: "",
});

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_spanMin: "",
    life_spanMax: "",
    img: "",
    temperament: [],
  });
  

  useEffect(()=>{
    if (input.name.length > 0 && input.heightMin.length > 0  && input.heightMax.length > 0 && input.weightMin.length > 0 && input.weightMax.length > 0 && input.life_spanMax > 0 && input.life_spanMin > 0) setIsActivateButton(false)
    else setIsActivateButton(true)
}, [input, setIsActivateButton]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createDog(input));
    alert("Dog was added successfully");

    setInput({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      life_spanMin: "",
      life_spanMax: "",
      img: "",
      temperament: [],
    });
  };

  const cambioEstado = (event) => {
    if(event.target.name === "temperament"){
      setInput({
        ...input,
        temperament: [...new Set([...input.temperament, event.target.value])]
      })
    }else{
      setInput({
        ...input,
        [event.target.name]: event.target.value.toString(),
        });
    }
    setErrors(validate({
      ...input,
      [event.target.name] : event.target.value
  }))
}

const setTemperaments = (event)=>{
  setInput({
    ...input,
    temperament: (input.temperament).join(", ")
  })
}



  return (
    <div className={s.container}>
      <form onSubmit={onSubmit}>
        <article className={s.name}>
          <label>Name: </label>
          <input onChange={cambioEstado} type="text" name="name" value={input.name}/>
        </article>
        <div className={s.error}>{errors.name && <p>{errors.name}</p>}</div>
        <article>
          <label>HeightMin: </label>
          <input onChange={cambioEstado} type="number" name="heightMin"  className={s.number}  value={input.heightMin}/>
          <label>HeightMax: </label>
          <input onChange={cambioEstado} type="number" name="heightMax" className={s.number}  value={input.heightMax}/>
        </article>
        <div className={s.error}>{errors.height && <p>{errors.height}</p>}</div>
        <article>
          <label>WeightMin:</label>
          <input onChange={cambioEstado} type="number" name="weightMin" className={s.number} value={input.weightMin}/>
          <label>WeightMax: </label>
          <input onChange={cambioEstado} type="number" name="weightMax" className={s.number} value={input.weightMax}/>
        </article>
        <div className={s.error}>{errors.weight && <p>{errors.weight}</p>}</div>
        <article>
          <label>Life_spanMin:</label>
          <input onChange={cambioEstado} type="number" name="life_spanMin" className={s.number} value={input.life_spanMin}/>
          <label>Life_spanMax:</label>
          <input onChange={cambioEstado} type="number" name="life_spanMax" className={s.number} value={input.life_spanMax}/>
        </article>
        <div className={s.error}>{errors.life_span && <p>{errors.life_span}</p>}</div>
        <article>
          <label>Image:</label>
          <input onChange={cambioEstado} type="text" name="img" placeholder="Enter a URL (optional)" value={input.img}/>
        </article>
        <article>
          <select onChange={cambioEstado}  name="temperament">
            <option value="Temperament" disabled selected>Temperament</option>
            {allTemperaments && allTemperaments.map((el) => {
                return (
                  <option value={el.name} key={el.ID}>{el.name}</option>
                );
              })}
          </select>
          <textarea name="description" id="" cols="30" rows="10" value={input.temperament}></textarea>
        </article>
            <button type="submit" onClick={setTemperaments}className={s.add} disabled={activateButton} style={{border:activateButton? "2px solid red": "2px solid green", color:activateButton?"red": "green"}}>Add Dog</button>
            <Link to="/home"><button className={s.back}>Go Back</button></Link>
      </form>
    </div>
  );
}
