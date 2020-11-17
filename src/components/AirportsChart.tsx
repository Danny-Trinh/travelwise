import React, { Component } from "react";
import Axios from "axios";
import { PieChart, Pie, Tooltip } from "recharts";

export default class AirportsChart extends Component {
  state = {
    data: [],
    airportsdata: [],
  };
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
    this.drawChart();
  }
  async getData() {
    let json = await Axios.get(`https://api.travelwise.live/airports`);
    this.setState({
      data: json.data,
    });
    var dataTemp = new Map();
    for (var airport in json.data) {
      if (!dataTemp.has(json.data[airport]["country_name"][0])) {
        dataTemp.set(json.data[airport]["country_name"][0], 1);
      } else {
        dataTemp.set(
          json.data[airport]["country_name"][0],
          dataTemp.get(json.data[airport]["country_name"][0]) + 1
        );
      }
    }

    var datamap: any = [];
    dataTemp.forEach((value: any, key: any) => {
      const temp = { name: key, value: value };
      datamap.push(temp);
    });

    this.setState({
      airportsdata: datamap,
    });
  }

  drawChart() {}

  render() {
    return (
      <React.Fragment>
        <div className="row mb-3">
          <h3 className="col-4">Airports by Country</h3>
          <PieChart width={1000} height={600}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={this.state.airportsdata}
              cx={550}
              cy={300}
              outerRadius={250}
              fill="#2c7a7b"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
        <div id="AirportsChart" className="mb-4"></div>
      </React.Fragment>
    );
  }
}
