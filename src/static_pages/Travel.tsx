import React, { Component } from "react";
import {Link} from "react-router-dom";
export default class Travel extends Component {
  render() {
    return (
      <div className="container">
        <h1>Travel</h1>
        <div className="row">
          <div className="col">
            {" "}
            <h3>
              <Link to="/Flights">Flights</Link>
            </h3>
          </div>
          <div className="col">
            {" "}
            <h3>
              <Link to="/Hotels">Hotels</Link>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
