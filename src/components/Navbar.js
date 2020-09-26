import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-brand" href="#">
            Travelwise
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
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                >
                  Static Pages
                </a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/page1">
                    Link 1
                  </Link>
                  <Link className="dropdown-item" to="/page2">
                    Link 2
                  </Link>
                  <Link className="dropdown-item" to="/page3">
                    Link 3
                  </Link>
                  <Link className="dropdown-item" to="/page4">
                    Link 4
                  </Link>
                  <Link className="dropdown-item" to="/page5">
                    Link 5
                  </Link>
                  <Link className="dropdown-item" to="/page6">
                    Link 6
                  </Link>
                  <Link className="dropdown-item" to="/page7">
                    Link 7
                  </Link>
                  <Link className="dropdown-item" to="/page8">
                    Link 8
                  </Link>
                  <Link className="dropdown-item" to="/page9">
                    Link 9
                  </Link>
                  <Link className="dropdown-item" to="/page10">
                    Link 10
                  </Link>
                  <Link className="dropdown-item" to="/page11">
                    Link 11
                  </Link>
                </div>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
