import React from "react";
import LinkedIn from "../images/LinkedIn.svg";

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
    linkedin,
  } = props.member;
  return (
    <React.Fragment>
      <div
        className="card"
        style={{ width: "16rem", margin: "1rem 1rem 1rem 1rem" }}
      >
        <img className="card-img-top" src={image} alt={name}></img>
        <div className="card-body">
          <a
            href={linkedin}
            style={{ display: linkedin.length ? "block" : "none" }}
          >
            <img
              src={LinkedIn}
              alt="LinkedIn"
              height={23}
              width={23}
              style={{
                position: "absolute",
                zIndex: 100,
                right: "15px",
              }}
            ></img>
          </a>
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{desc}</p>
        </div>
        <ul className="list-group list-group-flush">
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
