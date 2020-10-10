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
    this.getData();
  }

  async getData() {
    // IMPORTANT TODO!!!!!!
    // make api call like this when we actually have data
    // let json = await Axios.get(`https://jsonplaceholder.typicode.com/photos`);
    // use json.data instead of CovidData and voila
    const ostData = this.setState({
      pageCount: Math.ceil(CovidData.Countries.length / this.state.perPage),
      postData: CovidData.Countries,
    });
    console.log(this.state.postData[0]);
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
    let chunk = this.state.postData.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    let result = chunk.map((i: any) => {
      return (
        <React.Fragment>
          <tr>
            <td>
              <a href="/">{i.Country}</a>
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

          {/* <button onClick={() => this.sortByDate()}type="button" className="btn btn-success">
            Sort
          </button> */}
        </div>
      </React.Fragment>
    );
  }
}

// function calcCritical() {
//   if (randRange(1, 100) > 6) {
//     return 1;
//   } else {
//     return 2;
//   }
// }
// function compareNumbers(a, b) {
//   return a - b;
// }
