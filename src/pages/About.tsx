import React, { Component } from "react";
import Axios from "axios";
import { members, apps } from "../utility/data";
import Error from "../components/Error";
import Loading from "../components/Loading";
// import dockerIcon from "../images/dockerIcon.png";
// import postmanIcon from "../images/postmanIcon.png";
// import reactIcon from "../images/reactIcon.png";
// import bootstrapIcon from "../images/bootstrapIcon.png";
// import yarnIcon from "../images/yarnIcon.jpg";
// import gitlabIcon from "../images/gitlabIcon.png";
// import slackIcon from "../images/slackIcon.png";
// import amplifyIcon from "../images/amplifyIcon.png";
import MemberCard from "../components/MemberCard";

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
    tests: 0,
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
  // comment
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <Error />;
    }
    return (
      <React.Fragment>
        <div className="container-fluid bg-gray-200 pt-4 m-0 pb-5">
          <div className="container bg-gray-200">
            <h1 className="t-teal-700 text-center">What is Travelwise</h1>
            <p>
              This is Travelwise, a group dedicated to getting you from point A
              to point B as safely as possible in these uncertain times.
              Travelwise is an ideal platform for users to compare destinations
              by safety, location, and Covid statistics. A feature of Travelwise
              is providing users with up-to-date statistics on COVID in a given
              region. Travelwise streamlines the process of making travel plans,
              where users can search for destinations, airport and safety
              statistics all in the same place. Our intended users are
              middle-class travelers who are looking for statistics on places
              they would like to travel to.
            </p>
            <div className="row justify-content-center">
              <MemberCard member={members[0]}></MemberCard>
              <MemberCard member={members[1]}></MemberCard>
              <MemberCard member={members[2]}></MemberCard>
              <MemberCard member={members[3]}></MemberCard>
              <MemberCard member={members[4]}></MemberCard>
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
            <ul className="p-0" style={{ listStyleType: "none" }}>
              {apps.map((app: any, index: number) => (
                <li key={index}>
                  <a href={app.link}>
                    <img
                      src={app.pic}
                      alt={app.header}
                      style={{
                        width: "2rem",
                        marginRight: "1rem",
                      }}
                    ></img>
                    <strong>{app.header}</strong>
                  </a>
                  {app.text}
                </li>
              ))}
            </ul>
            <h2>REST API Sources</h2>
            <ul>
              <li>
                City Names:{" "}
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
                <a href="https://documenter.getpostman.com/view/12799472/TVYM5bPo">
                  https://documenter.getpostman.com/view/12799472/TVYM5bPo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
