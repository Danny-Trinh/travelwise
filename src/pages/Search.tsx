import React, { Component } from "react";
import Paginate from "react-paginate";
import { Link } from "react-router-dom";
import Axios from "axios";
import highlight from "../utility/getHighlightedText";

const perPage = 4;
const paginationSize = 8;
type myProps = { match: any };
export default class Search extends Component<myProps> {
  state = {
    searchQuery: "",
    dataC: [],
    dataCi: [],
    dataA: [],
    offsetC: 0,
    offsetCi: 0,
    offsetA: 0,
    currentPageC: 0,
    currentPageCi: 0,
    currentPageA: 0,
    pageCountC: 0,
    pageCountCi: 0,
    pageCountA: 0,
  };

  async componentDidMount() {
    let searchQuery = this.props.match.params.searchQuery;
    searchQuery = searchQuery ? searchQuery.toLowerCase() : "";
    let jsonC = await Axios.get(`https://api.travelwise.live/covid`);
    let dataC = jsonC.data;
    let jsonCi = await Axios.get(`https://api.travelwise.live/cities`);
    let dataCi = jsonCi.data;
    let jsonA = await Axios.get(`https://api.travelwise.live/airports`);
    let dataA = jsonA.data;

    if (searchQuery.localeCompare("") !== 0) {
      dataC = jsonC.data.filter(
        (covid: any) =>
          covid.country[0].toLowerCase().includes(searchQuery) ||
          covid.country_code[0].toLowerCase().includes(searchQuery) ||
          (covid.new_cases ? covid.new_cases : 0)
            .toString()
            .includes(searchQuery) ||
          (covid.total_cases ? covid.total_cases : 0)
            .toString()
            .includes(searchQuery) ||
          (covid.new_deaths ? covid.new_deaths : 0)
            .toString()
            .includes(searchQuery) ||
          (covid.total_deaths ? covid.total_deaths : 0)
            .toString()
            .includes(searchQuery)
      );
      dataCi = jsonCi.data.filter(
        (city: any) =>
          city.name[0].toLowerCase().includes(searchQuery) ||
          city.country[0].toLowerCase().includes(searchQuery) ||
          city.region[0].toLowerCase().includes(searchQuery) ||
          (city.overall ? city.overall : 0).toString().includes(searchQuery) ||
          (city.lgbtq ? city.lgbtq : 0).toString().includes(searchQuery) ||
          (city.medical ? city.medical : 0).toString().includes(searchQuery) ||
          (city.physical ? city.physical : 0)
            .toString()
            .includes(searchQuery) ||
          (city.political ? city.political : 0)
            .toString()
            .includes(searchQuery) ||
          (city.theft ? city.theft : 0).toString().includes(searchQuery) ||
          (city.women ? city.women : 0).toString().includes(searchQuery)
      );
      dataA = jsonA.data.filter(
        (airports: any) =>
          airports.airport_name[0].toLowerCase().includes(searchQuery) ||
          airports.iata_code[0].toLowerCase().includes(searchQuery) ||
          airports.city_name[0].toLowerCase().includes(searchQuery) ||
          airports.country_name[0].toLowerCase().includes(searchQuery) ||
          (airports.latitude ? airports.latitude : 0)
            .toString()
            .includes(searchQuery) ||
          (airports.longitude ? airports.longitude : 0)
            .toString()
            .includes(searchQuery) ||
          (airports.time_offset ? airports.time_offset : 0)
            .toString()
            .includes(searchQuery)
      );
    }
    this.setState({
      pageCountC: Math.ceil(dataC.length / perPage),
      pageCountA: Math.ceil(dataA.length / perPage),
      pageCountCi: Math.ceil(dataCi.length / perPage),
      dataC,
      dataA,
      dataCi,
      searchQuery,
    });
  }

  createPagination(pageCount: number, offset: string) {
    return (
      <Paginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={paginationSize}
        onPageChange={(e) => this.handlePageClick(e, offset)}
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
    );
  }

  handlePageClick = (e: any, offsetKey: string) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    this.setState({
      currentPage: selectedPage,
      [offsetKey]: offset,
    });
  };

  renderDataC() {
    let chunk = this.state.dataC.slice(
      this.state.offsetC,
      this.state.offsetC + perPage
    );
    let result: Array<any> = [];
    chunk.forEach((i: any) => {
      result.push(
        <tr key={i.country_code}>
          <td>
            <Link to={`/Covid/${i.country_code}`}>
              {highlight(i.country[0], this.state.searchQuery)}
            </Link>
          </td>
          <td>{highlight(i.country_code[0], this.state.searchQuery)}</td>
          <td>
            {highlight(
              (i.new_cases ? i.new_cases : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.total_cases ? i.total_cases : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.new_deaths ? i.new_deaths : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.total_deaths ? i.total_deaths : 0).toString(),
              this.state.searchQuery
            )}
          </td>
        </tr>
      );
    });
    return result;
  }
  renderDataCi() {
    let chunk = this.state.dataCi.slice(
      this.state.offsetCi,
      this.state.offsetCi + perPage
    );
    let result: Array<any> = [];
    chunk.forEach((i: any) => {
      result.push(
        <tr key={i.city_id}>
          <td>
            <Link to={`/City/${i.name}/${i.country_code}`}>
              {highlight(i.name[0], this.state.searchQuery)}
            </Link>
          </td>
          <td>{highlight(i.country[0], this.state.searchQuery)}</td>
          <td>{highlight(i.region[0], this.state.searchQuery)}</td>
          <td>
            {highlight(
              (i.overall ? i.overall : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.lgbtq ? i.lgbtq : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.medical ? i.medical : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.physical ? i.physical : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.political ? i.political : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.theft ? i.theft : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.women ? i.women : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            <Link to={`/Covid/${i.country_code}`}>Link</Link>
          </td>
        </tr>
      );
    });
    return result;
  }
  renderDataA() {
    let chunk = this.state.dataA.slice(
      this.state.offsetA,
      this.state.offsetA + perPage
    );
    let result: Array<any> = [];
    chunk.forEach((i: any) => {
      result.push(
        <tr key={`${i.iata_code}`}>
          <td>
            <Link to={`/Airport/${i.iata_code}`}>
              {highlight(i.airport_name[0], this.state.searchQuery)}
            </Link>
          </td>
          <td>{highlight(i.iata_code[0], this.state.searchQuery)}</td>
          <td>
            <Link to={`/City/${i.city_name}/${i.country_code}`}>
              {highlight(i.city_name[0], this.state.searchQuery)}
            </Link>
          </td>
          <td>{highlight(i.country_name[0], this.state.searchQuery)}</td>
          <td>
            {highlight(
              (i.latitude ? i.latitude : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.longitude ? i.longitude : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            {highlight(
              (i.time_zone ? i.time_zone : 0).toString(),
              this.state.searchQuery
            )}
          </td>
          <td>
            <Link to={`/Covid/${i.country_code}`}>Link</Link>
          </td>
        </tr>
      );
    });
    return result;
  }
  render() {
    return (
      <div className="container">
        <h1 className="my-4">Airports</h1>
        <table className="table table-hover bg-gray-100">
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
          <tbody>{this.renderDataA()}</tbody>
        </table>
        {this.createPagination(this.state.pageCountA, "offsetA")}
        <h1 className="my-4">Cities</h1>
        <table className="table table-hover bg-gray-100">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Cities</th>
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
          <tbody>{this.renderDataCi()}</tbody>
        </table>
        {this.createPagination(this.state.pageCountCi, "offsetCi")}
        <h1 className="my-4">Covid-19</h1>
        <table className="table table-hover bg-gray-100">
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
          <tbody>{this.renderDataC()}</tbody>
        </table>
        {this.createPagination(this.state.pageCountC, "offsetC")}
      </div>
    );
  }
}
