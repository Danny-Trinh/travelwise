import React, { Component } from "react";
// import Axios from "axios";
import { Link } from "react-router-dom";
import highlight from "../utility/getHighlightedText";
import { covidSort } from "../utility/sorts";
import PaginateTool from "../components/PaginateTool";
import Error from "../components/Error";
import CovidData from "../utility/Covid.json";

import CovidHeader from "../modelComponents/CovidHeader";

const rowData = ["new_cases", "total_cases", "new_deaths", "total_deaths"];
const headers = [
  "Country",
  "Country Code",
  "New Confirmed Cases",
  "Total Confirmed Cases",
  "New Deaths",
  "Total Deaths",
];

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
    error: false,
  };

  componentDidMount() {
    this.getData();
  }

  // fetches data and resets search values and filter values
  async getData() {
    try {
      // let json = await Axios.get(`https://api.travelwise.live/covid`);
      this.setState(
        {
          pageCount: Math.ceil(CovidData.length / this.state.perPage),
          data: CovidData,
          searchActive: false,
          searchVal: "",
          filters: null,
          currentPage: 0,
          offset: 0,
        },
        () => this.sortData(this.state.sortType)
      );
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
  renderData = () => {
    let chunk = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    let result: Array<any> = [];
    chunk.forEach((i: any) => {
      result.push(
        <tr key={i.country_code}>
          <td>
            <Link className="link" to={`/Covid/${i.country_code}`}>
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
          {rowData.map((key: string, index: number) => (
            <td key={index}>
              {this.state.searchActive
                ? highlight(
                    (i[key] ? i[key] : 0).toString(),
                    this.state.searchVal
                  )
                : i[key]
                ? i[key]
                : 0}
            </td>
          ))}
        </tr>
      );
    });
    return result;
  };

  // sorts data accordingly, does not make a fetch call
  sortData = (sortInput: number) => {
    let sortedData = covidSort(
      sortInput,
      this.state.sortOrder,
      this.state.data
    );
    this.setState({ data: sortedData, sortType: sortInput });
  };

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

  handleSortChange = (x: any) => {
    this.setState({ sortOrder: x.value }, () =>
      this.sortData(this.state.sortType)
    );
  };

  handleViewChange = (x: any) => {
    this.setState({ perPage: x ? x.value : 9 }, () => this.getData());
  };

  // on search enter, fetches data and queries search
  async handleSubmit(e: any) {
    try {
      e.preventDefault();
      // let json = await Axios.get(`https://api.travelwise.live/covid`);
      const { searchVal } = this.state;
      let data = CovidData.filter(
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
      this.setState(
        {
          pageCount: Math.ceil(data.length / this.state.perPage),
          data,
          searchActive: true,
          filters: null,
        },
        () => this.sortData(this.state.sortType)
      );
    } catch (error) {
      this.setState({ error: "true" });
    }
  }

  // fetches data and filters through inclusively, resets search to prevent logic errors
  async handleFilter(filters: any) {
    try {
      this.setState({ filters });
      // let json = await Axios.get(`https://api.travelwise.live/covid`);
      if (filters && filters.length > 0) {
        let data = CovidData.filter((covid: any) => {
          for (let i = 0; i < filters.length; i++) {
            if (covid[filters[i].value[0]] > filters[i].value[1]) return true;
          }
          return false;
        });
        this.setState(
          {
            pageCount: Math.ceil(data.length / this.state.perPage),
            data,
            searchVal: "",
            searchActive: false,
          },
          () => this.sortData(this.state.sortType)
        );
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
        <div className="container pb-5">
          <CovidHeader
            {...this.state}
            sortData={this.sortData}
            handleSortChange={this.handleSortChange}
            handleSubmit={this.handleSubmit.bind(this)}
            handleChange={this.handleChange}
            getData={this.getData.bind(this)}
            handleViewChange={this.handleViewChange}
            handleFilter={this.handleFilter.bind(this)}
          ></CovidHeader>
          <table className="table table-hover mx-auto bg-gray-100 mb-5">
            <thead className="thead-dark">
              <tr>
                {headers.map((header: string, index: number) => (
                  <th key={index} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
          <div className="text-center">
            {this.state.data.length} results, {this.state.pageCount} pages
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
