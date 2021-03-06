import React, { Component } from "react";
import * as d3 from "d3";
import Axios from "axios";
import Error from "../components/Error";

export default class AnimalsChart extends Component {
  state = {
    data: [],
    error: false,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  async getData() {
    try {
      let json = await Axios.get(`https://theplantplanet.live/api/getanimals`);
      let parsedData: any = {};
      for (let id in json.data) {
        let curClass = json.data[id]["animal_order"];
        if (parsedData[curClass]) {
          parsedData[curClass] += 1;
        } else {
          parsedData[curClass] = 1;
        }
      }

      let data: any = [];
      for (const [key, value] of Object.entries(parsedData)) {
        const obj = {
          Name: key,
          Count: value,
        };
        data.push(obj);
      }
      this.setState({
        data,
      });
    } catch (error) {
      this.setState({ error: "true" });
    }
  }

  drawChart() {
    try {
      let dataset = { children: this.state.data };
      let diameter = 900;
      let dataFix: any = d3;
      let color = dataFix.scaleOrdinal(d3.schemeCategory10);
      let bubble = dataFix.pack(dataset).size([diameter, diameter]).padding(0);

      const svg = d3
        .select("#AnimalsChart")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("id", "CityGraph");
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
        return d.data.Name + ": " + d.data.Count;
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
          return d.data.Name.toString();
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d: any) {
          return d.r / 4;
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
          return d.r / 4;
        })
        .attr("fill", "black");
    } catch (error) {
      this.setState({ error: "true" });
    }
  }

  render() {
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <div className="row mb-3">
          <h3>Animals by their Orders</h3>
        </div>
        <div id="AnimalsChart" className="mb-4"></div>
      </React.Fragment>
    );
  }
}
