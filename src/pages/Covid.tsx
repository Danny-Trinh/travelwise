import React, { Component } from "react";
import CovidData from "../json/Covid.json";
import Axios from "axios";
// import Pagination from 'react-bootstrap/Pagination';
import Paginate from "react-paginate";

export default class Covid extends Component {
  state = {
    offset: 0,
    postData: [],
    perPage: 5,
    currentPage: 0,
    pageCount: 0,
  };
  componentDidMount() {
    this.receivedData();
  }
  async receivedData() {
    let json = await Axios.get(`https://jsonplaceholder.typicode.com/photos`);
    const dataChunk = CovidData.Countries.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = dataChunk.map((instance: any) => {
      const {
        Country,
        NewConfirmed,
        TotalConfirmed,
        NewDeaths,
        TotalDeaths,
        NewRecovered,
        TotalRecovered,
        Date,
      } = instance;
      return (
        <React.Fragment>
          <tr>
            <td>
              <a href="/">{Country}</a>
            </td>
            <td>US</td>
            <td>{NewConfirmed}</td>
            <td>{TotalConfirmed}</td>
            <td>{NewDeaths}</td>
            <td>{TotalDeaths}</td>
            <td>{NewRecovered}</td>
            <td>{TotalRecovered}</td>
            <td>{Date}</td>
          </tr>
        </React.Fragment>
      );
    });
    this.setState({
      pageCount: Math.ceil(json.data.length / this.state.perPage),
      postData,
    });
  }
  handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
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
            <tbody>{this.state.postData}</tbody>
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
        </div>
      </React.Fragment>
    );
  }
}
