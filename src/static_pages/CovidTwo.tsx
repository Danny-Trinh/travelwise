import React, { Component } from "react";
export default class CovidTwo extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center">United States of America</h2>
        <div className="card">
          <table className="table table-hover">
            <thead className="thead-dark">
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
                <td>United States of America</td>
                <td>US</td>
                <td>55054</td>
                <td>7032712</td>
                <td>952</td>
                <td>203750</td>
                <td>17152</td>
                <td>2727335</td>
                <td>September 26, 10:50:55PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}