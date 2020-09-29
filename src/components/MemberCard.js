import React, { Component } from "react";
import Danny from "../images/danny.jpg";
export default class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src={this.props.image}
            alt="Card image cap"
          ></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
