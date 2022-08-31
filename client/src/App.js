import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingPage.jsx";
import Home from "./components/home.jsx";
import CreateDog from "./components/createDog.jsx";
import DogDetail from "./components/dogDetail.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/createDog">
          <CreateDog />
        </Route>
        <Route exact path="/dogDetail/:id">
          <DogDetail/>
        </Route> 
      </Switch>
    </div>
  );
}

export default App;
