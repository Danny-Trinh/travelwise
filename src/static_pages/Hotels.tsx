import React, { Component } from "react";
import {Link} from "react-router-dom";
export default class Hotels extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Hotels</h1>
          </div>
          <div className="col-3">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for Hotel"
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
          <Link to="/HotelOne">Hotel One</Link>
        </li>
        <li>
          {" "}
          <Link to="/HotelTwo">Hotel Two</Link>
        </li>
        <li>
          {" "}
          <Link to="/HotelThree">Hotel Three</Link>
        </li>
      </div>
    );
  }
}
