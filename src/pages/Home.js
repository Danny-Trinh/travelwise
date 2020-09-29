import React, { Component } from "react";
export default class page1 extends Component {
  render() {
    return (
      <div className="container">
        <div className="col">
          <h1 className="font-weight-bold text-center align-middle justify-content-center">
            Welcome!
          </h1>
          <div className="font-weight-bold text-center align-middle justify-content-center">
            Travelwise is a web app that enables consumers to make ideal travel
            plans. Use Travelwise to find more information for your travel
            plans, where users can search for destinations, corresponding
            flights, hotels, and the most up-to-date statistics on COVID-19, all
            in the same place.
          </div>
          <div className="row text-center align-middle justify-content-center"><a href="/Cities" className="btn btn-primary mt-2">Get Started</a></div>
        </div>
      </div>
    );
  }
}