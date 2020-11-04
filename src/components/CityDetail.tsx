import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

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
      name: "",
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
      lng: 0,
    },
    zoom: 11,
    picture: "",
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

    let picJson = await Axios.get(
      "https://api.unsplash.com/search/photos?client_id=Dj6xszn3N8x0A8n2a2O07Ns0IjeBGTameTQCpNVZMvI&" +
        `query=${curCity[0].name} city&page=1&per_page=10`
    );
    let picString = picJson.data.results[0].urls.regular;
    this.setState({
      picture: picString,
    });

    if (curCity.length !== 0) {
      let airportJson = await Axios.get(
        `https://api.travelwise.live/airports/search?city_name=${curCity[0].name}`
      );
      this.setState({
        data: curCity[0],
        airportData: airportJson.data,
        center: { lat: curCity[0].latitude, lng: curCity[0].longitude },
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
        <p>
          Currently our database has no airports for {this.state.data.name}.
        </p>
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
                  <td>
                    {this.state.data.overall ? this.state.data.overall : 0}
                  </td>
                  <td>{this.state.data.lgbtq ? this.state.data.lgbtq : 0}</td>
                  <td>
                    {this.state.data.medical ? this.state.data.medical : 0}
                  </td>
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
          <div className="card">
            <img src={this.state.picture} alt={this.state.data.name}></img>
          </div>
          <div className="row mb-3"></div>
          {airportRender}
          <div style={{ height: "100vh", width: "100%" }}>
            <Map
              center={[this.state.center.lat, this.state.center.lng]}
              zoom={this.state.zoom}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[this.state.center.lat, this.state.center.lng]}>
                <Popup>{this.state.data.name}</Popup>
              </Marker>
            </Map>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
