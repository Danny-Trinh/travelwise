import React, { Component } from "react";
import CovidData from "../json/Covid.json";
// import Axios from "axios";
// import Pagination from 'react-bootstrap/Pagination';
import Paginate from "react-paginate";
import {Link} from "react-router-dom";

export default class Covid extends Component {
  state = {
    offset: 0,
    data: [],
    data2: [],
    perPage: 5,
    currentPage: 0,
    pageCount: 0,
    sortType: 1,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    // IMPORTANT TODO!!!!!!
    // make api call like this when we actually have data
    // let json = await Axios.get(
    //   `http://travelwisebackend.us-east-2.elasticbeanstalk.com/covid`
    // );
    // use json.data instead of CovidData and voila
    this.setState({
      pageCount: Math.ceil(CovidData.Countries.length / this.state.perPage),
      data: CovidData.Countries,
      // data2: json.data,
    });
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
    let result = chunk.map((i: any) => {
      return (
        <React.Fragment>
          <tr>
            <td>
              <Link to="/">{i.Country}</Link>
            </td>
            <td>{i.CountryCode}</td>
            <td>{i.NewConfirmed}</td>
            <td>{i.TotalConfirmed}</td>
            <td>{i.NewDeaths}</td>
            <td>{i.TotalDeaths}</td>
            <td>{i.NewRecovered}</td>
            <td>{i.TotalRecovered}</td>
            <td>{i.Date}</td>
          </tr>
        </React.Fragment>
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
          return reverse * obj1.Country.localeCompare(obj2.Country);
        });
        break;
      case 2:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.TotalConfirmed - obj1.TotalConfirmed);
        });
        break;
      case 3:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.TotalDeaths - obj1.TotalDeaths);
        });
        break;
      case 4:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.TotalRecovered - obj1.TotalRecovered);
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
                <th scope="col">New Recovered</th>
                <th scope="col">Total Recovered</th>
                <th scope="col">As of</th>
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
              Sort By TotalConfirmed
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
              Sort By Total Recovered
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
