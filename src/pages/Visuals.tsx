import React, { Component } from "react";
import { Link } from "react-router-dom";
import LofiSky from "../images/LofiSky.jpg";
import LofiCity from "../images/LofiCity.jpg";
import Pandemic from "../images/Pandemic.jpg";

export default class Visuals extends Component {
  render() {
    return (
      <div className="container-fluid p-0">
        <div className="row bg-teal-400 pt-5 justify-content-md-center"></div>

        <div className="bg-teal-300 mx-0">
          <svg viewBox="0 0 1500 50" width="100%" display="block">
            <polygon
              fill="#4fd1c5"
              points="0,0 1500,0 0,50"
              width="100%"
              height="100%"
            />
          </svg>
        </div>

        <div className="row  bg-teal-300 pt-5 justify-content-md-center mx-0"></div>

        <div className="bg-teal-200">
          <svg viewBox="0 0 1500 50" width="100%" display="block">
            <polygon
              fill="#81e6d9"
              points="0,0 1500,0 0,50"
              width="100%"
              height="100%"
            />
          </svg>
        </div>

        <div className="row bg-teal-200 pt-5 justify-content-md-center"></div>
      </div>
    );
  }
}
