import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

type myProps = { match: any };
export default class AirportDetail extends Component<myProps> {
  state = {
    data: {
      airport_name: null,
      iata_code: null,
      city_name: null,
      country_name: null,
      latitude: null,
      longitude: null,
      time_offset: null,
      country_code: null,
    },
    found: true,
  };

  async componentDidMount() {
    let json = await Axios.get(`https://api.travelwise.live/airports`);
    let curAirport = json.data.filter(
      (airport: any) =>
        airport.iata_code[0].localeCompare(this.props.match.params.iata) === 0
    );
    if (curAirport.length !== 0) {
      this.setState({
        data: curAirport[0],
      });
      console.log(json.data);
      console.log(curAirport);
    } else {
      this.setState({ found: false });
    }
  }
  render() {
    if (!this.state.found) {
      return (
        <div className="container m-4">
          <h3>Our database does not currently support data for this airport</h3>
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
                <th scope="col">Airport</th>
                <th scope="col">Airport Code</th>
                <th scope="col">City</th>
                <th scope="col">Country</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                <th scope="col">Timezone</th>
                <th scope="col">Covid Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.data.airport_name}</td>
                <td>{this.state.data.iata_code}</td>
                <td>
                  <Link
                    to={`/City/${this.state.data.city_name}/${this.state.data.country_code}`}
                  >
                    {this.state.data.city_name}
                  </Link>
                </td>
                <td>{this.state.data.country_name}</td>
                <td>{this.state.data.latitude}</td>
                <td>{this.state.data.longitude}</td>
                <td>{this.state.data.time_offset}</td>
                <td>
                  <Link to={`/Covid/${this.state.data.country_code}`}>
                    Link
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
