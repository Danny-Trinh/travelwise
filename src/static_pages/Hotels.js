import React, { Component } from "react";
export default class Hotels extends Component {
  render() {
    return (
      <div class="container">
        <ul>Hotels</ul>
        <li>
          {" "}
          <a href="/HotelOne">Hotel One</a>
        </li>
        <li>
          {" "}
          <a href="/HotelTwo">Hotel Two</a>
        </li>
        <li>
          {" "}
          <a href="/HotelThree">Hotel Three</a>
        </li>
      </div>
    );
  }
}
