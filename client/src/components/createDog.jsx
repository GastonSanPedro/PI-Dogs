import React, { useEffect, useState } from "react";
import { createDog } from "../redux/actions";
import s from "../styles/createDog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CreateDog() {
  const dispatch = useDispatch();
  const [temperament, setTemperament] = useState([])
  const [input, setInput] = useState({
    name: "",
    heightMin: 0,
    heightMax: 0,
    weightMin: 0,
    weightMax: 0,
    life_spanMin: 0,
    life_spanMax: 0,
    img: "",
    temperament: [],
  });
  const allTemperaments = useSelector((state) => state.temperaments.temperaments);

  const cambioEstado = (event) => {
      setInput({
      ...input,
      [event.target.name]: event.target.value.toString(),
      });
    }

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(input)
    dispatch(createDog(input));
  };

  useEffect(()=>{
    if(input.temperament) setTemperament([...new Set([...temperament,input.temperament])])
  },[input.temperament])

  return (
    <div className={s.container}>
      <form onSubmit={onSubmit}>
        <article className={s.name}>
          <label>Name: </label>
          <input onChange={cambioEstado} type="text" name="name" />
        </article>
        <article>
          <label>HeightMin: </label>
          <input onChange={cambioEstado} type="number" name="heightMin"  className={s.number}/>
        
          <label>HeightMax: </label>
          <input onChange={cambioEstado} type="number" name="heightMax" className={s.number}/>
        </article>
        <article>
          <label>WeightMin:</label>
          <input onChange={cambioEstado} type="number" name="weightMin" className={s.number}/>
          <label>WeightMax: </label>
          <input onChange={cambioEstado} type="number" name="weightMax" className={s.number}/>
        </article>
        <article>
          <label>Life_spanMin:</label>
          <input onChange={cambioEstado} type="number" name="life_spanMin" className={s.number}/>
          <label>Life_spanMax:</label>
          <input onChange={cambioEstado} type="number" name="life_spanMax" className={s.number}/>
        </article>
        <article>
          <label>Image:</label>
          <input onChange={cambioEstado} type="text" name="img" placeholder="Enter a URL"/>
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
          <textarea name="description" id="" cols="30" rows="10" value={temperament}></textarea>
        </article>
            <button type="submit" className={s.add} >Add Dog</button>
            <Link to="/home"><button className={s.back}>Go Back</button></Link>
      </form>
    </div>
  );
}
