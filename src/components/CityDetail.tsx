import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import GoogleMapReact from 'google-map-react';
type myProps = { match: any };
export default class CityDetail extends Component<myProps> {
  state = {
    data: {
      country: null,
      country_code: null,
      latitude: null,
      lgbtq: null,
      longitude: null,
      medical: null,
      name: null,
      overall: null,
      physical: null,
      political: null,
      region: null,
      theft: null,
      women: null,
    },
    airportData: [],
    found: true,
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 11
  };
  async componentDidMount() {
    // let json = await Axios.get(
    //   `https://api.travelwise.live/cities/search?name=${this.props.match.params.city}`
    // );
    // let jsonData = json.data.filter(
    //   (city: any) =>
    //     city.country_code[0].localeCompare(
    //       this.props.match.params.country_code
    //     ) === 0
    // );
    // this.setState({
    //   data: jsonData[0],
    // });
    let json = await Axios.get(`https://api.travelwise.live/cities`);
    let curCity = json.data.filter((city: any) => {
      return (
        city.country_code[0].localeCompare(
          this.props.match.params.country_code
        ) === 0 &&
        city.name[0]
          .toLowerCase()
          .localeCompare(this.props.match.params.city.toLowerCase()) === 0
      );
    });
    if (curCity.length !== 0) {
      let airportJson = await Axios.get(
        `https://api.travelwise.live/airport/search?city_name=${curCity[0].name}`
      );
      this.setState({
        data: curCity[0],
        airportData: airportJson.data,
        center: {lat: curCity[0].latitude, lng: curCity[0].longitude},
      });
      console.log(json.data);
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
              <li key={airport.iata_code}>
                <Link to={`/Airport/${airport.iata_code}`}>
                  {airport.airport_name}
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      airportRender = (
        <p>Currently our database has no airports for {this.state.data.name}.</p>
      );
    }

    if (!this.state.found) {
      return (
        <div className="container m-4">
          <h3>
            Our database does not currently support safety stats for this city.
          </h3>
          <p>An error could have also occured, try refreshing the page.</p>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="container">
        <h1 className="my-4">{this.state.data.name}</h1>
        <div className="card">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">City</th>
                <th scope="col">Country</th>
                <th scope="col">Region</th>
                <th scope="col">Overall</th>
                <th scope="col">LGBTQ</th>
                <th scope="col">Medical</th>
                <th scope="col">Physical Harm</th>
                <th scope="col">Political Freedom</th>
                <th scope="col">Theft</th>
                <th scope="col">Women</th>
                <th scope="col">Covid Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.data.name}</td>
                <td>{this.state.data.country}</td>
                <td>{this.state.data.region}</td>
                <td>{this.state.data.overall ? this.state.data.overall : 0}</td>
                <td>{this.state.data.lgbtq ? this.state.data.lgbtq : 0}</td>
                <td>{this.state.data.medical ? this.state.data.medical : 0}</td>
                <td>
                  {this.state.data.physical ? this.state.data.physical : 0}
                </td>
                <td>
                  {this.state.data.political ? this.state.data.political : 0}
                </td>
                <td>{this.state.data.theft ? this.state.data.theft : 0}</td>
                <td>{this.state.data.women ? this.state.data.women : 0}</td>
                <td>
                  <Link to={`/Covid/${this.state.data.country_code}`}>
                    Link
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className="row mb-3"></div>
          {airportRender}
          <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCDLGn-VIAxyzFxcPlHYNy0VzY__2ySRJc' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
        </GoogleMapReact>
      </div>
        </div>
      </React.Fragment>
    );
  }
}
