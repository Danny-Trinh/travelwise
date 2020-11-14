import React, { Component } from "react";
export default function NavBar(props: any) {
  const {
    image,
    name,
    desc,
    jobs,
    gitlab,
    commits,
    issues,
    tests,
  } = props.member;
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
          <li className="list-group-item ">
            <p className="card-text">
              <strong>Role: </strong>
              {jobs}
            </p>
          </li>
          <li className="list-group-item ">
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
