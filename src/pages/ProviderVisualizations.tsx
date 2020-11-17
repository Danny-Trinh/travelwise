import React, { Component } from "react";
import PlantsChart from "../visuals/PlantsChart";
import AnimalsChart from "../visuals/AnimalsChart";
import LocationsChart from "../visuals/LocationsChart";

export default class ProviderVisualizations extends Component {
  render() {
    return (
      <div className="container pb-5">
        <h1 className="mt-4 mb-5 text-center">Provider Visualizations</h1>
        <LocationsChart />
        <div className="mb-5"></div>
        <PlantsChart />
        <div className="mb-5"></div>
        <AnimalsChart />
      </div>
    );
  }
}
