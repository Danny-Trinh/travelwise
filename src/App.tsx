import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Covid from "./pages/Covid";
import Airports from "./pages/Airports";
import CovidDetail from "./pages/CovidDetail";
import CityDetail from "./pages/CityDetail";
import AirportDetail from "./pages/AirportDetail";
import Search from "./pages/Search";
import ProviderVisualizations from "./pages/ProviderVisualizations";
import TravelwiseVisualizations from "./pages/TravelwiseVisualizations";

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
          <Route
            path="/TravelwiseVisualizations"
            component={TravelwiseVisualizations}
            exact
          ></Route>
          <Route
            path="/ProviderVisualizations"
            component={ProviderVisualizations}
            exact
          ></Route>
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
          <Route path="/Search/:searchQuery?" component={Search}></Route>
          <Route>
            <React.Fragment>
              <h1 className="display-1 text-center font-weight-bold">
                404 Error
              </h1>
              <p className="display-1 text-center">Page Not Found </p>
            </React.Fragment>
            );
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
