import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-teal-700 ">
          <div className=" navbar-brand">
            <Link
              className="font-weight-bold nav-link t-gray-200 active"
              to="/"
            >
              TRAVELWISE
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ">
              <li className="nav-item active">
                <Link className="nav-link navlink-custom" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link navlink-custom" to="/Cities">
                  Cities
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link navlink-custom" to="/Airports">
                  Airports
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link navlink-custom" to="/Covid">
                  Covid-19
                </Link>
              </li>
              <li className="nav-item active ">
                <Link className="nav-link navlink-custom" to="/About">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <form>
            <input
              type="text"
              placeholder="Search:"
              className="form-control"
              name="searchVal"
            />
          </form>
        </nav>
      </React.Fragment>
    );
  }
}
