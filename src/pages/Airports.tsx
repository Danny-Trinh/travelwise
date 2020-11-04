import React, { Component } from "react";
import Paginate from "react-paginate";
import { Link } from "react-router-dom";
import Axios from "axios";
import Select from "react-select";
const perPage = 9;
const filterOptions = [
  { value: 1, label: "Airport" },
  { value: 2, label: "Airport Code" },
  { value: 3, label: "City" },
  { value: 4, label: "Country" },
  { value: 5, label: "Latitude" },
  { value: 6, label: "Longitude" },
  { value: 7, label: "Timezone" },
];
const orderOptions = [
  { value: 1, label: "Ascending" },
  { value: -1, label: "Descending" },
];
const countryOptions = [
  { value: "ARGENTINA", label: "Argentina" },
  { value: "BAHAMAS", label: "Bahamas" },
  { value: "BRAZIL", label: "Brazil" },
  { value: "CAMBODIA", label: "Cambodia" },
  { value: "CANADA", label: "Canada" },
  { value: "CHILE", label: "Chile" },
  { value: "CHINA", label: "China" },
  { value: "COLUMBIA", label: "Columbia" },
  { value: "COSTA RICA", label: "Costa Rica" },
  { value: "CUBA", label: "Cuba" },
  { value: "EGYPT", label: "Egypt" },
  { value: "EL SALVADOR", label: "El Salvador" },
  { value: "ETHIOPIA", label: "Ethiopia" },
  { value: "FRANCE", label: "France" },
  { value: "GERMANY", label: "Germany" },
  { value: "GREECE", label: "Greece" },
  { value: "INDIA", label: "India" },
  { value: "INDONESIA", label: "Indonesia" },
  { value: "IRAN", label: "Iran" },
  { value: "ITALY", label: "Italy" },
  { value: "JAPAN", label: "Japan" },
  { value: "MALAYSIA", label: "Malaysia" },
  { value: "MEXICO", label: "Mexico" },
  { value: "NEW ZEALAND", label: "New Zealand" },
  { value: "NIGERIA", label: "Nigeria" },
  { value: "PAKISTAN", label: "Pakistan" },
  { value: "PAPUA NEW GUINEA", label: "Papua New Guinea" },
  { value: "PHILIPPINES", label: "Philippines" },
  { value: "RUSSIA", label: "Russia" },
  { value: "SAUDI ARABIA", label: "Saudi Arabia" },
  { value: "SOUTH AFRICA", label: "South Africa" },
  { value: "KOREA REPUBLIC OF", label: "South Korea" },
  { value: "SPAIN", label: "Spain" },
  { value: "THAILAND", label: "Thailand" },
  { value: "TURKEY", label: "Turkey" },
  { value: "UKRAINE", label: "Ukraine" },
  { value: "UNITED KINGDOM", label: "United Kingdom" },
  { value: "UNITED STATES OF AMERICA", label: "United States of America" },
  { value: "VENEZUELA", label: "Venezuela" },
  { value: "VIETNAM", label: "Vietnam" },
];

export default class Flights extends Component {
  state = {
    offset: 0,
    data: [],
    currentPage: 0,
    pageCount: 0,
    sortType: 1,
    sortOrder: 1,
    searchVal: "",
    searchActive: false,
    filters: null,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let json = await Axios.get(`https://api.travelwise.live/airports`);

    this.setState({
      pageCount: Math.ceil(json.data.length / perPage),
      data: json.data,
      searchActive: false,
      searchVal: "",
      filters: null,
    });
    this.sortData(this.state.sortOrder);
  }

  handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };

  renderData() {
    let chunk = this.state.data.slice(
      this.state.offset,
      this.state.offset + perPage
    );
    let result: Array<any> = [];
    chunk.forEach((i: any) => {
      result.push(
        <tr key={`${i.iata_code}`}>
          <td>
            <Link to={`/Airport/${i.iata_code}`}>
              {this.state.searchActive
                ? getHighlightedText(i.airport_name[0], this.state.searchVal)
                : i.airport_name[0]}
            </Link>
          </td>
          <td>
            {this.state.searchActive
              ? getHighlightedText(i.iata_code[0], this.state.searchVal)
              : i.iata_code[0]}
          </td>
          <td>
            <Link to={`/City/${i.city_name}/${i.country_code}`}>
              {this.state.searchActive
                ? getHighlightedText(i.city_name[0], this.state.searchVal)
                : i.city_name[0]}
            </Link>
          </td>
          <td>
            {this.state.searchActive
              ? getHighlightedText(i.country_name[0], this.state.searchVal)
              : i.country_name[0]}
          </td>
          <td>{i.latitude}</td>
          <td>{i.longitude}</td>
          <td>{i.time_offset}</td>
          <td>
            <Link to={`/Covid/${i.country_code}`}>Link</Link>
          </td>
        </tr>
      );
    });
    return result;
  }
  sortData(sortInput: number) {
    let reverse = this.state.sortOrder; // reverse filter if needed
    let sortedData;
    switch (Math.abs(sortInput)) {
      case 1:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return (
            reverse * obj1.airport_name[0].localeCompare(obj2.airport_name[0])
          );
        });
        break;
      case 2:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.iata_code[0].localeCompare(obj2.iata_code[0]);
        });
        break;
      case 3:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.city_name[0].localeCompare(obj2.city_name[0]);
        });
        break;
      case 4:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return (
            reverse * obj1.country_name[0].localeCompare(obj2.country_name[0])
          );
        });
        break;
      case 5:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.latitude - obj1.latitude);
        });
        break;
      case 6:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.longitude - obj1.longitude);
        });
        break;
      case 7:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return (
            reverse * obj1.time_offset[0].localeCompare(obj2.time_offset[0])
          );
        });
        break;
    }
    this.setState({ data: sortedData, sortType: sortInput });
  }
  handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    this.setState((prevstate) => {
      const newState: any = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  async handleSubmit(e: any) {
    e.preventDefault();

    let json = await Axios.get(`https://api.travelwise.live/airports`);
    const { searchVal } = this.state;
    let data = json.data.filter(
      (airports: any) =>
        airports.airport_name[0].toLowerCase().includes(searchVal) ||
        airports.iata_code[0].toLowerCase().includes(searchVal) ||
        airports.city_name[0].toLowerCase().includes(searchVal) ||
        airports.country_name[0].toLowerCase().includes(searchVal)
    );
    this.setState({
      pageCount: Math.ceil(data.length / perPage),
      data,
      searchActive: true,
      filters: null,
    });
    this.sortData(this.state.sortType);
  }
  async handleFilter(filters: any) {
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
        pageCount: Math.ceil(data.length / perPage),
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
        <div className="container">
          <h1 className="my-4">Airports </h1>
          <div className="row">
            <Select
              className="col-md-3"
              onChange={(x: any) => this.sortData(x ? x.value : 1)}
              options={filterOptions}
              placeholder="Sort by: Airport"
              isClearable
            />
            <Select
              className="col-md-3"
              onChange={(x: any) => {
                this.setState({ sortOrder: x.value }, () =>
                  this.sortData(this.state.sortType)
                );
              }}
              placeholder="Order: Ascend"
              options={orderOptions}
            />
            <form className="col-md-5" onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                value={this.state.searchVal}
                placeholder="Search:"
                className="form-control"
                name="searchVal"
                onChange={(e) => this.handleChange(e)}
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
            <div className="col-md-6"></div>
            <Select
              className="col-md-5"
              onChange={(x: any) => this.handleFilter(x)}
              placeholder="Filter: Country"
              value={this.state.filters}
              options={countryOptions}
              isMulti
            />
          </div>
          <table className="table table-hover mx-auto bg-gray-100">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Airport</th>
                <th scope="col">Airport Code</th>
                <th scope="col">City</th>
                <th scope="col">Country</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                <th scope="col">Timezone</th>
                <th scope="col">Covid Stats</th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>
        <Paginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={perPage}
          onPageChange={this.handlePageClick}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </React.Fragment>
    );
  }
}
function getHighlightedText(text: string, highlight: string) {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => {
        if (part.toLowerCase() === highlight.toLowerCase())
          return (
            <span key={i} style={{ backgroundColor: "#ffb7b7" }}>
              {part}
            </span>
          );
        else return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
