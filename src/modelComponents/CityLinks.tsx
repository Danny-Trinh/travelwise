import React from "react";
import { Link } from "react-router-dom";
import { FaCity } from "react-icons/fa";

type myProps = {
  data: any;
  cityData: any;
};

// renders the airport links of either covid instance or city instance
export default function CityLinks(props: myProps) {
  // if there is not cities data, just render a no cities message
  if (props.cityData.length > 0) {
    return (
      <React.Fragment>
        <h1 className="my-5 text-center">Cities</h1>
        <div className="row">
          {props.cityData.map((city: any, index: number) => (
            <div className="col-3" key={index}>
              <Link
                className="link"
                to={`/City/${city.name}/${city.country_code}`}
              >
                <FaCity size="5em" className="mx-auto t-teal-700 d-block" />
              </Link>
              <div className="text-center card-body">
                <h4>{city.country_code}</h4>
                <Link
                  className="link"
                  to={`/City/${city.name}/${city.country_code}`}
                >
                  <h6>{city.name}</h6>
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
        <h1 className="text-center my-5">Cities</h1>
        <p className="text-center">
          Currently our database has no cities for {props.data.country}, try
          another country.
        </p>
      </React.Fragment>
    );
  }
}
