import React, { Component } from "react";

import CovidChart from "../components/CovidChart";

export default class TravelwiseVisualizations extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1 className="my-4">Our Visualizations</h1>
        </div>
        <h3>Total Covid Cases</h3>
        <CovidChart />
      </div>
    );
  }
}
