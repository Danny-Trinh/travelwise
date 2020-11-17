import React, { Component } from "react";

import CovidChart from "../visuals/CovidChart";
import CitiesChart from "../visuals/CitiesChart";
import AirportsChart from "../visuals/AirportsChart";

export default class TravelwiseVisualizations extends Component {
  render() {
    return (
      <div className="container pb-5">
        <h1 className="mt-4 mb-5 text-center">Our Visualizations</h1>
        <CovidChart />
        <div className="my-5"></div>
        <AirportsChart />
        <div className="my-5"></div>
        <CitiesChart />
      </div>
    );
  }
}
