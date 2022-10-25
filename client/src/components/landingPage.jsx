import React from "react";
import s from '../styles/landingPage.module.css'
import { Link } from "react-router-dom";
import huesoPerro from "../img/huesoPerro.png"

function LandingPage() {
  return (
    <div className={s.landingPage}>
      <div className={s.container}>
      <div className={s.title}>¡Welcome!</div>
      <p className={s.subtitle}>Search and meet about all dogs</p>
      <Link to="/home"><button className={s.enter}>Enter</button></Link> 
      </div>
    </div>
  );
}

export default LandingPage;