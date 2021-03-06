import React, { Component } from "react";
import * as d3 from "d3";
// import Axios from "axios";
import PaginateTool from "../components/PaginateTool";
import Select from "react-select";
import { covidSort } from "../utility/sorts";
import Error from "../components/Error";
import CovidData from "../utility/Covid.json";

const scale = 0.0001;
const barThickness = 30;
const barMargin = 5;
const barOffset = 220;
const covidSortOptions = [
  { value: 4, label: "Total Cases" },
  { value: 1, label: "Country" },
];

export default class CovidChart extends Component {
  state = {
    data: [],
    offset: 0, // offset of pagination
    currentPage: 0, // current page pagination
    pageCount: 0, // page count pagination
    perPage: 10, // keeps track of how many instance per page
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
      // let json = await Axios.get(`https://api.travelwise.live/covid`);

      this.setState(
        {
          pageCount: Math.ceil(CovidData.length / this.state.perPage),
          data: CovidData,
          currentPage: 0,
          offset: 0,
        },
        () => this.sortData(4)
      );
    } catch (error) {
      this.setState({ error: "true" });
    }
  }

  sortData(sortInput: number) {
    let sortedData = covidSort(
      sortInput,
      sortInput === 1 ? 1 : -1,
      this.state.data
    );
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
    try {
      let data: Array<any> = [];
      let chunk = this.state.data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      chunk.forEach((i: any) => {
        data.push(i);
      });

      d3.select("#NewGraph").remove();
      const svg = d3
        .select("#CovidChart")
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
        .attr("width", (d, i) => d["total_cases"] * scale)
        .attr("height", barThickness)
        .attr("fill", (d) => makeColor(d));
      svg
        .selectAll("#CountryName")
        .data(data)
        .enter()
        .append("text")
        .attr(
          "y",
          (d, i) => i * (barThickness + barMargin) + barThickness * 0.66
        )
        .attr("x", "0")
        .attr("id", "CountryName")
        .text((d) => d["country"][0]);
      svg
        .selectAll("#TotalCases")
        .data(data)
        .enter()
        .append("text")
        .attr(
          "y",
          (d, i) => i * (barThickness + barMargin) + barThickness * 0.66
        )
        .attr("x", (d) => barOffset + d["total_cases"] * scale + 10)
        .attr("id", "TotalCases")
        .text((d) => d["total_cases"]);
    } catch (error) {
      this.setState({ error: "true" });
    }
  }

  render() {
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <div className="row mb-3">
          <h3 className="col-4">Total Covid Cases</h3>
          <Select
            className="col-3"
            onChange={(x: any) => this.sortData(x ? x.value : 4)}
            placeholder="Sort by: Total Cases"
            options={covidSortOptions}
            isClearable
            isSearchable={false}
          />
        </div>
        <div id="CovidChart" className="mb-4"></div>
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
  let newColor = (data["total_cases"] * scale) / 5;
  return `rgb(255,${200 - newColor},${200 - newColor})`;
}
