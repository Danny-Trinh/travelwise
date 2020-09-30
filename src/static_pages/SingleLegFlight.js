import React, { Component } from "react";
export default class SingleLegFlight extends Component {
  render() {
    return (
      <div class="container">
        <h2 className="text-center">
          <a href="/Dallas">Dallas</a> to <a href="/NewYork">New York City</a>
        </h2>
        <h5 className="text-center">Dallas(DFW) -> New York(JFK)</h5>
        <div className="card">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
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
              <th scope="row">DFW</th>
              <td>E</td>
              <td>JFK</td>
              <td>4</td>
              <td>Round-trip</td>
              <td>46.53</td>
              <td>9</td>
              <td>2020-10-03T18:05:00</td>
              <td>2020-10-04T00:05:00</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
