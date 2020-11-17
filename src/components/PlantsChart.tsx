import React, { Component } from "react";
import * as d3 from "d3";
// import { d3, map } from "d3/world-map";
import Axios from "axios";
import PaginateTool from "./PaginateTool";
import Select from "react-select";
import { covidSort } from "../utility/sorts";
// https://theplantpla.net/api/getanimals
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import Plants from "../json/Plants.json";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];
export default class Example extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/k9jkog04/";
  state = {
    data: [],
  };
  componentDidMount() {
    this.getData();
  }
  async getData() {
    // let json = await Axios.get(`https://api.travelwise.live/covid`);
    let parsedData: any = {};
    for (const property in Plants) {
      let PlantsType: any = Plants;
      let currentFamily: string = PlantsType[property]["family"];
      if (parsedData[currentFamily]) {
        parsedData[currentFamily] += 1;
      } else {
        parsedData[currentFamily] = 1;
      }
    }
    let parsedData1: any = { others: 0 };
    for (const property in parsedData) {
      let freq = parsedData[property];
      if (freq == 1) {
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
  }
  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={this.state.data}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    );
  }
}
