import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Select from "react-select";
import highlight from "../utility/getHighlightedText";
import * as constants from "../utility/data";
import PaginateTool from "../components/PaginateTool";
import { airportSort } from "../utility/sorts";
import Error from "../components/Error";

const rowData = ["latitude", "longitude", "time_offset"];
const headers = [
  "Airport",
  "Airport Code",
  "City",
  "Country",
  "Latitude",
  "Longitude",
  "Timezone",
];

export default class Airports extends Component {
  state = {
    offset: 0, // offset of pagination
    data: [], // airport data
    currentPage: 0, // current page pagination
    pageCount: 0, // page count pagination
    sortType: 1, // keeps track of how data is sorted
    sortOrder: 1, // keeps track of what order to sort in
    searchVal: "", // current search query
    searchActive: false, // is the search query active
    filters: null, // current filters
    perPage: 9, // keeps track of how many instance per page
    error: false,
    isLoading: true,
  };

  componentDidMount() {
    this.getData();
  }

  // fetches data and resets search values and filter values
  async getData() {
    try {
      let json = await Axios.get(`https://api.travelwise.live/airports`);
      this.setState({
        pageCount: Math.ceil(json.data.length / this.state.perPage),
        data: json.data,
        searchActive: false,
        searchVal: "",
        filters: null,
        currentPage: 0,
        offset: 0,
      });
      this.sortData(this.state.sortType);
    } catch (error) {
      this.setState({ error: "true" });
    }
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
        <tr key={`${i.iata_code}`}>
          <td>
            <Link to={`/Airport/${i.iata_code}`}>
              {this.state.searchActive
                ? highlight(i.airport_name[0], this.state.searchVal)
                : i.airport_name[0]}
            </Link>
          </td>
          <td>
            {this.state.searchActive
              ? highlight(i.iata_code[0], this.state.searchVal)
              : i.iata_code[0]}
          </td>
          <td>
            <Link to={`/City/${i.city_name}/${i.country_code}`}>
              {this.state.searchActive
                ? highlight(i.city_name[0], this.state.searchVal)
                : i.city_name[0]}
            </Link>
          </td>
          <td>
            {this.state.searchActive
              ? highlight(i.country_name[0], this.state.searchVal)
              : i.country_name[0]}
          </td>
          {rowData.map((key: string) => (
            <td>
              {this.state.searchActive
                ? highlight(
                    (i[key] ? i[key] : 0).toString(),
                    this.state.searchVal
                  )
                : i[key]}
            </td>
          ))}
        </tr>
      );
    });
    return result;
  }

  renderHeader(){
    let result: Array<any> = [];
    result.push(headers.map((header: string) => (<th scope="col">{header}</th>)));
    return result;
  }

  // sorts data accordingly, does not make a fetch call
  sortData(sortInput: number) {
    let sortedData = airportSort(
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
    try {
      e.preventDefault();
      let json = await Axios.get(`https://api.travelwise.live/airports`);
      const { searchVal } = this.state;
      let data = json.data.filter(
        (airports: any) =>
          airports.airport_name[0].toLowerCase().includes(searchVal) ||
          airports.iata_code[0].toLowerCase().includes(searchVal) ||
          airports.city_name[0].toLowerCase().includes(searchVal) ||
          airports.country_name[0].toLowerCase().includes(searchVal) ||
          (airports.latitude ? airports.latitude : 0)
            .toString()
            .includes(searchVal) ||
          (airports.longitude ? airports.longitude : 0)
            .toString()
            .includes(searchVal) ||
          (airports.time_offset ? airports.time_offset : 0)
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
    } catch (error) {
      this.setState({ error: "true" });
    }
  }

  // fetches data and filters through inclusively, resets search to prevent logic errors
  async handleFilter(filters: any) {
    try {
      this.setState({ filters });
      let json = await Axios.get(`https://api.travelwise.live/airports`);
      if (filters && filters.length > 0) {
        let data = json.data.filter((airport: any) => {
          for (let i = 0; i < filters.length; i++)
            if (airport.country_name[0].localeCompare(filters[i].value) === 0)
              return true;
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
    } catch (error) {
      this.setState({ error: "true" });
    }
  }

  render() {
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <div className="pb-5">
          <div className="container" style={{ minHeight: "45rem" }}>
            <h1 className="my-4">Airports </h1>
            <div className="row">
              <Select
                className="col-md-3"
                onChange={(x: any) => this.sortData(x ? x.value : 1)}
                options={constants.airportSortOptions}
                placeholder="Sort by: Airport"
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
                options={constants.airportOrderOptions}
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
              <Select
                className="col-md-5"
                onChange={(x: any) => this.handleFilter(x)}
                placeholder="Filter: Country"
                value={this.state.filters}
                options={constants.airportFilterOptions}
                isMulti
              />
            </div>
            <table className="table table-hover mx-auto bg-gray-100 mb-5">
              <thead className="thead-dark">
                <tr>{this.renderHeader()}</tr>
              </thead>
              <tbody>{this.renderData()}</tbody>
            </table>
          </div>
          <PaginateTool
            pageCount={this.state.pageCount}
            handlePageClick={this.handlePageClick}
            currentPage={this.state.currentPage}
          />
        </div>
      </React.Fragment>
    );
  }
}
