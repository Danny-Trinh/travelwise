import React, { Component } from "react";
export default class Hotels extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>Hotels</h1>
          </div>
          <div className="col-3">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for Hotel"
                  class="form-control mt-2 mr-sm-2"
                ></input>
                <a className="btn btn-primary mt-2">Search</a>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="mt-2">Sort by</div>
          <div className="col-3">
            <select className="form-control">
              <option value="">Name</option>
              <option value="">Rating</option>
              <option value="">Price</option>
              <option value="">Distance</option>
            </select>
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
