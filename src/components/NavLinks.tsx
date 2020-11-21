import React from "react";
import {
  FaCity,
  FaEye,
  FaPlane,
  FaLeaf,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import { Link } from "react-router-dom";
export default function NavLinks() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
