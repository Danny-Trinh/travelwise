import React, { Component } from "react";
export default class page10 extends Component {
  render() {
    return (
      <div class="container">
        <div>Flight Two</div>
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
	              <td>Dallas</td>
	              <td>E</td>
	              <td>ATL</td>
	              <td>S</td>
	              <td>Round-trip</td>
	              <td>46.53</td>
	              <td>9</td>
	              <td>2020-10-03T18:05:00</td>
	              <td>2020-10-03T21:12:00</td>
	        </tr>
	        <tr>
		          <th scope="row">2</th>
		          <td>ATL</td>
		          <td>S</td>
		          <td>JFK</td>
		          <td>4</td>
		          <td>Round-trip</td>
		          <td>46.53</td>
		          <td>9</td>
		          <td>2020-10-03T21:52:00</td>
		          <td>2020-10-04T00:05:00</td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}
