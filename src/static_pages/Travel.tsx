import React, { Component } from "react";
export default class Travel extends Component {
  render() {
    return (
      <div className="container">
        <h1>Travel</h1>
        <div className="row">
          <div className="col">
            {" "}
            <h3>
              <a href="/Flights">Flights</a>
            </h3>
          </div>
          <div className="col">
            {" "}
            <h3>
              <a href="/Hotels">Hotels</a>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
