import React, { Component } from "react";
export default class page1 extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>Destination Cities</h1>
          </div>
          <div className="col-3">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for City"
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
        <li>
          {" "}
          <a href="/Dallas">Dallas</a>
        </li>
        <li>
          {" "}
          <a href="/NewYork">New York</a>
        </li>
        <li>
          {" "}
          <a href="/London">London</a>
        </li>
      </div>
    );
  }
}
