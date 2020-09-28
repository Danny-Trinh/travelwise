import React, { Component } from "react";
export default class Covid extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>COVID-19 Statistics</h1>
          </div>
          <div className="col-3">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for Statistic"
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
              <option value="">Country</option>
              <option value="">New Cases</option>
              <option value="">Total Cases</option>
              <option value="">New Deaths</option>
              <option value="">Total Deaths</option>
            </select>
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
