import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
  FaTransgender,
  FaMoneyCheckAlt,
  FaBriefcaseMedical,
  FaMapMarked,
  FaNewspaper,
  FaFemale,
  FaChartBar,
  FaFistRaised,
} from "react-icons/fa";
import AirportLinks from "../modelComponents/AirportLinks";

const rowData = [
  {
    header: "Region",
    key: "region",
    icon: <FaMapMarked size="5em" className="mx-auto t-yellow-700 d-block" />,
  },
  {
    header: "Overall Danger",
    key: "overall",
    icon: <FaChartBar size="5em" className="mx-auto t-orange-700 d-block" />,
  },
  {
    header: "LGBTQ Danger",
    key: "lgbtq",
    icon: <FaTransgender size="5em" className="mx-auto t-green-700 d-block" />,
  },
  {
    header: "Medical Danger",
    key: "medical",
    icon: (
      <FaBriefcaseMedical size="5em" className="mx-auto t-red-700 d-block" />
    ),
  },
  {
    header: "Physical Danger",
    key: "physical",
    icon: <FaFistRaised size="5em" className="mx-auto t-indigo-700 d-block" />,
  },
  {
    header: "Political Unrest",
    key: "political",
    icon: <FaNewspaper size="5em" className="mx-auto t-teal-700 d-block" />,
  },
  {
    header: "Theft Danger",
    key: "theft",
    icon: <FaMoneyCheckAlt size="5em" className="mx-auto t-blue-700 d-block" />,
  },
  {
    header: "Women Danger",
    key: "women",
    icon: <FaFemale size="5em" className="mx-auto t-pink-700 d-block" />,
  },
];

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
      let json = await Axios.get(
        `https://api.travelwise.live/cities/search?` +
          `name=${this.props.match.params.city}&country_code=${this.props.match.params.country_code}`
      );
      let curCity = json.data;

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
          <h1 className="my-4 text-center">
            {this.state.data.name}, {this.state.data.country}
          </h1>
          <img
            src={this.state.picture}
            alt={this.state.data.name}
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
                <div className="col-4" key={index}>
                  {obj.icon}
                  <div className="text-center card-body">
                    <h4>{obj.header}</h4>
                    <h6>{data[obj.key] ? data[obj.key] : 0}</h6>
                  </div>
                </div>
              );
            })}

            <div className="col-4">
              <Link
                className="link"
                to={`/Covid/${this.state.data.country_code}`}
              >
                <img
                  className="mx-auto d-block"
                  height="80px"
                  src={`https://www.countryflags.io/${this.state.data.country_code}/shiny/64.png`}
                  alt="flag"
                />
              </Link>
              <div className="text-center card-body">
                <h4>Covid Stats</h4>
                <Link
                  className="link"
                  to={`/Covid/${this.state.data.country_code}`}
                >
                  <h6>{this.state.data.country}</h6>
                </Link>
              </div>
            </div>
          </div>

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
                <Popup>{this.state.data.name}</Popup>
              </Marker>
            </Map>
          </div>
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
