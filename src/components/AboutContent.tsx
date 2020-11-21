import React from "react";
import { apps, apiSources } from "../utility/data";
import { FaGitlab } from "react-icons/fa";
import { SiPostman } from "react-icons/si";

// renders content of about page
export default function AboutLinks(props: any) {
  return (
    <React.Fragment>
      <h2 className="mt-4">Technologies Used</h2>
      <ul className="p-0 pl-3" style={{ listStyleType: "none" }}>
        {apps.map((app: any, index: number) => (
          <li key={index} className="mb-2">
            <a className="link" href={app.link}>
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
      <h2 className="mt-4">REST API Sources</h2>
      <ul className="p-0 pl-4" style={{ listStyleType: "none" }}>
        {apiSources.map((source: any, index: number) => (
          <li key={index} className="mb-2">
            <a className="link" href={source.link}>
              {source.icon}
              {source.header}
            </a>
          </li>
        ))}
      </ul>
      <h2 className="mt-4">Project Links</h2>
      <ul className="p-0 pl-4" style={{ listStyleType: "none" }}>
        <li className="mb-2">
          <FaGitlab className="mr-2 t-teal-700" />
          <a className="link" href="https://gitlab.com/Danny-Trinh/travelwise">
            https://gitlab.com/Danny-Trinh/travelwise
          </a>
        </li>
        <li>
          <SiPostman className="mr-2 t-teal-700" />
          <a
            className="link"
            href="https://documenter.getpostman.com/view/12799472/TVYM5bPo"
          >
            https://documenter.getpostman.com/view/12799472/TVYM5bPo
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
}
