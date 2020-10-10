import React, { Component } from "react";
import data from "../json/Covid.json";

export default class Covid extends Component {
  state = {
    pageCount: 2,
    perPage: 2,
  };

  render() {
    return (
      <React.Fragment>
        {data.Countries.map((instance) => (
          <div>{instance.Country}</div>
        ))}
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">Previous</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active">
            <span className="page-link">
              2<span className="sr-only">(current)</span>
            </span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
  handlePageClick = (data: any) => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
  };
}
