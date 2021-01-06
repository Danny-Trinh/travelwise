import React, { Component } from "react";
import Axios from "axios";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MapRender from "../components/MapRender";
import AirportLinks from "../modelComponents/AirportLinks";
import CityLinks from "../modelComponents/CityLinks";
import CovidContent from "../modelComponents/CovidDetailContent";
import CityData from "../utility/Cities.json";
import AirportData from "../utility/Airports.json";
import CovidData from "../utility/Covid.json";

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
      // let json = await Axios.get(
      //   `https://api.travelwise.live/covid/search?country_code=${this.props.match.params.country_code}`
      // );
      // let citiesJson = await Axios.get(`https://api.travelwise.live/cities`);
      // let airportJson = await Axios.get(
      //   `https://api.travelwise.live/airports/search?country_code=${this.props.match.params.country_code}`
      // );
      let json = CovidData.filter((covid: any) => {
        return (
          covid.country_code[0].localeCompare(
            this.props.match.params.country_code
          ) === 0
        );
      });

      let cityData = CityData.filter(
        (city: any) =>
          city.country_code[0].localeCompare(json[0].country_code[0]) === 0
      );
      let airportData = AirportData.filter((covid: any) => {
        return (
          covid.country_code[0]
            .toLowerCase()
            .localeCompare(
              this.props.match.params.country_code.toLowerCase()
            ) === 0
        );
      });

      // get longitude/latitude
      let location = await Axios.get(
        `https://restcountries.eu/rest/v2/alpha/${this.props.match.params.country_code}`
      );
      let latitude = location.data.latlng[0];
      let longitude = location.data.latlng[1];

      // get picture asset
      let picJson = await Axios.get(
        "https://api.unsplash.com/search/photos?client_id=Dj6xszn3N8x0A8n2a2O07Ns0IjeBGTameTQCpNVZMvI&" +
          `query=${json[0].country} city&page=1&per_page=10`
      );
      let picString = picJson.data.results[0].urls.regular;

      this.setState({
        data: json[0],
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

  render() {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <div className="container pb-5">
          <CovidContent
            data={this.state.data}
            picture={this.state.picture}
          ></CovidContent>
          <MapRender
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            zoom={this.state.zoom}
          ></MapRender>
          <AirportLinks
            data={this.state.data}
            airportData={this.state.airportData}
            typeName="country"
          ></AirportLinks>
          <CityLinks
            data={this.state.data}
            cityData={this.state.cityData}
          ></CityLinks>
        </div>
      </React.Fragment>
    );
  }
}
