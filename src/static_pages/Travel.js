import React, { Component } from "react";
export default class Travel extends Component {
  render() {
    return (
      <div class="container">
        <ul>Travel</ul>
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
