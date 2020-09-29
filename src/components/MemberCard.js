import React, { Component } from "react";
export default class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            style={{ height: "18rem" }}
            src={this.props.member.image}
            alt={this.props.member.name}
          ></img>
          <div className="card-body">
            <h5 className="card-title">{this.props.member.name}</h5>
            <p className="card-text">{this.props.member.desc}</p>
            <p className="card-text">{this.props.member.jobs}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Commits: </li>
            <li class="list-group-item">Issues: </li>
            <li class="list-group-item">Unit Tests: </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
