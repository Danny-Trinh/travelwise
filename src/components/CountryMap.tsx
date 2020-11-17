import React, { Component } from "react";
import * as d3 from "d3";
// import { d3, map } from "d3/world-map";
import Axios from "axios";
import PaginateTool from "./PaginateTool";
import Select from "react-select";
import { covidSort } from "../utility/sorts";
// https://theplantpla.net/api/getanimals
export default class CovidChart extends Component {
  // The svg
  // let svg = d3.select("svg"),
  // width = +svg.attr("width"),
  // height = +svg.attr("height");
  async componentDidMount() {
    let json = await Axios.get(`https://theplantpla.net/api/getanimals`);
  }
  render() {
    return <React.Fragment></React.Fragment>;
  }
}
