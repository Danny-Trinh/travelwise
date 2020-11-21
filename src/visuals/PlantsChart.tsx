import React, { Component } from "react";
import Axios from "axios";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import Error from "../components/Error";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#b794f4",
  "#4299e1",
  "#48bb78",
];

export default class Example extends Component {
  state = {
    data: [],
    error: false,
  };
  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      let json = await Axios.get(`https://theplantplanet.live/api/getplants`);
      let parsedData: any = {};
      for (const property in json.data) {
        let currentFamily: string = json.data[property]["family"];
        if (parsedData[currentFamily]) {
          parsedData[currentFamily] += 1;
        } else {
          parsedData[currentFamily] = 1;
        }
      }
      let parsedData1: any = { others: 0 };
      for (const property in parsedData) {
        let freq = parsedData[property];
        if (freq === 1) {
          parsedData1.others++;
        } else {
          parsedData1[property] = parsedData[property];
        }
      }
      let result: any = [];
      for (const [key, value] of Object.entries(parsedData1)) {
        result.push({ name: key, value: value });
      }
      this.setState({ data: result });
    } catch (error) {
      this.setState({ error: "true" });
    }
  }

  render() {
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <div className="row">
          <h3>Plants by their Families</h3>
          <span className="ml-2 p-2">(Hover for info)</span>
        </div>

        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={this.state.data}
            cx={200}
            cy={200}
            innerRadius={50}
            outerRadius={150}
          >
            {this.state.data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </React.Fragment>
    );
  }
}
