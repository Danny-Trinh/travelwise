import React from "react";
import { Link } from "react-router-dom";
import { FaBullseye, FaClock } from "react-icons/fa";

const rowData = [
  {
    header: "Time Offset",
    key: "time_offset",
    icon: <FaClock size="5em" className="mx-auto t-yellow-700 d-block" />,
  },
];

type myProps = {
  data: any;
  picture: string;
};

// renders the content of airportDetail
export default function AirportDetailContent(props: myProps) {
  return (
    <React.Fragment>
      <h1 className="my-4 text-center">{props.data.airport_name}</h1>
      <img
        src={props.picture}
        alt={props.data.airport_name}
        width="80%"
        className="d-block mx-auto mb-5"
        style={{
          borderRadius: "25px",
          objectFit: "cover",
          maxHeight: "800px",
        }}
      ></img>

      <h1 className="my-5 text-center"> Statistics </h1>
      <div className="row">
        <div className="col-4">
          <FaBullseye size="5em" className="mx-auto t-red-700 d-block" />
          <div className="text-center card-body">
            <h4>Coordinates</h4>
            <h6>
              ({props.data.latitude ? props.data.latitude : 0},
              {props.data.longitude ? props.data.longitude : 0})
            </h6>
          </div>
        </div>

        {rowData.map((obj: any, index: number) => {
          let data: any = props.data;
          return (
            <div className="col-4" key={index}>
              {obj.icon}
              <div className="text-center card-body">
                <h4>{obj.header}</h4>
                <h6>{data[obj.key] ? data[obj.key] : 0}</h6>
              </div>
            </div>
          );
        })}

        <div className="col-4">
          <Link className="link" to={`/Covid/${props.data.country_code}`}>
            <img
              className="mx-auto d-block"
              height="80px"
              src={`https://www.countryflags.io/${props.data.country_code}/shiny/64.png`}
              alt="flag"
            />
          </Link>
          <div className="text-center card-body">
            <h4>Covid Stats</h4>
            <Link className="link" to={`/Covid/${props.data.country_code}`}>
              <h6>{props.data.country_name}</h6>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
