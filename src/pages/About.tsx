import React, { Component } from "react";
import Axios from "axios";
import { members } from "../utility/data";
import Error from "../components/Error";
import AboutHeader from "../components/AboutHeader";
import AboutContent from "../components/AboutContent";
import Loading from "../components/Loading";

type myState = {
  commits: number;
  issues: number;
  tests: number;
  error: boolean;
  isLoading: boolean;
};

export default class page1 extends Component<myState> {
  state: myState = {
    commits: 0,
    issues: 0,
    tests: 59,
    error: false,
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const json = await Axios({
        method: "get",
        url:
          "https://gitlab.com/api/v4/projects/21350537/repository/commits?per_page=400",
      });
      let temp: any = members;
      for (let i = 0; i < members.length; i++) {
        temp[i]["commits"] = json.data.filter(
          (commit: any) =>
            commit.committer_email.localeCompare(members[i]["email"]) === 0
        ).length;
      }
      this.setState({
        members: temp,
        commits: json.data.length,
      });
    } catch (error) {
      this.setState({ error: true, isLoading: false });
    }
    try {
      const json = await Axios({
        method: "get",
        url: "https://gitlab.com/api/v4/projects/21350537/issues?per_page=200",
      });
      let temp: any = members;
      for (let i = 0; i < members.length; i++) {
        temp[i]["issues"] = json.data.filter(
          (issue: any) =>
            issue.author.username.localeCompare(members[i]["gitlab"]) === 0
        ).length;
      }
      this.setState({
        members: temp,
        issues: json.data.length,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error: true, isLoading: false });
    }
  }

  // renders about page
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <Error />;
    }
    return (
      <div className="container-fluid bg-gray-200 pt-4 m-0 pb-5">
        <div className="container bg-gray-200">
          <AboutHeader {...this.state}></AboutHeader>
          <AboutContent></AboutContent>
        </div>
      </div>
    );
  }
}
