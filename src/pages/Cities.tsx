import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Select from "react-select";
import highlight from "../utility/getHighlightedText";
import * as constants from "../utility/data";
import PaginateTool from "../components/PaginateTool";

export default class Cities extends Component {
  state = {
    offset: 0, // offset of pagination
    data: [], // cities data
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
    let json = await Axios.get(`https://api.travelwise.live/cities`);
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
        <tr key={i.city_id}>
          <td>
            <Link to={`/City/${i.name}/${i.country_code}`}>
              {this.state.searchActive
                ? highlight(i.name[0], this.state.searchVal)
                : i.name[0]}
            </Link>
          </td>
          <td>
            {this.state.searchActive
              ? highlight(i.country[0], this.state.searchVal)
              : i.country[0]}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(i.region[0], this.state.searchVal)
              : i.region[0]}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.overall ? i.overall : 0).toString(),
                  this.state.searchVal
                )
              : i.overall}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.lgbtq ? i.lgbtq : 0).toString(),
                  this.state.searchVal
                )
              : i.lgbtq}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.medical ? i.medical : 0).toString(),
                  this.state.searchVal
                )
              : i.medical}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.physical ? i.physical : 0).toString(),
                  this.state.searchVal
                )
              : i.physical}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.political ? i.political : 0).toString(),
                  this.state.searchVal
                )
              : i.political}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.theft ? i.theft : 0).toString(),
                  this.state.searchVal
                )
              : i.theft}
          </td>
          <td>
            {this.state.searchActive
              ? highlight(
                  (i.women ? i.women : 0).toString(),
                  this.state.searchVal
                )
              : i.women}
          </td>
          <td>
            <Link to={`/Covid/${i.country_code}`}>Link</Link>
          </td>
        </tr>
      );
    });
    return result;
  }

  // sorts data accordingly, does not make a fetch call
  sortData(sortInput: number) {
    let reverse = this.state.sortOrder; // reverse filter if needed
    let sortedData;
    switch (Math.abs(sortInput)) {
      case 1:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.name[0].localeCompare(obj2.name[0]);
        });
        break;
      case 2:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.country[0].localeCompare(obj2.country[0]);
        });
        break;
      case 3:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.region[0].localeCompare(obj2.region[0]);
        });
        break;
      case 4:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.overall - obj1.overall);
        });
        break;
      case 5:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.lgbtq - obj1.lgbtq);
        });
        break;
      case 6:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.medical - obj1.medical);
        });
        break;

      case 7:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.physical - obj1.physical);
        });
        break;
      case 8:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.political - obj1.political);
        });
        break;
      case 9:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.theft - obj1.theft);
        });
        break;
      case 10:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.women - obj1.women);
        });
        break;
    }
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

    let json = await Axios.get(`https://api.travelwise.live/cities`);

    const { searchVal } = this.state;
    let data = json.data.filter(
      (city: any) =>
        city.name[0].toLowerCase().includes(searchVal) ||
        city.country[0].toLowerCase().includes(searchVal) ||
        city.region[0].toLowerCase().includes(searchVal) ||
        (city.overall ? city.overall : 0).toString().includes(searchVal) ||
        (city.lgbtq ? city.lgbtq : 0).toString().includes(searchVal) ||
        (city.medical ? city.medical : 0).toString().includes(searchVal) ||
        (city.physical ? city.physical : 0).toString().includes(searchVal) ||
        (city.political ? city.political : 0).toString().includes(searchVal) ||
        (city.theft ? city.theft : 0).toString().includes(searchVal) ||
        (city.women ? city.women : 0).toString().includes(searchVal)
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
    let json = await Axios.get(`https://api.travelwise.live/cities`);
    if (filters && filters.length > 0) {
      let data = json.data.filter((airport: any) => {
        for (let i = 0; i < filters.length; i++)
          if (airport.country[0].localeCompare(filters[i].value) === 0)
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
  }

  render() {
    return (
      <React.Fragment>
        <div className="container ">
          <h1 className="my-4">Cities </h1>
          <div className="row">
            <Select
              className="col-md-3"
              onChange={(x: any) => this.sortData(x ? x.value : 1)}
              options={constants.citySortOptions}
              placeholder="Sort by: City"
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
              options={constants.cityOrderOptions}
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
              placeholder="Filter: Country"
              value={this.state.filters}
              options={constants.cityFilterOptions}
              isMulti
            />
          </div>
          <table className="table table-hover mx-auto bg-gray-100">
            <thead className="thead-dark">
              <tr>
                <th scope="col">City</th>
                <th scope="col">Country</th>
                <th scope="col">Region</th>
                <th scope="col">Overall</th>
                <th scope="col">LGBTQ</th>
                <th scope="col">Medical</th>
                <th scope="col">Physical Harm</th>
                <th scope="col">Political Freedom</th>
                <th scope="col">Theft</th>
                <th scope="col">Women</th>
                <th scope="col">Covid Stats</th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
          <PaginateTool
            pageCount={this.state.pageCount}
            perPage={this.state.perPage}
            handlePageClick={this.handlePageClick}
          />
        </div>
      </React.Fragment>
    );
  }
}
