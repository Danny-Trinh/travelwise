import React, { Component } from "react";
import Axios from "axios";
import Danny from "../images/Danny.jpg";
import Mitchell from "../images/Mitchell.jpg";
import Max from "../images/Maximus.jpg";
import Jesse from "../images/Jesse.jpg";
import Adam from "../images/Adam.jpg";
import MemberCard from "../components/MemberCard";
const names = [
  "Mitchell Watkins",
  "Danny Trinh",
  "Adam Gluch",
  "Jesse Huang",
  "Maximus Chu",
];
export default class page1 extends Component {
  state = {
    isLoading: false,
    error: null,
    testin: "aye",
    members: [
      { name: "Mitchell Watkins", gitlab: "mitchellwatkins125" },
      { name: "Dung Trinh (Danny)", gitlab: "Danny-Trinh" },
      { name: "Jesse Huang", gitlab: "jessehuang" },
      { name: "Maximus Chu", gitlab: "maximuschu" },
      { name: "Adam Gluch", gitlab: "amgluch" },
    ],
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const json = await Axios({
        method: "get",
        url: "https://gitlab.com/api/v4/projects/21350537/repository/commits",
        headers: { "PRIVATE-TOKEN": "AN4QaAJ4prpZTcDzJCxg" },
      });
      // let temp = this.state["Danny Trinh"];
      let numCommits = json.data.filter(
        (commit) => commit.committer_name.localeCompare("Danny-Trinh") === 0
      ).length;
      // // this.setState({ "Danny Trinh": temp });
      console.log(numCommits);
      let numCommits2 = json.data.filter(
        (commit) => commit.committer_name.localeCompare("amgluch") === 0
      ).length;
      // // this.setState({ "Danny Trinh": temp });
      console.log(numCommits2);
      console.log(json);
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
    // this.setState({ isLoading: true });
    // try {
    //   const json = await Axios({
    //     method: "get",
    //     url: "https://gitlab.com/api/v4/projects/21350537/issues",
    //     headers: { "PRIVATE-TOKEN": "AN4QaAJ4prpZTcDzJCxg" },
    //   });
    //   console.log(json);
    // } catch (error) {
    //   this.setState({ error, isLoading: false });
    // }
  }
  // comment
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <MemberCard image={Danny}></MemberCard>
            <MemberCard image={Jesse}></MemberCard>
            <MemberCard image={Max}></MemberCard>
          </div>
          <div className="row">
            <MemberCard image={Mitchell}></MemberCard>
            <MemberCard image={Adam}></MemberCard>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
