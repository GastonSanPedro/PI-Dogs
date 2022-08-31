import React from "react";
import s from '../styles/landingPage.module.css'
import { Link } from "react-router-dom";
import huesoPerro from "../img/huesoPerro.png"

function LandingPage() {
  return (
    <div className={s.landingPage}>
      <Link to="/home"><img src={huesoPerro} alt="hueso" className={s.huesoPerro}/></Link>
    </div>
  );
}

export default LandingPage;