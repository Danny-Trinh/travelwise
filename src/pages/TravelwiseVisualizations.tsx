import React, { Component } from "react";

import CovidChart from "../components/CovidChart";
import CitiesChart from "../components/CitiesChart";
import AirportsChart from "../components/AirportsChart";

export default class TravelwiseVisualizations extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1 className="my-4">Our Visualizations</h1>
        </div>
        <CovidChart />
        <div className="my-4"></div>
        <CitiesChart />
        <div className="my-4"></div>
        <AirportsChart />
      </div>
    );
  }
}
