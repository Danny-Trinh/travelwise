import React, { Component } from "react";
export default class CovidThree extends Component {
  render() {
    return (
      <div class="container">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Country</th>
              <th scope="col">Country Code</th>
              <th scope="col">New Confirmed Cases</th>
              <th scope="col">Total Confirmed Cases</th>
              <th scope="col">New Deaths</th>
              <th scope="col">Total Deaths</th>
              <th scope="col">New Recovered</th>
              <th scope="col">Total Recovered</th>
              <th scope="col">As of</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Thailand</td>
              <td>TH</td>
              <td>3</td>
              <td>3522</td>
              <td>0</td>
              <td>59</td>
              <td>2</td>
              <td>3362</td>
              <td>September 26, 10:50:55PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
