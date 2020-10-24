import React, { Component } from "react";
// import CovidData from "../json/Covid.json";
import Axios from "axios";
// import Pagination from 'react-bootstrap/Pagination';
import Paginate from "react-paginate";
import { Link } from "react-router-dom";

export default class Covid extends Component {
  state = {
    offset: 0,
    data: [],
    perPage: 5,
    currentPage: 0,
    pageCount: 0,
    sortType: 0,
  };

  // componentDidMount() {
  //   this.getData();
  // }

  async componentDidMount() {
    // IMPORTANT TODO!!!!!!
    // make api call like this when we actually have data
    let json = await Axios.get(`https://api.travelwise.live/covid`);
    // use json.data instead of CovidData and voila
    this.setState({
      pageCount: Math.ceil(json.data.length / this.state.perPage),
      data: json.data,
    });
    this.sortData(1);
    console.log(json.data);
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
        <tr key={i.country_code} style={{ height: "8rem" }}>
          <td>
            <Link to={`/Covid/${i.country_code}`}>
              {getHighlightedText(i.country[0], "a")}
            </Link>
          </td>
          <td>{i.country_code}</td>
          <td>{i.new_cases}</td>
          <td>{i.total_cases}</td>
          <td>{i.new_deaths}</td>
          <td>{i.total_deaths}</td>
        </tr>
      );
    });
    return result;
  }

  sortData(sortInput: number) {
    // makes it so each consecutive click reverses/cancels the filter
    if (this.state.sortType === sortInput) sortInput *= -1;
    else if (this.state.sortType === -sortInput) sortInput = 1;
    this.setState({ sortType: sortInput });
    let reverse = sortInput < 0 ? -1 : 1; // reverse filter if needed
    let sortedData;
    switch (Math.abs(sortInput)) {
      case 1:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.country[0].localeCompare(obj2.country[0]);
        });
        break;
      case 2:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.new_cases - obj1.new_cases);
        });
        break;
      case 3:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.total_cases - obj1.total_cases);
        });
        break;
      case 4:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.new_deaths - obj1.new_deaths);
        });
        break;
      case 5:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.total_deaths - obj1.total_deaths);
        });
        break;
    }
    this.setState({ data: sortedData });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container m-4">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Country Code</th>
                <th scope="col">New Confirmed Cases</th>
                <th scope="col">Total Confirmed Cases</th>
                <th scope="col">New Deaths</th>
                <th scope="col">Total Deaths</th>
                {/* <th scope="col">New Recovered</th>
                <th scope="col">Total Recovered</th> */}
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
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
          <div className="btn-group-vertical">
            <button
              onClick={() => this.sortData(1)}
              className="btn btn-success"
            >
              Sort By Name
            </button>

            <button
              onClick={() => this.sortData(2)}
              className="btn btn-success"
            >
              Sort By New Deaths
            </button>
            <button
              onClick={() => this.sortData(3)}
              className="btn btn-success"
            >
              Sort By Total Deaths
            </button>
            <button
              onClick={() => this.sortData(4)}
              className="btn btn-success"
            >
              Sort By New Cases
            </button>
            <button
              onClick={() => this.sortData(5)}
              className="btn btn-success"
            >
              Sort By Total Cases
            </button>
          </div>
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
          return <span style={{ backgroundColor: "#ffb7b7" }}>{part}</span>;
        else return <span>{part}</span>;
      })}
    </span>
  );
}
