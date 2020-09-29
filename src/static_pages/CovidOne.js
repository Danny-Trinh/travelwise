import React, { Component } from "react";
export default class CovidOne extends Component {
  render() {
    return (
      <div class="container">
        <h2 className="text-center">China</h2>
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
              <td>China</td>
              <td>CN</td>
              <td>17</td>
              <td>90441</td>
              <td>1</td>
              <td>4739</td>
              <td>20</td>
              <td>85343</td>
              <td>September 26, 10:50:55PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
