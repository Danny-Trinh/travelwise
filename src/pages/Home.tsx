import React, { Component } from "react";
import { Link } from "react-router-dom";
import LofiSky from "../images/LofiSky.jpg";
import LofiCity from "../images/LofiCity.jpg";
import PurpleVirus from "../images/PurpleVirus.png";
import Pandemic from "../images/Pink.jpg";
import Plane from "../images/Plane.png";
import planeIcon from "../images/planeIcon.png";
import { motion } from "framer-motion";
import VirusAnimate from "../components/VirusAnimate";

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
            <Link to="/Covid">
              <VirusAnimate
                rev={1}
                width="3rem"
                left="35%"
                top="5rem"
                swell={0.1}
                jiggle={10}
                img={PurpleVirus}
              />
              <VirusAnimate
                rev={-1}
                width="2rem"
                left="30%"
                top="20rem"
                swell={0.2}
                jiggle={15}
                img={PurpleVirus}
              />
              <VirusAnimate
                rev={1}
                width="3rem"
                left="47%"
                top="15rem"
                swell={0.1}
                jiggle={10}
                img={PurpleVirus}
              />
              <VirusAnimate
                rev={1}
                width="8rem"
                left="50%"
                top="5rem"
                swell={0.2}
                jiggle={20}
                img={PurpleVirus}
              />
              <VirusAnimate
                rev={-1}
                width="6rem"
                left="27%"
                top="10rem"
                swell={0.2}
                jiggle={20}
                img={PurpleVirus}
              />
              <VirusAnimate
                rev={-1}
                width="7rem"
                left="55%"
                top="17rem"
                swell={0.1}
                jiggle={15}
                img={PurpleVirus}
              />
              <img
                src={Pandemic}
                className="rounded-circle mx-auto d-block mb-5 "
                alt="Covid"
                style={{ width: "30rem" }}
              ></img>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
