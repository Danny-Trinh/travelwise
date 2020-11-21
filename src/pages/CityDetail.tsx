import React, { Component } from "react";
import Axios from "axios";
import Error from "../components/Error";
import Loading from "../components/Loading";

import MapRender from "../components/MapRender";
import CityContent from "../modelComponents/CityDetailContent";
import AirportLinks from "../modelComponents/AirportLinks";

type myProps = { match: any };
export default class CityDetail extends Component<myProps> {
  state = {
    data: {
      country: null,
      country_code: null,
      latitude: 0,
      lgbtq: null,
      longitude: 0,
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
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 11,
    picture: "",
    loading: true,
    error: false,
  };

  async componentDidMount() {
    try {
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

      // get picture asset
      let picJson = await Axios.get(
        "https://api.unsplash.com/search/photos?client_id=Dj6xszn3N8x0A8n2a2O07Ns0IjeBGTameTQCpNVZMvI&" +
          `query=${curCity[0].name} city&page=1&per_page=10`
      );
      let picString = picJson.data.results[0].urls.regular;
      this.setState({
        picture: picString,
      });

      //get airport data
      let airportJson = await Axios.get(
        `https://api.travelwise.live/airports/search?city_name=${curCity[0].name}`
      );
      this.setState({
        data: curCity[0],
        airportData: airportJson.data,
        center: { lat: curCity[0].latitude, lng: curCity[0].longitude },
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
          <CityContent
            data={this.state.data}
            picture={this.state.picture}
          ></CityContent>
          <MapRender
            latitude={this.state.data.latitude}
            longitude={this.state.data.longitude}
            zoom={this.state.zoom}
          ></MapRender>
          <AirportLinks
            data={this.state.data}
            airportData={this.state.airportData}
            typeName="name"
          ></AirportLinks>
        </div>
      </React.Fragment>
    );
  }
}
