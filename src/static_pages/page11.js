import React, { Component } from "react";
export default class page11 extends Component {
  render() {
    return (
      <div class="container">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">City</th>
              <th scope="col">Country</th>
              <th scope="col">Region</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Dallas</th>
              <td>United States</td>
              <td>Texas</td>
              <td>29.762777777</td>
              <td>-95.383055555</td>
            </tr>
            <tr>
              <th scope="row">London</th>
              <td>United Kingdom</td>
              <td>England</td>
              <td>51.507222222</td>
              <td>-0.1275</td>
            </tr>
            <tr>
              <th scope="row">New York City</th>
              <td>United States</td>
              <td>New York</td>
              <td>40.67</td>
              <td>-73.94</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
