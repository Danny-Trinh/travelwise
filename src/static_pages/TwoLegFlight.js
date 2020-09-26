import React, { Component } from "react";
export default class TwoLegFlight extends Component {
  render() {
    return (
      <div class="container">
        <h2 className="text-center">
          <a href="/NewYork">New York City</a> to <a href="/London">London</a>
        </h2>
        <h5 className="text-center">
          New York(JFK) -> Amsterdam(AMS) -> London(LCY)
        </h5>
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
              <td>JFK</td>
              <td>4</td>
              <td>AMS</td>
              <td>Unlisted</td>
              <td>Round-trip</td>
              <td>774.43</td>
              <td>9</td>
              <td>2020-10-03T22:00:00</td>
              <td>2020-10-04T11:20:00</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>AMS</td>
              <td>Unlisted</td>
              <td>LCY</td>
              <td>Unlisted</td>
              <td>Round-trip</td>
              <td>774.43</td>
              <td>9</td>
              <td>2020-10-04T17:15:00</td>
              <td>2020-10-04T17:20:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
