import React, { Component } from "react";
export default class page1 extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>Destination Cities</h1>
          </div>
          <div className="col">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for City"
                  class="form-control mr-sm-2"
                ></input>
                <a className="btn btn-primary">Search</a>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col">Sort</div>
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
