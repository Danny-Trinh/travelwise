import React, { Component } from "react";
import * as d3 from "d3";
import Axios from "axios";

// const data = [ 2, 4, 2, 6, 8 ];
const scale = .05
const barWidth = 5;
const h = 500;
const w = 400;
class CovidChart extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.getData();
  }
  async getData() {
    let json = await Axios.get(`https://api.travelwise.live/covid`);
    this.setState({
      data: json.data,
    });
  }

  drawChart() {
    let data: Array<any> = [];
    this.state.data.forEach((i: any) => {
      data.push(i.new_cases);
    });

    const svg = d3
      .select("#CovidChart")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin-left", 100);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * barWidth)
      .attr("y", (d, i) => h - d * scale)
      .attr("width", barWidth)
      .attr("height", (d, i) => d * scale)
      .attr("fill", "green");
  }

  render() {
    this.drawChart();
    return <div id="CovidChart"></div>;
  }
}

export default CovidChart;
