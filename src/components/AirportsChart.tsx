import React, { Component } from "react";
import * as d3 from "d3";
import Axios from "axios";
import { citySort } from "../utility/sorts";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

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
      if (!dataTemp.has(json.data[airport]["country_code"])) {
        dataTemp.set(json.data[airport]["country_code"], 1);
      } else {
        dataTemp.set(
          json.data[airport]["country_code"],
          dataTemp.get(json.data[airport]["country_code"]) + 1
        );
      }
    }

    var datamap: any = [];
    dataTemp.forEach((x: any) => {
      const temp = { name: x.key, value: x.value };
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
          <h3 className="col-4">Airports per Country</h3>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data01}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
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
