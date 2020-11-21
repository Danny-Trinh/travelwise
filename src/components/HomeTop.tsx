import React from "react";
import { Link } from "react-router-dom";
import LofiSky from "../images/LofiSky.jpg";
import Plane from "../images/Plane.png";
import { motion } from "framer-motion";

export default function HomeTop() {
  return (
    <React.Fragment>
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
                delay: 0.3,
              }}
              className="position-absolute "
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
    </React.Fragment>
  );
}
