import React, { Component } from "react";
export default class Flights extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>Flights</h1>
          </div>
          <div className="col">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for Flight"
                  class="form-control mr-sm-2"
                ></input>
                <a className="btn btn-primary">Search</a>
              </div>
            </form>
          </div>
        </div>
        <li>
          {" "}
          <a href="/SingleLegFlight">Single Leg Flight</a>
        </li>
        <li>
          {" "}
          <a href="/TwoLegFlight">Two Leg Flight</a>
        </li>
        <li>
          {" "}
          <a href="/ThreeLegFlight">Three Leg Flight</a>
        </li>
      </div>
    );
  }
}
