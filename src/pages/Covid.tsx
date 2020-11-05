import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import highlight from "../utility/getHighlightedText";
import * as constants from "../utility/data";
import { covidSort } from "../utility/sorts";
import PaginateTool from "../components/PaginateTool";

export default class Covid extends Component {
  state = {
    offset: 0, // offset of pagination
    data: [], // covid data
    currentPage: 0, // current page pagination
    pageCount: 0, // page count pagination
    sortType: 1, // keeps track of how data is sorted
    sortOrder: 1, // keeps track of what order to sort in
    searchVal: "", // current search query
    searchActive: false, // is the search query active
    filters: null, // current filters
    perPage: 9, // keeps track of how many instance per page
  };

  componentDidMount() {
    this.getData();
  }

  // fetches data and resets search values and filter values
  async getData() {
    let json = await Axios.get(`https://api.travelwise.live/covid`);
    this.setState({
      pageCount: Math.ceil(json.data.length / this.state.perPage),
      data: json.data,
      searchActive: false,
      searchVal: "",
      filters: null,
    });
    this.sortData(this.state.sortOrder);
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

  // render a list of covid objects to html
  renderData() {
    let chunk = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    let result: Array<any> = [];
    chunk.forEach((i: any) => {
      result.push(
        <tr key={i.country_code}>
          <td>
            <Link to={`/Covid/${i.country_code}`}>
              {this.state.searchActive
                ? highlight(i.country[0], this.state.searchVal)
                : i.country[0]}
            </Link>
          </td>
          <td>
            {this.state.searchActive
              ? highlight(i.country_code[0], this.state.searchVal)
              : i.country_code[0]}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.new_cases ? i.new_cases : 0).toString(),
                  this.state.searchVal
                )
              : i.new_cases
              ? i.new_cases
              : 0}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.total_cases ? i.total_cases : 0).toString(),
                  this.state.searchVal
                )
              : i.total_cases
              ? i.total_cases
              : 0}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.new_deaths ? i.new_deaths : 0).toString(),
                  this.state.searchVal
                )
              : i.new_deaths
              ? i.new_deaths
              : 0}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.total_deaths ? i.total_deaths : 0).toString(),
                  this.state.searchVal
                )
              : i.total_deaths
              ? i.total_deaths
              : 0}
          </td>
        </tr>
      );
    });
    return result;
  }

  // sorts data accordingly, does not make a fetch call
  sortData(sortInput: number) {
    let sortedData = covidSort(
      sortInput,
      this.state.sortOrder,
      this.state.data
    );
    this.setState({ data: sortedData, sortType: sortInput });
  }

  // manages values in the search bar
  handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    this.setState((prevstate) => {
      const newState: any = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  // on search enter, fetches data and queries search
  async handleSubmit(e: any) {
    e.preventDefault();
    let json = await Axios.get(`https://api.travelwise.live/covid`);
    const { searchVal } = this.state;
    let data = json.data.filter(
      (covid: any) =>
        covid.country[0].toLowerCase().includes(searchVal) ||
        covid.country_code[0].toLowerCase().includes(searchVal) ||
        (covid.new_cases ? covid.new_cases : 0)
          .toString()
          .includes(searchVal) ||
        (covid.total_cases ? covid.total_cases : 0)
          .toString()
          .includes(searchVal) ||
        (covid.new_deaths ? covid.new_deaths : 0)
          .toString()
          .includes(searchVal) ||
        (covid.total_deaths ? covid.total_deaths : 0)
          .toString()
          .includes(searchVal)
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      data,
      searchActive: true,
      filters: null,
    });
    this.sortData(this.state.sortType);
  }

  // fetches data and filters through inclusively, resets search to prevent logic errors
  async handleFilter(filters: any) {
    this.setState({ filters });
    let json = await Axios.get(`https://api.travelwise.live/covid`);
    if (filters && filters.length > 0) {
      let data = json.data.filter((covid: any) => {
        for (let i = 0; i < filters.length; i++) {
          if (covid[filters[i].value[0]] > filters[i].value[1]) return true;
        }
        return false;
      });
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        data,
        searchVal: "",
        searchActive: false,
      });
      this.sortData(this.state.sortType);
    } else {
      this.getData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container mb-5">
          <h1 className="my-4">Covid-19 </h1>
          <div className="row">
            <Select
              className="col-md-3"
              onChange={(x: any) => this.sortData(x ? x.value : 1)}
              options={constants.covidSortOptions}
              placeholder="Sort by: Country"
              isClearable
              isSearchable={false}
            />
            <Select
              className="col-md-3"
              onChange={(x: any) => {
                this.setState({ sortOrder: x.value }, () =>
                  this.sortData(this.state.sortType)
                );
              }}
              placeholder="Order: Ascend"
              options={constants.covidOrderOptions}
              isSearchable={false}
            />
            <form className="col-md-5" onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                value={this.state.searchVal}
                placeholder="Search:"
                className="form-control"
                name="searchVal"
                onChange={(e) => this.handleChange(e)}
                disabled={this.state.searchActive}
              />
            </form>
            <button
              className={`col-md-1 rounded btn-danger ${
                this.state.searchActive ? "" : "d-none"
              }`}
              onClick={() => this.getData()}
            >
              Cancel
            </button>
          </div>
          <div className="row mt-1 mb-3">
            <Select
              className="col-md-3"
              onChange={(x: any) => {
                this.getData();
                this.setState({ perPage: x ? x.value : 9 });
              }}
              options={constants.pageViewOptions}
              placeholder="Items Per Page: 9"
              isClearable
              isSearchable={false}
            />
            <div className="col-md-3"></div>
            <Select
              className="col-md-5"
              onChange={(x: any) => this.handleFilter(x)}
              placeholder="Filter: Stats"
              value={this.state.filters}
              options={constants.covidFilterOptions}
              isMulti
              isSearchable={false}
            />
          </div>
          <table className="table table-hover mx-auto bg-gray-100">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Country Code</th>
                <th scope="col">New Confirmed Cases</th>
                <th scope="col">Total Confirmed Cases</th>
                <th scope="col">New Deaths</th>
                <th scope="col">Total Deaths</th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>
        <PaginateTool
          pageCount={this.state.pageCount}
          handlePageClick={this.handlePageClick}
        />
      </React.Fragment>
    );
  }
}
