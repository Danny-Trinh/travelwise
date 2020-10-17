import React, { Component } from "react";
import {Link} from "react-router-dom";
export default class Flights extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Flights</h1>
          </div>
          <div className="col-3">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for Flight"
                  className="form-control mt-2 mr-sm-2"
                ></input>
                <p className="btn btn-primary mt-2">Search</p>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="mt-2">Sort by</div>
          <div className="col-3">
            <select className="form-control mb-2">
              <option value="">Departure Time</option>
              <option value="">Arrival Time</option>
              <option value="">Price</option>
              <option value="">Number of Bookable Seats</option>
            </select>
          </div>
        </div>
        <div className="card">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Departure Location</th>
                <th scope="col">Departure Terminal</th>
                <th scope="col">Destination</th>
                <th scope="col">Destination Terminal</th>
                <th scope="col">One-way?</th>
                <th scope="col">Price</th>
                <th scope="col">Seats Remaining</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">More Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DFW</td>
                <td>E</td>
                <td>JFK</td>
                <td>4</td>
                <td>Round-trip</td>
                <td>46.53</td>
                <td>9</td>
                <td>2020-10-03T18:05:00</td>
                <td>2020-10-04T00:05:00</td>
                <td>
                  <Link to="/SingleLegFlight">Flight Information</Link>
                </td>
              </tr>
              <tr>
                <td>JFK</td>
                <td>4</td>
                <td>LCY</td>
                <td>Unlisted</td>
                <td>Round-trip</td>
                <td>774.43</td>
                <td>9</td>
                <td>2020-10-03T22:00:00</td>
                <td>2020-10-04T17:20:00</td>
                <td>
                  <Link to="/TwoLegFlight">Flight Information</Link>
                </td>
              </tr>
              <tr>
                <td>LCY</td>
                <td>Unlisted</td>
                <td>DFW</td>
                <td>E</td>
                <td>Round-trip</td>
                <td>1739.92</td>
                <td>9</td>
                <td>2020-10-03T21:03:00</td>
                <td>2020-10-03T22:20:00</td>
                <td>
                  <Link to="/ThreeLegFlight">Flight Information</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
