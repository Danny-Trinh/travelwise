import React, { Component } from "react";
import * as d3 from "d3";
import Axios from "axios";
import { citySort } from "../utility/sorts";

export default class CitiesChart extends Component {
  state = {
    data: [],
    offset: 0, // offset of pagination
    currentPage: 0, // current page pagination
    pageCount: 0, // page count pagination
    perPage: 10, // keeps track of how many instance per page
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

  sortData(sortInput: number) {
    let sortedData = citySort(sortInput, 1, this.state.data);
    this.setState({ data: sortedData, sortType: sortInput });
  }

  // handles pagination click
  handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };

  drawChart() {
    let data: Array<any> = [];
    let chunk = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    chunk.forEach((i: any) => {
      data.push(i);
    });

    // Bubble chart
    var datamap = [];
    for(var city in this.state.data){
      const obj = {Name: this.state.data[city]["name"], Count: this.state.data[city]["overall"]}
      datamap.push(obj);
    }

    var dataset = {"children": datamap};

    var diameter = 1000;

    let dataFix: any = d3;

    var color = dataFix.scaleOrdinal(d3.schemeCategory10);



    var bubble = dataFix.pack(dataset).size([diameter, diameter]).padding(1.5);

    d3.select("#CityGraph").remove();
    const svg = d3
      .select("#CitiesChart")
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("id", "CityGraph");
    var nodes = dataFix.hierarchy(dataset)
      .sum(function(d: any) { return d.Count; });
    var node = svg.selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function(d : any){
          return  !d.children
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d: any) {
          return "translate(" + d.x + "," + d.y + ")";
      });
      node.append("title")
      .text(function(d: any) {
          return d.Name + ": " + d.Count;
      });
      node.append("circle")
      .attr("r", function(d: any) {
          return d.r;
      })
      .style("fill", function(d,i) {
          return color(i);
      });

  node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d: any) {
          return d.data.Name.toString().substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d: any){
          return d.r/5;
      })
      .attr("fill", "white");

  node.append("text")
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function(d: any) {
          return d.data.Count;
      })
      .attr("font-family",  "Gill Sans", )
      .attr("font-size", function(d: any){
          return d.r/5;
      })
      .attr("fill", "white");
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