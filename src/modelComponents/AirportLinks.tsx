import React from "react";
import { Link } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";

type myProps = {
  data: any;
  airportData: any;
  typeName: string;
};

// renders the airport links of either covid instance or city instance
export default function AirportLinks(props: myProps) {
  if (props.airportData.length > 0) {
    return (
      <React.Fragment>
        <h1 className="my-5 text-center">Airports</h1>
        <div className="row">
          {props.airportData.map((airport: any, index: number) => (
            <div className="col-3" key={index}>
              <Link className="link" to={`/Airport/${airport.iata_code}`}>
                <FaPlaneDeparture
                  size="5em"
                  className="mx-auto t-teal-700 d-block"
                />
              </Link>
              <div className="text-center card-body">
                <h4>{airport.iata_code}</h4>
                <Link className="link" to={`/Airport/${airport.iata_code}`}>
                  <h6>{airport.airport_name}</h6>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h1 className="text-center my-5">Airports</h1>
        <p className="text-center">
          Currently our database has no airports for{" "}
          {props.data[props.typeName]}, check another page.
        </p>
      </React.Fragment>
    );
  }
}
