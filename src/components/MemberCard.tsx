import React, { Component } from "react";
type myProps = {
  member: {
    image: any;
    name: string;
    desc: string;
    jobs: string;
    gitlab: number;
    commits: number;
    issues: number;
    tests: number;
  };
};
export default class Navbar extends Component<myProps> {
  render() {
    const {
      image,
      name,
      desc,
      jobs,
      gitlab,
      commits,
      issues,
      tests,
    } = this.props.member;
    return (
      <React.Fragment>
        <div
          className="card"
          style={{ width: "16rem", margin: "1rem 1rem 1rem 1rem" }}
        >
          <img className="card-img-top" src={image} alt={name}></img>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{desc}</p>
          </div>
          <ul className="list-group list-group-flush ">
            <li className="list-group-item bg-light">
              <p className="card-text">
                <strong>Role: </strong>
                {jobs}
              </p>
            </li>
            <li className="list-group-item bg-light">
              <strong>Gitlab:</strong> {gitlab}
              <ul>
                <li>
                  {"Commits: "} {commits}
                </li>
                <li>
                  {"Issues: "}
                  {issues}
                </li>
                <li>
                  {"Unit Tests: "}
                  {tests}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
