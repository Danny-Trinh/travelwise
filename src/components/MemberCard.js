import React, { Component } from "react";
export default class Navbar extends Component {
  render() {
    const {
      image,
      name,
      desc,
      jobs,
      gitlab,
      commits,
      issues,
      tests,
    } = this.props.member;
    return (
      <React.Fragment>
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            style={{ height: "18rem" }}
            src={image}
            alt={name}
          ></img>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text">{jobs}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Gitlab:</strong> {gitlab}
            </li>
            <li className="list-group-item">
              <strong>Commits:</strong> {commits}
            </li>
            <li className="list-group-item">
              <strong>Issues: </strong>
              {issues}
            </li>
            <li className="list-group-item">
              <strong>Unit Tests: </strong>
              {tests}
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
