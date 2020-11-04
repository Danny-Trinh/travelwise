import React, { Component } from "react";
import Paginate from "react-paginate";
import { Link } from "react-router-dom";
import Axios from "axios";
import Select from "react-select";
const filterOptions = [
  { value: 1, label: "City" },
  { value: 2, label: "Country" },
  { value: 3, label: "Region" },
  { value: 4, label: "Overall" },
  { value: 5, label: "LGBTQ" },
  { value: 6, label: "Medical" },
  { value: 7, label: "Physical Harm" },
  { value: 8, label: "Political Freedom" },
  { value: 9, label: "Theft" },
  { value: 10, label: "Women" },
];
const orderOptions = [
  { value: 1, label: "Ascending" },
  { value: -1, label: "Descending" },
];
const countryOptions = [
  { value: "Argentina", label: "Argentina" },
  { value: "Brazil", label: "Brazil" },
  { value: "Canada", label: "Canada" },
  { value: "Columbia", label: "Columbia" },
  { value: "Egypt", label: "Egypt" },
  { value: "Ethiopia", label: "Ethiopia" },
  { value: "France", label: "France" },
  { value: "Germany", label: "Germany" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran", label: "Iran" },
  { value: "Italy", label: "Italy" },
  { value: "Japan", label: "Japan" },
  { value: "Mexico", label: "Mexico" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "People's Republic of China", label: "People's Republic of China" },
  { value: "Philippines", label: "Philippines" },
  { value: "Russia", label: "Russia" },
  { value: "South Africa", label: "South Africa" },
  { value: "South Korea", label: "South Korea" },
  { value: "Spain", label: "Spain" },
  { value: "Thailand", label: "Thailand" },
  { value: "Turkey", label: "Turkey" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States of America", label: "United States of America" },
  { value: "Vietnam", label: "Vietnam" },
];

export default class Cities extends Component {
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
  states = [];

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let json = await Axios.get(`https://api.travelwise.live/cities`);
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
        <tr key={i.city_id}>
          <td>
            <Link to={`/City/${i.name}/${i.country_code}`}>
              {getHighlightedText(i.name[0], this.state.searchVal)}
            </Link>
          </td>
          <td>{getHighlightedText(i.country[0], this.state.searchVal)}</td>
          <td>{getHighlightedText(i.region[0], this.state.searchVal)}</td>
          <td>{i.overall ? i.overall : 0}</td>
          <td>{i.lgbtq ? i.lgbtq : 0}</td>
          <td>{i.medical ? i.medical : 0}</td>
          <td>{i.physical ? i.physical : 0}</td>
          <td>{i.political ? i.political : 0}</td>
          <td>{i.theft ? i.theft : 0}</td>
          <td>{i.women ? i.women : 0}</td>
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

    let json = await Axios.get(`https://api.travelwise.live/cities`);

    const { searchVal } = this.state;
    let data = json.data.filter(
      (city: any) =>
        city.name[0].toLowerCase().includes(searchVal) ||
        city.country[0].toLowerCase().includes(searchVal) ||
        city.region[0].toLowerCase().includes(searchVal)
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      data,
      searchActive: true,
    });
    this.sortData(this.state.sortType);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container ">
          <h1 className="my-4">Cities </h1>
          <div className="row mb-3">
            <Select
              className="col-md-3"
              onChange={(x: any) => this.sortData(x.value)}
              options={filterOptions}
              placeholder="Sort by: City"
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
            <Select
              className="col-md-3 basic-multi-select"
              onChange={(e) => {}}
              placeholder="Filter: Country"
              options={countryOptions}
              isMulti
            />
            <form className="col-md-3" onSubmit={(e) => this.handleSubmit(e)}>
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
