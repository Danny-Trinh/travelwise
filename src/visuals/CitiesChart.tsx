import React, { Component } from "react";
import * as d3 from "d3";
import Axios from "axios";

export default class CitiesChart extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  async getData() {
    let json = await Axios.get(`https://api.travelwise.live/cities`);
    this.setState({
      data: json.data,
    });
  }

  drawChart() {
    // Bubble chart
    let datamap = [];
    for (let city in this.state.data) {
      const obj = {
        Name: this.state.data[city]["name"],
        Count: this.state.data[city]["overall"],
      };
      datamap.push(obj);
    }

    let dataset = { children: datamap };
    let diameter = 1000;
    let dataFix: any = d3;
    let color = dataFix.scaleOrdinal(d3.schemeCategory10);
    let bubble = dataFix.pack(dataset).size([diameter, diameter]);

    const svg = d3
      .select("#CitiesChart")
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("id", "NewGraph");
    let nodes = dataFix.hierarchy(dataset).sum(function (d: any) {
      return d.Count;
    });
    let node = svg
      .selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d: any) {
        return !d.children;
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d: any) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    node.append("title").text(function (d: any) {
      return d.Name + ": " + d.Count;
    });
    node
      .append("circle")
      .attr("r", function (d: any) {
        return d.r;
      })
      .style("fill", function (d, i) {
        return color(i);
      });

    node
      .append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function (d: any) {
        return d.data.Name.toString().substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d: any) {
        return d.r / 2.7;
      })
      .attr("fill", "black");

    node
      .append("text")
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function (d: any) {
        return d.data.Count;
      })
      .attr("font-family", "Gill Sans")
      .attr("font-size", function (d: any) {
        return d.r / 2.7;
      })
      .attr("fill", "black");
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mb-3">
          <h3 className="col-4">City Overall Rankings</h3>
        </div>
        <div id="CitiesChart" className="mb-4"></div>
      </React.Fragment>
    );
  }
}
