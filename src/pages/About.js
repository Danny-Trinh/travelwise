import React, { Component } from "react";
import Axios from "axios";
export default class page1 extends Component {
  state = {
    isLoading: false,
    error: null,
    testin: "aye",
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const json = await Axios({
        method: "get",
        url: "https://gitlab.com/api/v4/projects/21350537/repository/commits",
        headers: { "PRIVATE-TOKEN": "AN4QaAJ4prpZTcDzJCxg" },
      });
      console.log(json);
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
    this.setState({ isLoading: true });
    try {
      const json = await Axios({
        method: "get",
        url: "https://gitlab.com/api/v4/projects/21350537/issues",
        headers: { "PRIVATE-TOKEN": "AN4QaAJ4prpZTcDzJCxg" },
      });
      console.log(json);
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div>{this.state.testin}</div>
      </React.Fragment>
    );
  }
}
