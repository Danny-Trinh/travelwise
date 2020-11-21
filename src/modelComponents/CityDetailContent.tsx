import React from "react";
import { Link } from "react-router-dom";
import {
  FaTransgender,
  FaMoneyCheckAlt,
  FaBriefcaseMedical,
  FaMapMarked,
  FaNewspaper,
  FaFemale,
  FaChartBar,
  FaFistRaised,
} from "react-icons/fa";

const rowData = [
  {
    header: "Region",
    key: "region",
    icon: <FaMapMarked size="5em" className="mx-auto t-yellow-700 d-block" />,
  },
  {
    header: "Overall Danger",
    key: "overall",
    icon: <FaChartBar size="5em" className="mx-auto t-orange-700 d-block" />,
  },
  {
    header: "LGBTQ Danger",
    key: "lgbtq",
    icon: <FaTransgender size="5em" className="mx-auto t-green-700 d-block" />,
  },
  {
    header: "Medical Danger",
    key: "medical",
    icon: (
      <FaBriefcaseMedical size="5em" className="mx-auto t-red-700 d-block" />
    ),
  },
  {
    header: "Physical Danger",
    key: "physical",
    icon: <FaFistRaised size="5em" className="mx-auto t-indigo-700 d-block" />,
  },
  {
    header: "Political Unrest",
    key: "political",
    icon: <FaNewspaper size="5em" className="mx-auto t-teal-700 d-block" />,
  },
  {
    header: "Theft Danger",
    key: "theft",
    icon: <FaMoneyCheckAlt size="5em" className="mx-auto t-blue-700 d-block" />,
  },
  {
    header: "Women Danger",
    key: "women",
    icon: <FaFemale size="5em" className="mx-auto t-pink-700 d-block" />,
  },
];

type myProps = {
  data: any;
  picture: string;
};

// renders the content of cityDetail
export default function AirportDetailContent(props: myProps) {
  return (
    <React.Fragment>
      <h1 className="my-4 text-center">
        {props.data.name}, {props.data.country}
      </h1>
      <img
        src={props.picture}
        alt={props.data.name}
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
              <h6>{props.data.country}</h6>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
