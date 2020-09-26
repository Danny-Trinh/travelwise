import React, { Component } from "react";
export default class Travel extends Component {
  render() {
    return (
      <div class="container">
        <h1>Travel</h1>
        <li>
          {" "}
          <a href="/Flights">Flights</a>
        </li>
        <li>
          {" "}
          <a href="/Hotels">Hotels</a>
        </li>
      </div>
    );
  }
}
