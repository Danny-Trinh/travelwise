import React, { Component } from "react";
import Axios from "axios";
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
  };
  async componentDidMount() {
    // IMPORTANT: make error catch if nothing is resulted from query or more than 1, make more error catches in general
    let json = await Axios.get(
      `https://api.travelwise.live/cities/search?name=${this.props.match.params.id}`
    );
    this.setState({
      data: json.data[0],
    });
    console.log(json.data);
  }
  render() {
    console.log(this.props);
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
              </tr>
            </thead>
            <tbody>
              <td>{this.state.data.name}</td>
              <td>{this.state.data.country}</td>
              <td>{this.state.data.region}</td>
              <td>{this.state.data.overall ? this.state.data.overall : 0}</td>
              <td>{this.state.data.lgbtq ? this.state.data.lgbtq : 0}</td>
              <td>{this.state.data.medical ? this.state.data.medical : 0}</td>
              <td>{this.state.data.physical ? this.state.data.physical : 0}</td>
              <td>
                {this.state.data.political ? this.state.data.political : 0}
              </td>
              <td>{this.state.data.theft ? this.state.data.theft : 0}</td>
              <td>{this.state.data.women ? this.state.data.women : 0}</td>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
