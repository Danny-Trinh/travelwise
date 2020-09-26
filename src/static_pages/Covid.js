import React, { Component } from "react";
export default class Covid extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>COVID-19 Statistics</h1>
          </div>
          <div className="col">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for Statistic"
                  class="form-control mr-sm-2"
                ></input>
                <a className="btn btn-primary">Search</a>
              </div>
            </form>
          </div>
        </div>
        <li>
          {" "}
          <a href="/CovidOne">Covid One</a>
        </li>
        <li>
          {" "}
          <a href="/CovidTwo">Covid Two</a>
        </li>
        <li>
          {" "}
          <a href="/CovidThree">Covid Three</a>
        </li>
      </div>
    );
  }
}
