import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Error from "../components/Error";
import Loading from "../components/Loading";
import AirportContent from "../modelComponents/AirportDetailContent";
import { FaCity } from "react-icons/fa";

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
      let json = await Axios.get(
        `https://api.travelwise.live/airports/search?iata_code=${this.props.match.params.iata}`
      );

      // get image asset
      let picJson = await Axios.get(
        "https://api.unsplash.com/search/photos?client_id=Dj6xszn3N8x0A8n2a2O07Ns0IjeBGTameTQCpNVZMvI&" +
          `query=${json.data[0].city_name} city&page=1&per_page=10`
      );
      let picString = picJson.data.results[0].urls.regular;
      this.setState({
        data: json.data[0],
        center: { lat: json.data[0].latitude, lng: json.data[0].longitude },
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
          <AirportContent {...this.state}></AirportContent>
          <h1 className="my-5 text-center"> Map </h1>
          <div style={{ height: "20rem", width: "100%" }}>
            <Map
              center={[this.state.center.lat, this.state.center.lng]}
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
              <Marker position={[this.state.center.lat, this.state.center.lng]}>
                <Popup>{this.state.data.airport_name}</Popup>
              </Marker>
            </Map>
          </div>
          {this.renderCity()}
        </div>
      </React.Fragment>
    );
  }
}
