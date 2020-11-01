import React, { Component } from "react";
// import CovidData from "../json/Covid.json";
import Axios from "axios";
import Paginate from "react-paginate";
import { Link } from "react-router-dom";
import Select from "react-select";
const filterOptions = [
  { value: 1, label: "Country" },
  { value: 2, label: "Country Code" },
  { value: 3, label: "New Cases" },
  { value: 4, label: "Total Cases" },
  { value: 5, label: "New Deaths" },
  { value: 6, label: "Total Deaths" },
];
const orderOptions = [
  { value: 1, label: "Ascending" },
  { value: -1, label: "Descending" },
];
export default class Covid extends Component {
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
    let json = await Axios.get(`https://api.travelwise.live/covid`);
    // use json.data instead of CovidData and voila
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
        <tr key={i.country_code}>
          <td>
            <Link to={`/Covid/${i.country_code}`}>
              {getHighlightedText(i.country[0], this.state.searchVal)}
            </Link>
          </td>
          <td>{getHighlightedText(i.country_code[0], this.state.searchVal)}</td>
          <td>{i.new_cases}</td>
          <td>{i.total_cases}</td>
          <td>{i.new_deaths}</td>
          <td>{i.total_deaths}</td>
        </tr>
      );
    });
    // this.setState({ pageCount: 5 });
    return result;
  }

  sortData(sortInput: number) {
    let reverse = this.state.sortOrder; // reverse filter if needed
    let sortedData;
    switch (sortInput) {
      case 1:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.country[0].localeCompare(obj2.country[0]);
        });
        break;
      case 2:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return (
            reverse * obj1.country_code[0].localeCompare(obj2.country_code[0])
          );
        });
        break;
      case 3:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.new_cases - obj1.new_cases);
        });
        break;
      case 4:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.total_cases - obj1.total_cases);
        });
        break;
      case 5:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.new_deaths - obj1.new_deaths);
        });
        break;
      case 6:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.total_deaths - obj1.total_deaths);
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

    let json = await Axios.get(`https://api.travelwise.live/covid`);
    // use json.data instead of CovidData and voila
    const { searchVal } = this.state;
    let data = json.data.filter(
      (covid: any) =>
        covid.country[0].toLowerCase().includes(searchVal) ||
        covid.country_code[0].toLowerCase().includes(searchVal)
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
        <div className="container ">
          <h1 className="my-4">Covid-19 </h1>
          <div className="row mb-3">
            <Select
              className="col-md-3"
              onChange={(x: any) => this.sortData(x.value)}
              options={filterOptions}
              placeholder="Sort by: Country"
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
                placeholder="Search Countries:"
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
          <table className="table table-hover mx-auto">
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
