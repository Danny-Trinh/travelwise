import React, { Component } from "react";
export default class Hotels extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>Hotels</h1>
          </div>
          <div className="col">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for Hotel"
                  class="form-control mr-sm-2"
                ></input>
                <a className="btn btn-primary">Search</a>
              </div>
            </form>
          </div>
        </div>
        <li>
          {" "}
          <a href="/HotelOne">Hotel One</a>
        </li>
        <li>
          {" "}
          <a href="/HotelTwo">Hotel Two</a>
        </li>
        <li>
          {" "}
          <a href="/HotelThree">Hotel Three</a>
        </li>
      </div>
    );
  }
}
