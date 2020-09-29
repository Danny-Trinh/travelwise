import React, { Component } from "react";
import Axios from "axios";
import Danny from "../images/Danny.jpg";
import Mitchell from "../images/Mitchell.jpg";
import Max from "../images/Maximus.jpg";
import Jesse from "../images/Jesse.jpg";
import Adam from "../images/Adam.jpg";
import MemberCard from "../components/MemberCard";
const dannyDesc =
  "A Junior Web Developer that wanted to get into Artificial Intelligence but had too many React" +
  " projects on his resume. He now crys on every React project he works on.";
const adamDesc = "I like to play League";
const maxDesc = "AYE";
const mitchellDesc = "I like to do menly things but I also like to do men";
const jesseDesc = "I like to hide the bodies in my closet";

export default class page1 extends Component {
  state = {
    isLoading: false,
    error: null,
    members: [
      {
        name: "Mitchell Watkins",
        gitlab: "mitchellwatkins125",
        image: Mitchell,
        desc: mitchellDesc,
        jobs: "Full-Stack Developer",
      },
      {
        name: "Dung Trinh (Danny)",
        gitlab: "Danny-Trinh",
        image: Danny,
        desc: dannyDesc,
        jobs: "Full-Stack Developer",
      },
      {
        name: "Jesse Huang",
        gitlab: "jessehuang",
        image: Jesse,
        desc: adamDesc,
        jobs: "Full-Stack Developer",
      },
      {
        name: "Maximus Chu",
        gitlab: "maximuschu",
        image: Max,
        desc: maxDesc,
        jobs: "Full-Stack Developer",
      },
      {
        name: "Adam Gluch",
        gitlab: "amgluch",
        image: Adam,
        desc: jesseDesc,
        jobs: "Full-Stack Developer",
      },
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
            <MemberCard member={this.state.members[0]}></MemberCard>
            <MemberCard member={this.state.members[1]}></MemberCard>
            <MemberCard member={this.state.members[2]}></MemberCard>
          </div>
          <div className="row">
            <MemberCard member={this.state.members[3]}></MemberCard>
            <MemberCard member={this.state.members[4]}></MemberCard>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
