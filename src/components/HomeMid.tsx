import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LofiCity from "../images/LofiCity.jpg";
import planeIcon from "../images/planeIcon.png";

export default function HomeMid() {
  return (
    <React.Fragment>
      <div className="row  bg-teal-300 pt-5 justify-content-md-center mx-0">
        <div className="col-lg-5 ">
          <Link to="/Airports">
            <motion.img
              animate={{
                x: [-155, 255],
                y: [140, 140],
                opacity: [0, 1, 1, 1, 1, 0],
              }}
              transition={{
                duration: 8,
                ease: "linear",
                loop: Infinity,
              }}
              className="position-absolute"
              src={planeIcon}
              alt="smallplane"
              style={{ width: "1.5rem", left: "40%" }}
            ></motion.img>
            <img
              src={LofiCity}
              className="rounded-circle mx-auto d-block mb-5"
              alt="Airplane"
              style={{ width: "30rem" }}
            ></img>
          </Link>
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
    </React.Fragment>
  );
}
