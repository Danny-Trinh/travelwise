import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PlaneLogo from "../images/PlaneLogo.png";
import {
  FaCity,
  FaEye,
  FaPlane,
  FaLeaf,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

export default class Navbar extends Component {
  state = {
    searchQuery: "",
    searchActive: false,
  };

  // handles any changes in the navbar search
  handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    this.setState((prevstate) => {
      const newState: any = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  }

  // redirects to the search page with the search query
  renderRedirect() {
    return <Redirect to={`/Search/${this.state.searchQuery}`}></Redirect>;
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-teal-700 ">
          <Link to="/">
            <img
              className="ml-3"
              style={{ width: "3rem" }}
              src={PlaneLogo}
              alt="logo"
            ></img>
          </Link>

          <div className=" navbar-brand">
            <Link
              className="font-weight-bold nav-link t-gray-200 active muteHover"
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
                <Link className="nav-link navlink-custom" to="/Cities">
                  <FaCity className="mr-1" />
                  Cities
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link navlink-custom" to="/Airports">
                  <FaPlane className="mr-1" />
                  Airports
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link navlink-custom" to="/Covid">
                  <FaGlobe className="mr-1" />
                  Covid-19
                </Link>
              </li>
              <li className="nav-item active ">
                <Link
                  className="nav-link navlink-custom"
                  to="/TravelwiseVisualizations"
                >
                  <FaEye className="mr-1" />
                  Visuals
                </Link>
              </li>
              <li className="nav-item active ">
                <Link
                  className="nav-link navlink-custom"
                  to="/ProviderVisualizations"
                >
                  <FaLeaf className="mr-1" />
                  ProviderVisuals
                </Link>
              </li>
              <li className="nav-item active ">
                <Link className="nav-link navlink-custom" to="/About">
                  <FaUsers className="mr-1" />
                  About
                </Link>
              </li>
            </ul>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href =
                "/search/" + String(this.state.searchQuery);
            }}
          >
            <input
              type="text"
              placeholder="Search:"
              value={this.state.searchQuery}
              onChange={(e) => this.handleChange(e)}
              className="form-control"
              name="searchQuery"
            />
          </form>
        </nav>
      </React.Fragment>
    );
  }
}
