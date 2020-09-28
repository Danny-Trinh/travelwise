import React, { Component } from "react";
export default class Flights extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>Flights</h1>
          </div>
          <div className="col-3">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for Flight"
                  class="form-control mt-2 mr-sm-2"
                ></input>
                <a className="btn btn-primary mt-2">Search</a>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-3">
            <select className="form-control">
              <option value="">Departure Time</option>
              <option value="">Arrival Time</option>
              <option value="">Price</option>
              <option value="">Number of Bookable Seats</option>
            </select>
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
