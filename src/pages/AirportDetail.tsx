import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import MapRender from "../components/MapRender";
import Loading from "../components/Loading";
import AirportContent from "../modelComponents/AirportDetailContent";
import { FaCity } from "react-icons/fa";
import AirportData from "../utility/Airports.json";

type myProps = { match: any };
export default class AirportDetail extends Component<myProps> {
  state = {
    data: {
      airport_name: "",
      iata_code: null,
      city_name: "",
      country_name: null,
      latitude: 0,
      longitude: 0,
      time_offset: null,
      country_code: null,
    },
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
      // let json = await Axios.get(
      //   `https://api.travelwise.live/airports/search?iata_code=${this.props.match.params.iata}`
      // );
      let json = AirportData.filter((covid: any) => {
        return (
          covid.iata_code[0].localeCompare(this.props.match.params.iata) === 0
        );
      });

      // get image asset
      let picJson = await Axios.get(
        "https://api.unsplash.com/search/photos?client_id=Dj6xszn3N8x0A8n2a2O07Ns0IjeBGTameTQCpNVZMvI&" +
          `query=${json[0].city_name} city&page=1&per_page=10`
      );
      let picString = picJson.data.results[0].urls.regular;
      this.setState({
        data: json[0],
        center: { lat: json[0].latitude, lng: json[0].longitude },
        picture: picString,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  renderCity() {
    return (
      <React.Fragment>
        <h1 className="my-5 text-center"> City </h1>
        <div className="my-4 text-center">
          <Link
            className="link mx-auto d-block"
            to={`/City/${this.state.data.city_name}/${this.state.data.country_code}`}
          >
            <FaCity size="5em" className="mx-auto t-teal-700 d-block" />
            <h6>
              {this.state.data.city_name}, {this.state.data.country_name}
            </h6>
          </Link>
        </div>
      </React.Fragment>
    );
  }

  render() {
    if (this.state.loading) return <Loading />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <div className="container pb-5">
          <AirportContent
            data={this.state.data}
            picture={this.state.picture}
          ></AirportContent>
          <MapRender
            latitude={this.state.data.latitude}
            longitude={this.state.data.longitude}
            zoom={this.state.zoom}
          ></MapRender>
          {this.renderCity()}
        </div>
      </React.Fragment>
    );
  }
}
