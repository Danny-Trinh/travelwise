import React, { Component } from "react";
import BarChart from './Chart1';

export default class TravelwiseVisualizations extends Component {
    render() {
      return (
        <div className="container">
            <div className="text-center">
                <h1 className="container-fluid bg-gray-200 pt-4 m-0 pb-5">Travelwise Visualizations </h1>
            </div>
            <div>Covid Cases:</div>
            <div><BarChart /></div>
        </div>
      );
    }
  }