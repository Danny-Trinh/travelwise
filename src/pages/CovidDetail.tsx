import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
  FaCapsules,
  FaCity,
  FaHospital,
  FaPlaneDeparture,
  FaSkull,
  FaSkullCrossbones,
} from "react-icons/fa";

const rowData = [
  {
    header: "New Confirmed Cases",
    key: "new_cases",
    icon: <FaCapsules size="5em" className="mx-auto t-blue-700 d-block" />,
  },
  {
    header: "Total Confirmed Cases",
    key: "total_cases",
    icon: <FaHospital size="5em" className="mx-auto t-red-700 d-block" />,
  },
  {
    header: "New Deaths",
    key: "new_deaths",
    icon: <FaSkull size="5em" className="mx-auto t-gray-700 d-block" />,
  },
  {
    header: "Total Deaths",
    key: "total_deaths",
    icon: <FaSkullCrossbones size="5em" className="mx-auto t-black-700 d-block" />,
  },
];

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

  renderAirports() {
    // if there is not airport data, just render a no airports message
    if (this.state.airportData.length > 0) {
      return (
        <React.Fragment>
          <h1 className="my-5 text-center">Airports</h1>
          <div className="row">
            {this.state.airportData.map((airport: any, index: number) => (
              <div className="col-3" key={index}>
                <Link
                  className="link"
                  to={`/Airport/${airport.iata_code}`}
                >
                  <FaPlaneDeparture
                    size="5em"
                    className="mx-auto t-teal-700 d-block"
                  />
                </Link>
                <div className="text-center card-body">
                  <h4>{airport.iata_code}</h4>
                  <Link
                    className="link"
                    to={`/Airport/${airport.iata_code}`}
                  >
                    <h6>{airport.airport_name}</h6>
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
          <h1 className="text-center my-5">Airports</h1>
          <p className="text-center">
            Currently our database has no airports for {this.state.data.country},
            check another city.
          </p>
        </React.Fragment>
      );
    }
  }

  // if there is not cities data, just render a no cities message
  renderCities() {
    if (this.state.cityData.length > 0) {
      return (
        <React.Fragment>
          <h1 className="my-5 text-center">Cities</h1>
          <div className="row">
            {this.state.cityData.map((city: any, index: number) => (
              <div className="col-3" key={index}>
                <Link
                  className="link"
                  to={`/City/${city.name}/${city.country_code}`}
                >
                  <FaCity
                    size="5em"
                    className="mx-auto t-teal-700 d-block"
                  />
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
            Currently our database has no cities for {this.state.data.country},
            try another country.
          </p>
        </React.Fragment>
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
          <div className="row">
          {rowData.map((obj: any, index: number) => {
              let data: any = this.state.data;
              return (
                <div className="col-6" key={index}>
                  {obj.icon}
                  <div className="text-center card-body">
                    <h4>{obj.header}</h4>
                    <h6>{data[obj.key] ? data[obj.key] : 0}</h6>
                  </div>
                </div>
              );
            })}
          </div>

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
          {this.renderCities()}
          {this.renderAirports()}
        </div>
      </React.Fragment>
    );
  }
}
