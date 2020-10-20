import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import * as Index from "./static_pages/Index";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Covid from "./pages/Covid";
import Airports from "./pages/Airports";
import CovidDetail from "./components/CovidDetail";
import CityDetail from "./components/CityDetail";
import AirportDetail from "./components/AirportDetail";
// import CovidDetail from "./components/CovidDetail";
import Testing from "./components/Testing";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/Cities" component={Cities} exact></Route>
          <Route path="/Covid" component={Covid} exact></Route>
          <Route path="/Airports" component={Airports} exact></Route>
          <Route path="/About" component={About} exact></Route>
          <Route path="/Test/:id" component={Testing} exact></Route>
          <Route
            path="/Covid/:country_code"
            component={CovidDetail}
            exact
          ></Route>
          <Route
            path="/City/:city/:country_code"
            component={CityDetail}
            exact
          ></Route>
          <Route path="/Airport/:iata" component={AirportDetail} exact></Route>
          <Route
            path="/Airports/:country_code"
            component={CityDetail}
            exact
          ></Route>
          <Route
            path="/Cities/:country_code"
            component={AirportDetail}
            exact
          ></Route>
          <Route component={Error}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
