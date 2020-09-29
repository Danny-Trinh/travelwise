import React, { Component } from "react";
import Axios from "axios";
import Danny from "../images/Danny.jpg";
import Mitchell from "../images/Mitchell.jpg";
import Max from "../images/Maximus.jpg";
import Jesse from "../images/Jesse.jpg";
import Adam from "../images/Adam.jpg";
import MemberCard from "../components/MemberCard";
const dannyDesc =
  "Danny wanted to get into AI but ended up specializing in web development. He now cries on every React project he works on.";
const adamDesc = "Hi! I'm a senior that's into videogames, and playing the piano. I find joy in the little things like cleaning, basking in fresh air, or 12-hour debugging sessions.";
const maxDesc = "3rd Year CS Major";
const mitchellDesc = "You can't code away all your probelms in life ~_~";
const jesseDesc = "Jesse also wanted to get into AI but has pushed off learning any technologies for mobile development. Given enough free time he would make cool phone games.";

export default class page1 extends Component {
  state = {
    isLoading: false,
    error: null,
    commits: 0,
    issues: 0,
    tests: 0,
    members: [
      {
        name: "Mitchell Watkins",
        gitlab: "mitchellwatkins125",
        image: Mitchell,
        desc: mitchellDesc,
        jobs: "Full-Stack Developer",
        tests: 0,
      },
      {
        name: "Dung Trinh (Danny)",
        gitlab: "Danny-Trinh",
        image: Danny,
        desc: dannyDesc,
        jobs: "Full-Stack Developer",
        tests: 0,
      },
      {
        name: "Jesse Huang",
        gitlab: "jessehuang",
        image: Jesse,
        desc: jesseDesc,
        jobs: "Full-Stack Developer",
        tests: 0,
      },
      {
        name: "Maximus Chu",
        gitlab: "maximuschu",
        image: Max,
        desc: maxDesc,
        jobs: "Full-Stack Developer",
        tests: 0,
      },
      {
        name: "Adam Gluch",
        gitlab: "amgluch",
        image: Adam,
        desc: adamDesc,
        jobs: "Full-Stack Developer",
        tests: 0,
      },
    ],
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const json = await Axios({
        method: "get",
        url:
          "https://gitlab.com/api/v4/projects/21350537/repository/commits?per_page=200",
      });
      let temp = this.state.members;
      for (let i = 0; i < this.state.members.length; i++) {
        temp[i]["commits"] = json.data.filter(
          (commit) =>
            commit.committer_name.localeCompare(
              this.state.members[i]["gitlab"]
            ) === 0
        ).length;
      }
      this.setState({ members: temp, commits: json.data.length });
    } catch (error) {
      console.log(
        "NO STOP, WHY DO YOU BREAK OUR WEBSITE! (fetching data for gitlab commits not working)"
      );
    }
    this.setState({ isLoading: true });
    try {
      const json = await Axios({
        method: "get",
        url: "https://gitlab.com/api/v4/projects/21350537/issues?per_page=200",
        headers: { "PRIVATE-TOKEN": "AN4QaAJ4prpZTcDzJCxg" },
      });
      let temp = this.state.members;
      for (let i = 0; i < this.state.members.length; i++) {
        temp[i]["issues"] = json.data.filter(
          (issue) =>
            issue.author.username.localeCompare(
              this.state.members[i]["gitlab"]
            ) === 0
        ).length;
      }
      this.setState({ members: temp, issues: json.data.length });
    } catch (error) {
      console.log("fetching data for issues is not working");
    }
  }
  // comment
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1>About Page</h1>
          <p>
            This is travelwise, a group dedicated to getting you from point A to
            point B as safely as possible in these uncertain times. Travelwise
            is an ideal platform for users to compare destinations by safety,
            affordability, and more. A feature of Travelwise is providing users
            with up-to-date statistics on COVID in a given region. Travelwise
            streamlines the process of making travel plans, where users can
            search for destinations, corresponding flights, and hotels all in
            the same place. Our intended users are middle-class travelers who
            are looking for statistics on places they would like to travel to.
          </p>
          <div className="row justify-content-center">
            <MemberCard member={this.state.members[0]}></MemberCard>
            <MemberCard member={this.state.members[1]}></MemberCard>
            <MemberCard member={this.state.members[2]}></MemberCard>
            <MemberCard member={this.state.members[3]}></MemberCard>
            <MemberCard member={this.state.members[4]}></MemberCard>
          </div>
          <h2>Git Totals</h2>
          <ul>
            <li>
              <strong>Commits</strong>: {this.state.commits}
            </li>
            <li>
              <strong>Issues</strong>: {this.state.issues}
            </li>
            <li>
              <strong>Unit Tests</strong>: {this.state.tests}
            </li>
          </ul>
          <h2>Technologies Used</h2>
          <ul>
            <li>
              <strong>Bootstrap</strong> Creates a docker image that packages
              our tool-chain and dependencies into one container.
            </li>
            <li>
              <strong>Postman</strong>: Streamlines the creation and management
              of our API's{" "}
            </li>
            <li>
              <strong>React</strong>: Javascript Library developed by Facebook
              that modernizes website rendering and is used in our front-end
              design. We used Create-React-App as our framework since it is
              officially supported by Facebook.
            </li>
            <li>
              <strong>Bootstrap</strong>: Bootstrap is a extensive CSS framework
              and is used as our primary CSS data.
            </li>
            <li>
              <strong>Yarn</strong>: We use Yarn, a package manager, for our
              React App. It makes documenting and installing our dependencies
              easy and streamlined.
            </li>
            <li>
              <strong>Gitlab</strong>: GitLab is a web-based DevOps lifecycle
              tool that provides a Git-repository manager providing wiki,
              issue-tracking and continuous integration and deployment pipeline
              features. We use it to streamline our group workflow and git
              repositories.
            </li>

            <li>
              <strong>Slack</strong>: We've integrated slack to our GitLab repo,
              for communication purposes and issue tracking.
            </li>
            <li>
              <strong>AWS Amplify</strong>: AWS Amplify allows us to host
              websites by simply committing and pushing code to our Git
              Repository.
            </li>
          </ul>
          <h2>REST API Sources</h2>
          <ul>
            <li>
              City names:{" "}
              <a href="https://rapidapi.com/wirefreethought/api/geodb-cities?endpoint=5990a0b4e4b075a0d1d6da26">
                Documentation
              </a>
            </li>
            <li>
              Safety Stats:{" "}
              <a href="https://developers.amadeus.com/self-service/category/destination-content/api-doc/safe-place-api/api-reference">
                Documentation
              </a>
            </li>
            <li>
              CO-VID 19 Stats:{" "}
              <a href="https://documenter.getpostman.com/view/10808728/SzS8rjbc">
                Documentation
              </a>
            </li>
            <li>
              Flight Information:{" "}
              <a href="https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search/api-reference">
                Documentation
              </a>
            </li>
            <li>
              Hotel Information:{" "}
              <a href="https://developers.amadeus.com/self-service/category/hotel/api-doc/hotel-search/api-reference">
                Documentation
              </a>
            </li>
          </ul>
          <h2>Links</h2>
          <ul>
            <li>
              <strong>Gitlab</strong>:{" "}
              <a href="https://gitlab.com/Danny-Trinh/travelwise">
                https://gitlab.com/Danny-Trinh/travelwise
              </a>
            </li>
            <li>
              <strong>Postman</strong>:{" "}
              <a href="https://gitlab.com/Danny-Trinh/travelwise">
                Please replace this with the postman api
              </a>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
