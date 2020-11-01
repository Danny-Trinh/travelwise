import React, { Component } from "react";
import Paginate from "react-paginate";
import { Link } from "react-router-dom";
import Axios from "axios";
import Select from "react-select";
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

export default class Flights extends Component {
  state = {
    offset: 0,
    data: [],
    perPage: 9,
    currentPage: 0,
    pageCount: 0,
    sortType: 1,
    sortOrder: 1,
    searchVal: "",
    searchActive: false,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    // IMPORTANT TODO!!!!!!
    // make api call like this when we actually have data
    let json = await Axios.get(`https://api.travelwise.live/airports`);

    this.setState({
      pageCount: Math.ceil(json.data.length / this.state.perPage),
      data: json.data,
      searchActive: false,
      searchVal: "",
    });
    this.sortData(this.state.sortOrder);
  }

  handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };

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
            <Link to={`/Airport/${i.iata_code}`}>{getHighlightedText(i.airport_name[0], this.state.searchVal)}</Link>
          </td>
          <td>{getHighlightedText(i.iata_code[0], this.state.searchVal)}</td>
          <td>
            <Link to={`/City/${i.city_name}/${i.country_code}`}>
            {getHighlightedText(i.city_name[0], this.state.searchVal)}
            </Link>
          </td>
          <td>{getHighlightedText(i.country_name[0], this.state.searchVal)}</td>
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
      pageCount: Math.ceil(data.length / this.state.perPage),
      data,
      searchActive: true,
    });
    this.sortData(this.state.sortType);
  }
  cancelSearch() {
    this.getData();
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
        <h1 className="my-4">Airports </h1>
          <div className="row mb-3">
            <Select
              className="col-md-3"
              onChange={(x: any) => this.sortData(x.value)}
              options={filterOptions}
              placeholder="Sort by: Airport"
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
            <form className="col-md-4" onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                value={this.state.searchVal}
                placeholder="Search Locations:"
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
          <div className="card">
          <table className="table table-hover mx-auto">
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
          <div className="row mb-3"></div>
          <Paginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={this.state.perPage}
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
        </div>
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