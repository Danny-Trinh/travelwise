import React, { Component } from "react";
export default class Covid extends Component {
  render() {
    return (
      <div class="container">
        <ul>COVID-19 Statistics</ul>
        <li>
          {" "}
          <a href="/CovidOne">Covid One</a>
        </li>
        <li>
          {" "}
          <a href="/CovidTwo">Covid Two</a>
        </li>
        <li>
          {" "}
          <a href="/CovidThree">Covid Three</a>
        </li>
      </div>
    );
  }
}
