import React, { Component } from "react";
import * as d3 from "d3";
// import Axios from "axios";
import PaginateTool from "../components/PaginateTool";
import Select from "react-select";
import Locations from "../json/Locations.json";
import { locationsSort } from "../utility/sorts";

const scale = 0.000017;
const barThickness = 30;
const barMargin = 5;
const barOffset = 170;
const locationsSortOptions = [
  { value: 2, label: "Population" },
  { value: 1, label: "State" },
];
export default class LocationsChart extends Component {
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
    // let json = await Axios.get(`https://api.travelwise.live/covid`);
    let data = [];
    let LocationsType: any = Locations;
    for (let id in LocationsType) {
      const obj = {
        State: LocationsType[id].state,
        Population: LocationsType[id].population,
      };
      data.push(obj);
    }
    this.setState(
      {
        pageCount: Math.ceil(data.length / this.state.perPage),
        data,
        currentPage: 0,
        offset: 0,
      },
      () => this.sortData(2)
    );
  }

  sortData(sortInput: number) {
    let sortedData = locationsSort(sortInput, this.state.data);
    this.setState({ data: sortedData });
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
    let data = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    d3.select("#NewGraph").remove();
    const svg = d3
      .select("#LocationsChart")
      .append("svg")
      .attr("width", "100%")
      .attr("height", this.state.perPage * (barThickness + barMargin))
      .attr("id", "NewGraph");
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d, i) => i * (barThickness + barMargin))
      .attr("x", barOffset)
      .attr("width", (d, i) => d["Population"] * scale)
      .attr("height", barThickness)
      .attr("fill", (d) => makeColor(d));
    svg
      .selectAll("#StateName")
      .data(data)
      .enter()
      .append("text")
      .attr("y", (d, i) => i * (barThickness + barMargin) + barThickness * 0.66)
      .attr("x", "0")
      .attr("id", "StateName")
      .text((d: any) => d["State"].toString().substring(0, 20));
    svg
      .selectAll("#Population")
      .data(data)
      .enter()
      .append("text")
      .attr("y", (d, i) => i * (barThickness + barMargin) + barThickness * 0.66)
      .attr("x", (d) => barOffset + d["Population"] * scale + 10)
      .attr("id", "Population")
      .text((d) => d["Population"]);
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mb-3">
          <h3 className="col-4">Total Covid Cases</h3>
          <Select
            className="col-3"
            onChange={(x: any) => this.sortData(x ? x.value : 2)}
            placeholder="Sort by: Total Cases"
            options={locationsSortOptions}
            isClearable
            isSearchable={false}
          />
        </div>
        <div id="LocationsChart" className="mb-4"></div>
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
  let newColor = (data["Population"] * scale) / 5;
  return `rgb(${170 - newColor},230,${170 - newColor})`;
}
