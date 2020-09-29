import React, { Component } from "react";
export default class Covid extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>Covid Stats</h1>
          </div>
          <div className="col-3">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for Country"
                  class="form-control mt-2 mr-sm-2"
                ></input>
                <a className="btn btn-primary mt-2">Search</a>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-3">
            <select className="form-control">
              <option value="">Name</option>
              <option value="">Elevation Meters</option>
              <option value="">LBGTQ Score</option>
              <option value="">Medical Score</option>
              <option value="">Overall Safety Score</option>
              <option value="">Physical Harm Score</option>
              <option value="">Political Freedom Score</option>
            </select>
          </div>
        </div>
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
              <td><a href="/CovidOne">China</a></td>
              <td>CN</td>
              <td>17</td>
              <td>90441</td>
              <td>1</td>
              <td>4739</td>
              <td>20</td>
              <td>85343</td>
              <td>September 26, 10:50:55PM</td>
            </tr>
            <tr>
              <td><a href="/CovidTwo">United States of America</a></td>
              <td>US</td>
              <td>55054</td>
              <td>7032712</td>
              <td>952</td>
              <td>203750</td>
              <td>17152</td>
              <td>2727335</td>
              <td>September 26, 10:50:55PM</td>
            </tr>
            <tr>
              <td><a href="/CovidThree">Thailand</a></td>
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
