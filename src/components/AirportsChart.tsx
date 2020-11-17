import React, { Component } from "react";
import * as d3 from "d3";
import Axios from "axios";
import { citySort } from "../utility/sorts";
import {
    PieChart, Pie, Legend, Tooltip,
  } from 'recharts';

export default class AirportsChart extends Component {
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
      let json = await Axios.get(`https://api.travelwise.live/airports`);
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

      var dataTemp = new Map();

      for(var airport in this.state.data){
          if(!dataTemp.has(this.state.data[airport]["country_code"])){
            dataTemp.set(this.state.data[airport]["country_code"], 1);
          }
          else{
              dataTemp.set(this.state.data[airport]["country_code"], dataTemp.get(this.state.data[airport]["country_code"]) + 1);
          }
      }

      var datamap = [];
      /*for(const [key, value] of dataTemp.entries()){

      }*/

    }
  
    render() {
      return (
        <React.Fragment>
          <div className="row mb-3">
            <h3 className="col-4">Airports per Country</h3>
  
          </div>
          <div id="AirportsChart" className="mb-4"></div>
        </React.Fragment>
      );
    }
  }