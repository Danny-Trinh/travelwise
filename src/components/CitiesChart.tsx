import React, { Component } from "react";
import * as d3 from "d3";
import Axios from "axios";
import PaginateTool from "./PaginateTool";
import Select from "react-select";
import { citySort } from "../utility/sorts";

const scale = 9;
const barThickness = 30;
const barMargin = 5;
const barOffset = 220;
const citySortOptions = [
  // used for sort
  { value: 4, label: "Overall" },
  { value: 1, label: "City" },
];

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
      pageCount: Math.ceil(json.data.length / this.state.perPage),
      data: json.data,
      currentPage: 0,
      offset: 0,
    });
    this.sortData(4);
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

    d3.select("#CityGraph").remove();
    const svg = d3
      .select("#CitiesChart")
      .append("svg")
      .attr("width", "100%")
      .attr("height", this.state.perPage * (barThickness + barMargin))
      .attr("id", "CityGraph");
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d, i) => i * (barThickness + barMargin))
      .attr("x", barOffset)
      .attr("width", (d, i) => d["overall"] * scale)
      .attr("height", barThickness)
      .attr("fill", (d) => makeColor(d));
    svg
      .selectAll("#CityName")
      .data(data)
      .enter()
      .append("text")
      .attr("y", (d, i) => i * (barThickness + barMargin) + barThickness * 0.66)
      .attr("x", "0")
      .attr("id", "CityName")
      .text((d) => d["name"][0]);
    svg
      .selectAll("#Overall")
      .data(data)
      .enter()
      .append("text")
      .attr("y", (d, i) => i * (barThickness + barMargin) + barThickness * 0.66)
      .attr("x", (d) => barOffset + d["overall"] * scale + 10)
      .attr("id", "Overall")
      .text((d) => (d["overall"] ? d["overall"] : 0));
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mb-3">
          <h3 className="col-4">City Overall Rankings</h3>
          <Select
            className="col-3"
            onChange={(x: any) => this.sortData(x ? x.value : 4)}
            placeholder="Sort by: Overall"
            options={citySortOptions}
            isClearable
            isSearchable={false}
          />
        </div>
        <div id="CitiesChart" className="mb-4"></div>
        <PaginateTool
          pageCount={this.state.pageCount}
          handlePageClick={this.handlePageClick}
          currentPage={this.state.currentPage}
        />
      </React.Fragment>
    );
  }
}
function makeColor(data: any) {
  let newColor = (data["overall"] * scale) / 5;
  return `rgb(255,${200 - newColor},${200 - newColor})`;
}
