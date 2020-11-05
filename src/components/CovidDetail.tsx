import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
type myProps = { match: any };

export default class CovidDetail extends Component<myProps> {
  state = {
    data: {
      country_code: null,
      new_cases: null,
      total_cases: null,
      new_deaths: null,
      total_deaths: null,
      country: "",
    },
    airportData: [],
    cityData: [],
    found: true,
    picture: "",
    longitude: 0,
    latitude: 0,
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 5,
  };

  async componentDidMount() {
    // get covid data
    let json = await Axios.get(
      `https://api.travelwise.live/covid/search?country_code=${this.props.match.params.country_code}`
    );
    if (json.data.length !== 0) {
      let citiesJson = await Axios.get(`https://api.travelwise.live/cities`);
      let airportJson = await Axios.get(`https://api.travelwise.live/airports`);
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

      // get longitude/latitude
      let location = await Axios.get(
        `https://restcountries.eu/rest/v2/alpha/${this.props.match.params.country_code}`
      );
      let latitude = location.data.latlng[0];
      let longitude = location.data.latlng[1];

      // get picture asset
      let picJson = await Axios.get(
        "https://api.unsplash.com/search/photos?client_id=Dj6xszn3N8x0A8n2a2O07Ns0IjeBGTameTQCpNVZMvI&" +
          `query=${json.data[0].country} city&page=1&per_page=10`
      );
      let picString = picJson.data.results[0].urls.regular;

      this.setState({
        data: json.data[0],
        cityData,
        airportData,
        picture: picString,
        latitude,
        longitude,
      });
    } else {
      this.setState({
        found: false,
      });
    }
  }
  render() {
    let airportRender;
    // if airports dont exist, display no airports message
    if (this.state.airportData.length > 0) {
      airportRender = (
        <React.Fragment>
          <h5>Airports</h5>
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
          <span className="h5 inline">Airports: </span>
          Currently our database has no airports for {this.state.data.country},
          try another country.
        </p>
      );
    }

    // if there is not cities data, just render a no cities message
    let cityRender;
    if (this.state.cityData.length > 0) {
      cityRender = (
        <React.Fragment>
          <h5>Cities</h5>
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
          <span className="h5 inline">Cities: </span>
          Currently our database has no cities for {this.state.data.country},
          try another country.
        </p>
      );
    }

    // if there is no data, display an error message
    if (!this.state.found) {
      return (
        <div className="container m-4">
          <h3>
            Our database does not currently support covid stats for this
            country.
          </h3>
          <p>An error could have also occured, try refreshing the page.</p>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="container">
          <h1 className="my-4">
            {this.state.data.country} ({this.state.data.country_code})
          </h1>
          <p>
            <span className="h5 inline">New Confirmed Cases: </span>
            {this.state.data.new_cases ? this.state.data.new_cases : 0}
          </p>
          <p>
            <span className="h5 inline">Total Confirmed Cases: </span>
            {this.state.data.total_cases ? this.state.data.total_cases : 0}
          </p>
          <p>
            <span className="h5 inline">New Deaths: </span>
            {this.state.data.new_deaths ? this.state.data.new_deaths : 0}
          </p>
          <p>
            <span className="h5 inline">Total Deaths: </span>
            {this.state.data.total_deaths ? this.state.data.total_deaths : 0}
          </p>
          {cityRender}
          {airportRender}
          <div className="card">
            <img src={this.state.picture} alt={this.state.data.country}></img>
          </div>
          <div className="my-5" style={{ height: "20rem", width: "100%" }}>
            <Map
              center={[this.state.latitude, this.state.longitude]}
              zoom={this.state.zoom}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[this.state.latitude, this.state.longitude]}>
                <Popup>{this.state.data.country}</Popup>
              </Marker>
            </Map>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
