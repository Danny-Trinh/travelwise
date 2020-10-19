import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
type myProps = { match: any };
export default class CovidDetail extends Component<myProps> {
  state = {
    data: {
      country_code: null,
      new_cases: null,
      total_cases: null,
      new_deaths: null,
      total_deaths: null,
      country: null,
    },
    airportData: [],
    cityData: [],
    found: true,
  };

  async componentDidMount() {
    let json = await Axios.get(
      `https://api.travelwise.live/covid/search?country_code=${this.props.match.params.country_code}`
    );
    if (json.data.length !== 0) {
      let citiesJson = await Axios.get(`https://api.travelwise.live/cities`);
      let airportJson = await Axios.get(`https://api.travelwise.live/airport`);
      let cityData = citiesJson.data.filter(
        (city: any) =>
          city.country_code[0].localeCompare(json.data[0].country_code[0]) === 0
      );
      let airportData = airportJson.data.filter(
        (airport: any) =>
          airport.country_code[0].localeCompare(
            json.data[0].country_code[0]
          ) === 0
      );
      this.setState({
        data: json.data[0],
        cityData,
        airportData,
      });
    } else {
      this.setState({
        found: false,
      });
    }
  }
  render() {
    let airportRender;
    if (this.state.airportData.length > 0) {
      airportRender = (
        <React.Fragment>
          <h3>Airports</h3>
          <ul>
            {this.state.airportData.map((airport: any) => (
              <li>
                <Link to={`/Airport/${airport.iata_code}`}>
                  {airport.airport_name} ({airport.city_name})
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      airportRender = (
        <p>
          Currently our database has no airports for {this.state.data.country}
        </p>
      );
    }

    let cityRender;
    if (this.state.cityData.length > 0) {
      cityRender = (
        <React.Fragment>
          <h3>Cities</h3>
          <ul>
            {this.state.cityData.map((city: any) => (
              <li>
                <Link to={`/City/${city.name}/${city.country_code}`}>
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      cityRender = (
        <p>
          Currently our database has no cities for {this.state.data.country}
        </p>
      );
    }

    if (!this.state.found) {
      return (
        <div className="container m-4">
          <h3>
            Our database does not currently support covid stats for this country
          </h3>
          <p>An error could have also occured, try refreshing the page</p>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="container m-4">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Country Code</th>
                <th scope="col">New Confirmed Cases</th>
                <th scope="col">Total Confirmed Cases</th>
                <th scope="col">New Deaths</th>
                <th scope="col">Total Deaths</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.data.country}</td>
                <td>{this.state.data.country_code}</td>
                <td>{this.state.data.new_cases}</td>
                <td>{this.state.data.total_cases}</td>
                <td>{this.state.data.new_deaths}</td>
                <td>{this.state.data.total_deaths}</td>
              </tr>
            </tbody>
          </table>
          {cityRender}
          {airportRender}
        </div>
      </React.Fragment>
    );
  }
}
