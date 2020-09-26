import React, { Component } from "react";
export default class page1 extends Component {
  render() {
    return (
      <div class="container">
        <ul>Destination Cities</ul>
        <li>
          {" "}
          <a href="/Dallas">Dallas</a>
        </li>
        <li>
          {" "}
          <a href="/New_York">New York</a>
        </li>
        <li>
          {" "}
          <a href="/London">London</a>
        </li>
      </div>
    );
  }
}
