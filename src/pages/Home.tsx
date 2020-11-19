import React, { Component } from "react";
import { Link } from "react-router-dom";
import LofiSky from "../images/LofiSky.jpg";
import LofiCity from "../images/LofiCity.jpg";
import Pandemic from "../images/Pandemic.jpg";
import Plane from "../images/Plane.png";
import { motion } from "framer-motion";

export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid p-0">
        <div className="row bg-teal-400 pt-5 justify-content-md-center">
          <div
            className="col-lg-5 order-last order-lg-first"
            style={{ marginTop: "5rem" }}
          >
            <h1 className="font-weight-bold text-center p-4">
              In an increasingly dangerous world, Travelwise is here to help you
              navigate.
            </h1>
            <h5 className="text-center mt-4 t-black">
              <Link to="/Cities" className="t-teal-800 pageLink">
                Find a City
              </Link>
            </h5>
          </div>

          <div className="col-lg-4">
            <Link to="/Cities">
              <motion.img
                animate={{
                  x: [0, 205],
                  y: [75, 50],
                  scale: [0.5, 1],
                  opacity: [0, 1],
                }}
                transition={{
                  duration: 2,
                  delay: 0.2,
                }}
                className="position-absolute"
                src={Plane}
                alt="Plane"
                style={{ width: "30rem" }}
              ></motion.img>
              <img
                src={LofiSky}
                className="rounded-circle mx-auto d-block mb-5 "
                alt="City"
                style={{ width: "30rem" }}
              ></img>
            </Link>
          </div>
        </div>

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

        <div className="row  bg-teal-300 pt-5 justify-content-md-center mx-0">
          <div className="col-lg-5 ">
            <img
              src={LofiCity}
              className="rounded-circle mx-auto d-block mb-5"
              alt="Airplane"
              style={{ width: "30rem" }}
            ></img>
          </div>
          <div className="col-lg-5" style={{ marginTop: "5rem" }}>
            <h1 className="font-weight-bold text-center p-4">
              Our extensive catalog features airports from all over the globe.
            </h1>
            <h5 className="text-center mt-4 t-black">
              <Link to="/Airports" className="t-teal-800 pageLink">
                Find an Airport
              </Link>
            </h5>
          </div>
        </div>

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

        <div className="row bg-teal-200 pt-5 justify-content-md-center">
          <div
            className="col-lg-5 order-last order-lg-first"
            style={{ marginTop: "5rem" }}
          >
            <h1 className="font-weight-bold text-center p-4">
              Find the latest COVID-19 data for every country.
            </h1>
            <h5 className="text-center mt-4 t-black">
              <Link to="/Covid" className="t-teal-800 pageLink">
                Get Informed
              </Link>
            </h5>
          </div>

          <div className="col-lg-4 ">
            <img
              src={Pandemic}
              className="rounded-circle mx-auto d-block mb-5 "
              alt="Covid"
              style={{ width: "30rem" }}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}
