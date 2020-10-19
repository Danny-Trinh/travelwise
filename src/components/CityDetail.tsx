import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
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
      name: null,
      overall: null,
      physical: null,
      political: null,
      region: null,
      theft: null,
      women: null,
    },
    airportData: [],
  };
  async componentDidMount() {
    // COMMENT ALL THIS BACK IN ONCE MITCHELL AND ADAM ARE READY
    // let json = await Axios.get(
    //   `https://api.travelwise.live/cities/search?name=${this.props.match.params.city}`
    // );
    // let jsonData = json.data.filter(
    //   (city: any) =>
    //     city.country_code[0].localeCompare(
    //       this.props.match.params.country_code
    //     ) === 0
    // );
    // this.setState({
    //   data: jsonData[0],
    // });
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
    let airportJson = await Axios.get(
      `https://api.travelwise.live/airport/search?city_name=${curCity[0].name}`
    );

    this.setState({
      data: curCity[0],
      airportData: airportJson.data,
    });
    console.log(json.data);
  }
  render() {
    let airportRender;
    if (this.state.airportData.length > 0) {
      airportRender = (
        <React.Fragment>
          <h3>Airports</h3>
          <ul>
            {this.state.airportData.map((airport: any) => (
              <li>
                <Link to={`/Airport/${airport.iata_code}`}>
                  {airport.airport_name}
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      airportRender = <p>This city has no airports</p>;
    }
    return (
      <React.Fragment>
        <div className="container m-4">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">City</th>
                <th scope="col">Country</th>
                <th scope="col">Region</th>
                <th scope="col">Overall</th>
                <th scope="col">LGBTQ</th>
                <th scope="col">Medical</th>
                <th scope="col">Physical Harm</th>
                <th scope="col">Political Freedom</th>
                <th scope="col">Theft</th>
                <th scope="col">Women</th>
                <th scope="col">Covid Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.data.name}</td>
                <td>{this.state.data.country}</td>
                <td>{this.state.data.region}</td>
                <td>{this.state.data.overall ? this.state.data.overall : 0}</td>
                <td>{this.state.data.lgbtq ? this.state.data.lgbtq : 0}</td>
                <td>{this.state.data.medical ? this.state.data.medical : 0}</td>
                <td>
                  {this.state.data.physical ? this.state.data.physical : 0}
                </td>
                <td>
                  {this.state.data.political ? this.state.data.political : 0}
                </td>
                <td>{this.state.data.theft ? this.state.data.theft : 0}</td>
                <td>{this.state.data.women ? this.state.data.women : 0}</td>
                <td>
                  <Link to={`/Covid/${this.state.data.country_code}`}>
                    Link
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          {airportRender}
        </div>
      </React.Fragment>
    );
  }
}
