import React from "react";
import { Link } from "react-router-dom";
import PurpleVirus from "../images/PurpleVirus.png";
import Pandemic from "../images/Pink.jpg";
import VirusAnimate from "../components/VirusAnimate";

const virusValues = [
  {
    rev: 1,
    width: "3rem",
    left: "35%",
    top: "5rem",
    swell: 0.1,
    jiggle: 10,
  },
  {
    rev: -1,
    width: "2rem",
    left: "30%",
    top: "20rem",
    swell: 0.2,
    jiggle: 15,
  },
  {
    rev: 1,
    width: "3rem",
    left: "47%",
    top: "155rem",
    swell: 0.1,
    jiggle: 10,
  },
  {
    rev: 1,
    width: "8rem",
    left: "50%",
    top: "5rem",
    swell: 0.2,
    jiggle: 20,
  },
  {
    rev: -1,
    width: "6rem",
    left: "27%",
    top: "10rem",
    swell: 0.2,
    jiggle: 20,
  },
  {
    rev: -1,
    width: "7rem",
    left: "55%",
    top: "17rem",
    swell: 0.1,
    jiggle: 15,
  },
];

export default function HomeBottom() {
  return (
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
          {virusValues.map((objVal: any, index: number) => (
            <VirusAnimate
              rev={objVal.rev}
              width={objVal.width}
              left={objVal.left}
              top={objVal.top}
              swell={objVal.swell}
              jiggle={objVal.jiggle}
              img={PurpleVirus}
              key={index}
            />
          ))}
          <img
            src={Pandemic}
            className="rounded-circle mx-auto d-block mb-5 "
            alt="Covid"
            style={{ width: "30rem" }}
          ></img>
        </Link>
      </div>
    </div>
  );
}
