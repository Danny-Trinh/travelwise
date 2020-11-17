import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Error from "../components/Error";
import Loading from "../components/Loading";

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
  renderAirports() {
    // if there is not airport data, just render a no airports message
    if (this.state.airportData.length > 0) {
      return (
        <React.Fragment>
          <h5>Airports:</h5>
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
      return (
        <p>
          <span className="h5 inline">Airports: </span>
          Currently our database has no airports for {this.state.data.name},
          check another city
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
          <h1 className="my-4">
            {this.state.data.name}, {this.state.data.country}
          </h1>
          <p>
            <span className="h5 inline">Region: </span>
            {this.state.data.region}
          </p>
          <p>
            <span className="h5 inline">Overall Score: </span>
            {this.state.data.overall ? this.state.data.overall : 0}
          </p>
          <p>
            <span className="h5 inline">LGBTQ Score: </span>
            {this.state.data.lgbtq ? this.state.data.lgbtq : 0}
          </p>
          <p>
            <span className="h5 inline">Medical Score: </span>
            {this.state.data.medical ? this.state.data.medical : 0}
          </p>
          <p>
            <span className="h5 inline">Physical Score: </span>
            {this.state.data.physical ? this.state.data.physical : 0}
          </p>
          <p>
            <span className="h5 inline">Theft Score: </span>
            {this.state.data.theft ? this.state.data.theft : 0}
          </p>
          <p>
            <span className="h5 inline">Women Score: </span>
            {this.state.data.women ? this.state.data.women : 0}
          </p>
          <p>
            <span className="h5 inline">Covid Stats: </span>
            <Link to={`/Covid/${this.state.data.country_code}`}>Link</Link>
          </p>
          {this.renderAirports()}
          <img
            src={this.state.picture}
            alt={this.state.data.name}
            width="75%"
            style={{
              borderRadius: "25px",
              objectFit: "cover",
              maxHeight: "800px",
            }}
          ></img>
          <div className="my-5" style={{ height: "20rem", width: "100%" }}>
            <Map
              center={[this.state.center.lat, this.state.center.lng]}
              zoom={this.state.zoom}
              style={{
                width: "75%",
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
                <Popup>{this.state.data.name}</Popup>
              </Marker>
            </Map>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
