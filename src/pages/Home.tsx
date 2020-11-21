import React, { Component } from "react";
import HomeTop from "../components/HomeTop";
import HomeMid from "../components/HomeMid";
import HomeBottom from "../components/HomeBottom";

export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid p-0">
        <HomeTop></HomeTop>
        <HomeMid></HomeMid>
        <HomeBottom></HomeBottom>
      </div>
    );
  }
}
