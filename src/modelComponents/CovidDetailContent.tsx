import React from "react";
import {
  FaCapsules,
  FaHospital,
  FaSkull,
  FaSkullCrossbones,
} from "react-icons/fa";

const rowData = [
  {
    header: "New Confirmed Cases",
    key: "new_cases",
    icon: <FaCapsules size="5em" className="mx-auto t-blue-700 d-block" />,
  },
  {
    header: "Total Confirmed Cases",
    key: "total_cases",
    icon: <FaHospital size="5em" className="mx-auto t-red-700 d-block" />,
  },
  {
    header: "New Deaths",
    key: "new_deaths",
    icon: <FaSkull size="5em" className="mx-auto t-gray-700 d-block" />,
  },
  {
    header: "Total Deaths",
    key: "total_deaths",
    icon: (
      <FaSkullCrossbones size="5em" className="mx-auto t-black-700 d-block" />
    ),
  },
];

type myProps = {
  data: any;
  picture: string;
};

// renders the content of CovidDetail
export default function CovidDetailContent(props: myProps) {
  return (
    <React.Fragment>
      <h1 className="my-4 text-center">
        {props.data.country} ({props.data.country_code})
      </h1>
      <img
        src={props.picture}
        alt={props.data.country}
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
            <div className="col-6" key={index}>
              {obj.icon}
              <div className="text-center card-body">
                <h4>{obj.header}</h4>
                <h6>{data[obj.key] ? data[obj.key] : 0}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
