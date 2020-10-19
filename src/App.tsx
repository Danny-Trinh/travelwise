import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Index from "./static_pages/Index";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Covid from "./pages/Covid";
import Airports from "./pages/Airports";
import Hotels from "./pages/Hotels";
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
          <Route path="/Travel" component={Covid} exact></Route>
          <Route path="/Covid" component={Covid} exact></Route>
          <Route path="/Airports" component={Airports} exact></Route>
          <Route path="/Hotels" component={Hotels} exact></Route>
          <Route path="/Dallas" component={Index.Dallas} exact></Route>
          <Route path="/NewYork" component={Index.NewYork} exact></Route>
          <Route path="/London" component={Index.London} exact></Route>
          <Route path="/HotelOne" component={Index.HotelOne} exact></Route>
          <Route path="/HotelTwo" component={Index.HotelTwo} exact></Route>
          <Route path="/HotelThree" component={Index.HotelThree} exact></Route>
          <Route path="/CovidOne" component={Index.CovidOne} exact></Route>
          <Route path="/CovidTwo" component={Index.CovidTwo} exact></Route>
          <Route path="/CovidThree" component={Index.CovidThree} exact></Route>
          <Route path="/About" component={About} exact></Route>
          <Route path="/Test/:id" component={Testing} exact></Route>
          <Route path="/Covid/:id" component={CovidDetail} exact></Route>
          <Route path="/City/:id" component={CityDetail} exact></Route>
          <Route path="/Airport/:id" component={AirportDetail} exact></Route>
          <Route component={Error}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
