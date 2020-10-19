import React, { Component } from "react";
import Axios from "axios";
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
    },
  };

  async componentDidMount() {
    // IMPORTANT: make error catch if nothing is resulted from query or more than 1, make more error catches in general
    let json = await Axios.get(`https://api.travelwise.live/airport`);
    let curAirport = json.data.filter(
      (airport: any) =>
        airport.iata_code[0].localeCompare(this.props.match.params.id) === 0
    );
    this.setState({
      data: curAirport[0],
    });
    console.log(json.data);
    console.log(curAirport);
  }
  render() {
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
              </tr>
            </thead>
            <tbody>
              <td>{this.state.data.airport_name}</td>
              <td>{this.state.data.iata_code}</td>
              <td>{this.state.data.city_name}</td>
              <td>{this.state.data.country_name}</td>
              <td>{this.state.data.latitude}</td>
              <td>{this.state.data.longitude}</td>
              <td>{this.state.data.time_offset}</td>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
