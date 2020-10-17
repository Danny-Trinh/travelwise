import React, { Component } from "react";
import FlightsData from "../json/Flights.json";
import Paginate from "react-paginate";
import {Link} from "react-router-dom";

export default class Flights extends Component {
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
      pageCount: Math.ceil(FlightsData.Flights.length / this.state.perPage),
      data: FlightsData.Flights,
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
            <td>{i.itineraries[0].segments[0].departure.iataCode}</td>
            <td>{i.itineraries[0].segments[0].departure.terminal}</td>
            <td>{i.itineraries[0].segments[i.itineraries[0].segments.length-1].arrival.iataCode}</td>
            <td>{i.itineraries[0].segments[i.itineraries[0].segments.length-1].arrival.terminal}</td>
            <td>{i.oneWay.toString()}</td>
            <td>{i.price.total}</td>
            <td>{i.numberOfBookableSeats}</td>
            <td>{i.itineraries[0].segments[0].departure.at}</td>
            <td>{i.itineraries[0].segments[i.itineraries[0].segments.length-1].arrival.at}</td>
            
            <td><Link to="/">More Information</Link></td>
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
          return reverse * obj1.itineraries[0].segments[0].departure.iataCode.localeCompare(obj2.itineraries[0].segments[0].departure.iataCode);
        });
        break;
      case 2:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.itineraries[0].segments[obj1.itineraries[0].segments.length-1].arrival.iataCode.localeCompare(obj2.itineraries[0].segments[obj2.itineraries[0].segments.length-1].arrival.iataCode);
        });
        break;
      case 3:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj1.price.total - obj2.price.total);
        });
        break;
      case 4:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * (obj1.numberOfBookableSeats - obj2.numberOfBookableSeats);
        });
        break;
      case 5:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.itineraries[0].segments[0].departure.at.localeCompare(obj2.itineraries[0].segments[0].departure.at);
        });
        break;
      case 6:
        sortedData = this.state.data.sort((obj1: any, obj2: any) => {
          return reverse * obj1.itineraries[0].segments[obj1.itineraries[0].segments.length-1].arrival.at.localeCompare(obj2.itineraries[0].segments[obj2.itineraries[0].segments.length-1].arrival.at);
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
                <th scope="col">Departure Location</th>
                <th scope="col">Departure Terminal</th>
                <th scope="col">Destination</th>
                <th scope="col">Destination Terminal</th>
                <th scope="col">One-way?</th>
                <th scope="col">Price</th>
                <th scope="col">Seats Remaining</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">More Information</th>
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
              Sort By Departure Location
            </button>

            <button
              onClick={() => this.sortData(2)}
              className="btn btn-success"
            >
              Sort By Destination
            </button>
            <button
              onClick={() => this.sortData(3)}
              className="btn btn-success"
            >
              Sort By Price
            </button>
            <button
              onClick={() => this.sortData(4)}
              className="btn btn-success"
            >
              Sort By Number of Bookable Seats
            </button>
            <button
              onClick={() => this.sortData(5)}
              className="btn btn-success"
            >
              Sort By Departure Time
            </button>
            <button
              onClick={() => this.sortData(6)}
              className="btn btn-success"
            >
              Sort By Arrival Time
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
