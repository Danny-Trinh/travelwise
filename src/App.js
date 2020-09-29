import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Index from "./static_pages/Index";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/Cities" component={Index.Cities} exact></Route>
          <Route path="/Travel" component={Index.Travel} exact></Route>
          <Route path="/Covid" component={Index.Covid} exact></Route>
          <Route path="/Flights" component={Index.Flights} exact></Route>
          <Route path="/Hotels" component={Index.Hotels} exact></Route>
          <Route path="/Dallas" component={Index.Dallas} exact></Route>
          <Route path="/NewYork" component={Index.NewYork} exact></Route>
          <Route path="/London" component={Index.London} exact></Route>
          <Route
            path="/SingleLegFlight"
            component={Index.SingleLegFlight}
            exact
          ></Route>
          <Route
            path="/TwoLegFlight"
            component={Index.TwoLegFlight}
            exact
          ></Route>
          <Route
            path="/ThreeLegFlight"
            component={Index.ThreeLegFlight}
            exact
          ></Route>
          <Route path="/HotelOne" component={Index.HotelOne} exact></Route>
          <Route path="/HotelTwo" component={Index.HotelTwo} exact></Route>
          <Route path="/HotelThree" component={Index.HotelThree} exact></Route>
          <Route path="/CovidOne" component={Index.CovidOne} exact></Route>
          <Route path="/CovidTwo" component={Index.CovidTwo} exact></Route>
          <Route path="/CovidThree" component={Index.CovidThree} exact></Route>
          <Route path="/About" component={About} exact></Route>

          <Route component={Error}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
