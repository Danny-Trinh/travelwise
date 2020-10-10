import React, { Component } from "react";
import data from "../json/Cities.json";
export default class Cities extends Component {
  render() {
    return (
      <React.Fragment>
        {data.Cities.map((instance) => (
          <div>{instance.city}</div>
        ))}
      </React.Fragment>
    );
  }
}
