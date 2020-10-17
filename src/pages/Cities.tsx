import React, { Component } from "react";
import CityData from "../json/Cities.json";
import Paginate from "react-paginate";
import {Link} from "react-router-dom";

export default class Cities extends Component {
  state = {
    offset: 0,
    data: [],
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
    // let json = await Axios.get(`https://jsonplaceholder.typicode.com/photos`);
    // use json.data instead of CovidData and voila
    this.setState({
      pageCount: Math.ceil(CityData.Cities.length / this.state.perPage),
      data: CityData.Cities,
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
              <Link to="/">{i.city}</Link>
            </td>
            <td>{i.country}</td>
            <td>{i.region}</td>
            <td>{i.safetyScores.lgbtq}</td>
            <td>{i.safetyScores.medical}</td>
            <td>{i.safetyScores.overall}</td>
            <td>{i.safetyScores.physicalHarm}</td>
            <td>{i.safetyScores.politicalFreedom}</td>
            <td>{i.safetyScores.theft}</td>
            <td>{i.safetyScores.women}</td>
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
          return reverse * obj1.city.localeCompare(obj2.city);
        });
        break;
      case 2:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.country.localeCompare(obj2.country);
        });
        break;
      case 3:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.region.localeCompare(obj2.region);
        });
        break;
      case 4:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.safetyScores.lgbtq - obj1.safetyScores.lgbtq);
        });
        break;
      case 5:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.safetyScores.medical - obj1.safetyScores.medical);
        });
        break;
      case 6:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.safetyScores.overall - obj1.safetyScores.overall);
        });
        break;
      case 7:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.safetyScores.physicalHarm - obj1.safetyScores.physicalHarm);
        });
        break;
      case 8:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.safetyScores.politicalFreedom - obj1.safetyScores.politicalFreedom);
        });
        break;
      case 9:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.safetyScores.theft - obj1.safetyScores.theft);
        });
        break;
      case 10:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj2.safetyScores.women - obj1.safetyScores.women);
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
                <th scope="col">City</th>
                <th scope="col">Country</th>
                <th scope="col">Region</th>
                <th scope="col">LGBTQ</th>
                <th scope="col">Medical</th>
                <th scope="col">Overall</th>
                <th scope="col">Physical Harm</th>
                <th scope="col">Political Freedom</th>
                <th scope="col">Theft</th>
                <th scope="col">Women</th>
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
              Sort By Country
            </button>
            <button
              onClick={() => this.sortData(3)}
              className="btn btn-success"
            >
              Sort By Region
            </button>
            <button
              onClick={() => this.sortData(4)}
              className="btn btn-success"
            >
              Sort By LGBTQ Score
            </button>
            <button
              onClick={() => this.sortData(5)}
              className="btn btn-success"
            >
              Sort By Medical Score
            </button>
            <button
              onClick={() => this.sortData(6)}
              className="btn btn-success"
            >
              Sort By Overall Score
            </button>
            <button
              onClick={() => this.sortData(7)}
              className="btn btn-success"
            >
              Sort By Physical Harm Score
            </button>
            <button
              onClick={() => this.sortData(8)}
              className="btn btn-success"
            >
              Sort By Political Freedom Score
            </button>
            <button
              onClick={() => this.sortData(9)}
              className="btn btn-success"
            >
              Sort By Theft Score
            </button>
            <button
              onClick={() => this.sortData(10)}
              className="btn btn-success"
            >
              Sort By Women Score
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
