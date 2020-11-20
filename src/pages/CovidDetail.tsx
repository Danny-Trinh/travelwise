import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";

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
    picture: "",
    longitude: 0,
    latitude: 0,
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 5,
    error: false,
    loading: true,
  };

  async componentDidMount() {
    // get covid data
    try {
      let json = await Axios.get(
        `https://api.travelwise.live/covid/search?country_code=${this.props.match.params.country_code}`
      );
      let citiesJson = await Axios.get(`https://api.travelwise.live/cities`);
      let airportJson = await Axios.get(
        `https://api.travelwise.live/airports/search?country_code=${this.props.match.params.country_code}`
      );

      let cityData = citiesJson.data.filter(
        (city: any) =>
          city.country_code[0].localeCompare(json.data[0].country_code[0]) === 0
      );
      let airportData = airportJson.data;

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
        loading: false,
      });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  // if airports dont exist, display no airports message
  renderAirports() {
    if (this.state.airportData.length > 0) {
      return (
        <React.Fragment>
          <h5>Airports</h5>
          <ul>
            {this.state.airportData.map((airport: any) => (
              <li>
                <Link className="link" to={`/Airport/${airport.iata_code}`}>
                  {airport.airport_name} ({airport.city_name})
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      return (
        <p>
          <span className="h5 inline">Airports: </span>
          Currently our database has no airports for {this.state.data.country},
          try another country.
        </p>
      );
    }
  }

  // if there is not cities data, just render a no cities message
  renderCities() {
    if (this.state.cityData.length > 0) {
      return (
        <React.Fragment>
          <h5>Cities</h5>
          <ul>
            {this.state.cityData.map((city: any) => (
              <li>
                <Link
                  className="link"
                  to={`/City/${city.name}/${city.country_code}`}
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      return (
        <p>
          <span className="h5 inline">Cities: </span>
          Currently our database has no cities for {this.state.data.country},
          try another country.
        </p>
      );
    }
  }

  render() {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <div className="container pb-5">
          <h1 className="my-4 text-center">
            {this.state.data.country} ({this.state.data.country_code})
          </h1>
          <img
            src={this.state.picture}
            alt={this.state.data.country}
            width="80%"
            className="d-block mx-auto mb-5"
            style={{
              borderRadius: "25px",
              objectFit: "cover",
              maxHeight: "800px",
            }}
          ></img>
          <h1 className="my-5 text-center"> Statistics </h1>
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
          {this.renderCities()}
          {this.renderAirports()}
          <h1 className="my-5 text-center"> Map </h1>
          <div style={{ height: "20rem", width: "100%" }}>
            <Map
              center={[this.state.latitude, this.state.longitude]}
              className="mx-auto d-block"
              zoom={this.state.zoom}
              style={{
                width: "80%",
                height: "100%",
                borderRadius: "25px 25px 0px 25px",
              }}
              minZoom={3}
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
