import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Error from "../components/Error";
import Loading from "../components/Loading";

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
      let json = await Axios.get(`https://api.travelwise.live/airports`);
      let curAirport = json.data.filter(
        (airport: any) =>
          airport.iata_code[0].localeCompare(this.props.match.params.iata) === 0
      );

      // get image asset
      let picJson = await Axios.get(
        "https://api.unsplash.com/search/photos?client_id=Dj6xszn3N8x0A8n2a2O07Ns0IjeBGTameTQCpNVZMvI&" +
          `query=${curAirport[0].city_name} city&page=1&per_page=10`
      );
      let picString = picJson.data.results[0].urls.regular;
      this.setState({
        data: curAirport[0],
        center: { lat: curAirport[0].latitude, lng: curAirport[0].longitude },
        picture: picString,
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
          <h1 className="my-4">{this.state.data.airport_name}</h1>
          <p>
            <span className="h5 inline">City: </span>
            <Link
              to={`/City/${this.state.data.city_name}/${this.state.data.country_code}`}
            >
              {this.state.data.city_name}, {this.state.data.country_name}
            </Link>
          </p>
          <p>
            <span className="h5 inline">Coordinates: </span>(
            {this.state.data.latitude ? this.state.data.latitude : 0},
            {this.state.data.longitude ? this.state.data.longitude : 0})
          </p>
          <p>
            <span className="h5 inline">Time Offset: </span>
            {this.state.data.time_offset ? this.state.data.time_offset : 0}
          </p>
          <p>
            <span className="h5 inline">Covid Stats: </span>
            <Link to={`/Covid/${this.state.data.country_code}`}>Link</Link>
          </p>
          <div className="card">
            <img
              src={this.state.picture}
              alt={this.state.data.airport_name}
            ></img>
          </div>
          <div className="row mb-3"></div>
          <div className="my-5" style={{ height: "20rem", width: "100%" }}>
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
                <Popup>{this.state.data.airport_name}</Popup>
              </Marker>
            </Map>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
