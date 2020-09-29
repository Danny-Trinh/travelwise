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
            alt="Card image cap"
          ></img>
          <div className="card-body">
            <h5 className="card-title">{this.props.member.name}</h5>
            <p className="card-text"></p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
