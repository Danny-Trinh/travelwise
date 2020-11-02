import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

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
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 11
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
        center: {lat: curAirport[0].latitude, lng: curAirport[0].longitude}
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
          <h3>Our database does not currently support data for this airport.</h3>
          <p>An error could have also occured, try refreshing the page.</p>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="container">
        <h1 className="my-4">{this.state.data.airport_name}</h1>
          <div className="card">
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
          <div className="row mb-3"></div>
          <div style={{ height: '100vh', width: '100%' }}>
          <Map 
            center={[this.state.center.lat, this.state.center.lng]} 
            zoom={this.state.zoom} 
            style={{ width: '100%', height: '100%'}}
          >
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[this.state.center.lat, this.state.center.lng]}>
            <Popup>{this.state.data.airport_name}</Popup>
            </Marker>
          </Map>
      </div>
        </div>
      </React.Fragment>
    );
  }
}
