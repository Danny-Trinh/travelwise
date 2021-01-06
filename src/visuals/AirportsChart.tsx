import React, { Component } from "react";
// import Axios from "axios";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import Error from "../components/Error";
import AirportData from "../utility/Airports.json";

const COLORS = [
  "#f56565",
  "#a3bffa",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#b794f4",
  "#4299e1",
  "#48bb78",
];

export default class AirportsChart extends Component {
  state = {
    data: [],
    airportsdata: [],
    error: false,
  };
  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      // let json = await Axios.get(`https://api.travelwise.live/airports`);
      this.setState({
        data: AirportData,
      });
      var dataTemp = new Map();
      for (var airport in AirportData) {
        if (!dataTemp.has(AirportData[airport]["country_name"][0])) {
          dataTemp.set(AirportData[airport]["country_name"][0], 1);
        } else {
          dataTemp.set(
            AirportData[airport]["country_name"][0],
            dataTemp.get(AirportData[airport]["country_name"][0]) + 1
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
    } catch (error) {
      this.setState({ error: "true" });
    }
  }

  render() {
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <div className="row">
          <h3>Airports per Country</h3>
          <span className="ml-2 p-2">(Hover for info)</span>
        </div>

        <PieChart width={1000} height={600}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={this.state.airportsdata}
            cx={550}
            cy={300}
            innerRadius={80}
            outerRadius={250}
            fill="#2c7a7b"
          >
            {this.state.airportsdata.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
        <div id="AirportsChart" className="mb-4"></div>
      </React.Fragment>
    );
  }
}
