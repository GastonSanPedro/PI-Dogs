import React from "react";
import s from "../styles/searchBar.module.css";
import {useSelector} from "react-redux"

export default function SearchBar({
  onChangeSearch,
  onChangeOrderAlpabethic,
  onChangeTemperament,
  onClickSearch,
  onChangeOrderWeight,
  onChangeFrom,
  clearFilters,
  searchInput
}) {

  const allTemperaments = useSelector(state => state.temperaments.temperaments);  
  const allDogs = useSelector(state => state.dogs.dogs)
  
  return (
    <div className={s.searchBar}>
      <section className={s.buscador}>
        <article className={s.marco}>
        <p className={s.searchDog}>Search a dog</p>
        </article>
        <input
          type="text"
          placeholder="Type something to search..."
          onChange={onChangeSearch}
          value={searchInput}
        />
        <button onClick={onClickSearch} className={s.buttonSearch}>Search</button>
      </section>
      <section>
        <p>Order By:</p>
        <select
          name="orderAlpabethicDogs"
          className={s.order}
          onChange={(e)=>onChangeOrderAlpabethic(e)}
        >
          <option value="Alpabethic" selected disabled >Alpabethic</option>
          <option value="ascendent">A to Z</option>
          <option value="descendent">Z to A</option>
        </select>
        <select
          name="orderweightDogs"
          className={s.order}
          onChange={onChangeOrderWeight}
        >
          <option value="Weight"  selected disabled >Weight</option>
          <option value="asc">Higher to lower</option>
          <option value="des">Lower to higher</option>
        </select>
      </section>
      <section>
        <p>Filter by:</p>
        <select
          name="filterDbAndApi"
          className={s.order}
          onChange={(e)=>onChangeFrom(e)}
        >
          <option value="From" selected disabled>From</option>
          <option value="all">All</option>
          <option value="db">DB</option>
          <option value="api">API</option>
        </select>
        <select onChange={onChangeTemperament}>
          <option selected disabled>Temperaments</option>
          <option value="all" >All</option>
          {allTemperaments &&
            allTemperaments.map((el) => {
              return <option value={el.name} key={el.ID}>{el.name}</option>;
            })}
        </select>
        <button className={s.buttonClear} onClick={clearFilters} value="clearFilters">Clear Filters</button>
      </section>
    </div>
  );
}
