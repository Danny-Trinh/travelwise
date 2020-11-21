import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MapRender from "../components/MapRender";
import AirportLinks from "../modelComponents/AirportLinks";
import CovidContent from "../modelComponents/CovidDetailContent";
import { FaCity } from "react-icons/fa";

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
                  <FaCity size="5em" className="mx-auto t-teal-700 d-block" />
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
          <CovidContent {...this.state}></CovidContent>
          <MapRender {...this.state}></MapRender>
          {this.renderCities()}
          <AirportLinks
            data={this.state.data}
            airportData={this.state.airportData}
            typeName="country"
          ></AirportLinks>
          {/* {this.renderAirports()} */}
        </div>
      </React.Fragment>
    );
  }
}
