import React, { Component } from "react";
export default class Flights extends Component {
  render() {
    return (
      <div class="container">
        <ul>Flights</ul>
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
