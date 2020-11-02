import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";

type myProps = { match: any };
export default class AirportDetail extends Component<myProps> {
  state = {
    data: {
      airport_name: "",
      iata_code: null,
      city_name: "",
      country_name: null,
      latitude: null,
      longitude: null,
      time_offset: null,
      country_code: null,
    },
    found: true,
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 11,
    picture: "",
  };

  async componentDidMount() {
    let json = await Axios.get(`https://api.travelwise.live/airports`);
    let curAirport = json.data.filter(
      (airport: any) =>
        airport.iata_code[0].localeCompare(this.props.match.params.iata) === 0
    );
    if (curAirport.length !== 0) {
      let picJson = await Axios.get(
        "https://api.unsplash.com/search/photos?client_id=Dj6xszn3N8x0A8n2a2O07Ns0IjeBGTameTQCpNVZMvI&" +
          `query=${curAirport[0].city_name} city&page=1&per_page=10`
      );
      let picString = picJson.data.results[0].urls.regular;
      this.setState({
        data: curAirport[0],
        center: { lat: curAirport[0].latitude, lng: curAirport[0].longitude },
        picture: picString,
      });
    } else {
      this.setState({ found: false });
    }
  }
  render() {
    if (!this.state.found) {
      return (
        <div className="container m-4">
          <h3>
            Our database does not currently support data for this airport.
          </h3>
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

          <img
            src={this.state.picture}
            alt={this.state.data.airport_name}
          ></img>
          <div className="row mb-3"></div>
<<<<<<< HEAD
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCDLGn-VIAxyzFxcPlHYNy0VzY__2ySRJc",
              }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
            ></GoogleMapReact>
          </div>
=======
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
>>>>>>> 0dd15bde779b02b306c6d598af7fa85222c92e3c
        </div>
      </React.Fragment>
    );
  }
}
