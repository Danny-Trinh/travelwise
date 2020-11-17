import React, { Component } from "react";
import CovidChart from "../components/CovidChart";
import CitiesChart from "../components/CitiesChart";
import AirportsChart from "../components/AirportsChart";
import PlantsChart from "../components/PlantsChart";

export default class ProviderVisualizations extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1 className="my-4">Provider Visualizations</h1>
        </div>
        <PlantsChart />
      </div>
    );
  }
}
