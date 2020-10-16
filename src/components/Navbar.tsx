import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-brand">
            <Link className="nav-link navbar-brand" to="/">
              Travelwise
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
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                >
                  Static Pages
                </span>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/Cities">
                    Cities
                  </Link>
                  <Link className="dropdown-item" to="/Flights">
                    Flights
                  </Link>
                  <Link className="dropdown-item" to="/Covid">
                    COVID-19
                  </Link>
                  <Link className="dropdown-item" to="/Dallas">
                    City: Dallas
                  </Link>
                  <Link className="dropdown-item" to="/NewYork">
                    City: New York
                  </Link>
                  <Link className="dropdown-item" to="/London">
                    City: London
                  </Link>
                  <Link className="dropdown-item" to="/SingleLegFlight">
                    Single Leg Flight
                  </Link>
                  <Link className="dropdown-item" to="/TwoLegFlight">
                    Two Leg Flight
                  </Link>
                  <Link className="dropdown-item" to="/ThreeLegFlight">
                    Three Leg Flight
                  </Link>
                  <Link className="dropdown-item" to="/CovidOne">
                    Covid One
                  </Link>
                  <Link className="dropdown-item" to="/CovidTwo">
                    Covid Two
                  </Link>
                  <Link className="dropdown-item" to="/CovidThree">
                    Covid Three
                  </Link>
                </div>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/Cities">
                  Cities
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/Flights">
                  Flights
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/Covid">
                  COVID-19
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/test/1">
                  Experimental
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
