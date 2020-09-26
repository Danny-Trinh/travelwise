import React, { Component } from "react";
export default class ThreeLegFlight extends Component {
  render() {
    return (
      <div class="container">
        <div>Flight Three</div>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Leg</th>
              <th scope="col">Departing From</th>
              <th scope="col">Departure Terminal</th>
              <th scope="col">Destination</th>
              <th scope="col">Destination Terminal</th>
              <th scope="col">One-way?</th>
              <th scope="col">Price</th>
              <th scope="col">Seats Remaining</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>LCY</td>
              <td>Unlisted</td>
              <td>AMS</td>
              <td>Unlisted</td>
              <td>Round-trip</td>
              <td>1739.92</td>
              <td>9</td>
              <td>2020-10-03T08:40:00</td>
              <td>2020-10-03T11:00:00</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>AMS</td>
              <td>Unlisted</td>
              <td>ATL</td>
              <td>I</td>
              <td>Round-trip</td>
              <td>1739.92</td>
              <td>9</td>
              <td>2020-10-03T14:30:00</td>
              <td>2020-10-03T18:09:00</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>ATL</td>
              <td>S</td>
              <td>DFW</td>
              <td>E</td>
              <td>Round-trip</td>
              <td>1739.92</td>
              <td>9</td>
              <td>2020-10-03T21:03:00</td>
              <td>2020-10-03T22:20:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
