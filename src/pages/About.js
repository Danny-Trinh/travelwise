import React, { Component } from "react";
import Axios from "axios";
import Danny from "../images/danny.jpg";
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
    "Mitchell Watkins": { gitlab: "mitchellwatkins125" },
    "Danny Trinh": { gitlab: "Danny-Trinh" },
    "Adam Gluch": { gitlab: "amgluch" },
    "Jesse Huang": { gitlab: "jessehuang" },
    "Maximus Chu": { gitlab: "maximuschu" },
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
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={Danny} alt="Card image cap"></img>
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
