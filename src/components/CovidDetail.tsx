import React, { Component } from "react";
import Axios from "axios";
type myProps = { match: any };
export default class CovidDetail extends Component<myProps> {
  state = {
    data: {
      country_code: null,
      new_cases: null,
      total_cases: null,
      new_deaths: null,
      total_deaths: null,
      country: null,
    },
  };

  async componentDidMount() {
    // IMPORTANT: make error catch if nothing is resulted from query or more than 1, make more error catches in general
    let json = await Axios.get(
      `https://api.travelwise.live/covid/search?country_code=${this.props.match.params.id}`
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
                <th scope="col">Country</th>
                <th scope="col">Country Code</th>
                <th scope="col">New Confirmed Cases</th>
                <th scope="col">Total Confirmed Cases</th>
                <th scope="col">New Deaths</th>
                <th scope="col">Total Deaths</th>
              </tr>
            </thead>
            <tbody>
              <td>{this.state.data.country}</td>
              <td>{this.state.data.country_code}</td>
              <td>{this.state.data.new_cases}</td>
              <td>{this.state.data.total_cases}</td>
              <td>{this.state.data.new_deaths}</td>
              <td>{this.state.data.total_deaths}</td>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
