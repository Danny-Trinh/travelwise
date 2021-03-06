import React from "react";
import { members } from "../utility/data";
import MemberCard from "../components/MemberCard";
type myProps = {
  commits: number;
  issues: number;
  tests: number;
};

// renders the header of the about page
export default function AboutHeader(props: myProps) {
  return (
    <React.Fragment>
      <h1 className="t-teal-700 text-center">Don't just travel, TravelWise!</h1>
      <p>
        This is Travelwise, a group dedicated to getting you from point A to
        point B as safely as possible in these uncertain times. Travelwise is an
        ideal platform for users to compare destinations by safety, location,
        and Covid statistics. Travelwise streamlines the process of making
        travel plans by allowing users to search for critical information all
        in one place. Our intended users are travelers curious about their
        destination and simply anyone who is curious about the travel data we
        provide.
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
          <strong>Commits</strong>: {props.commits}
        </li>
        <li>
          <strong>Issues</strong>: {props.issues}
        </li>
        <li>
          <strong>Unit Tests</strong>: {props.tests}
        </li>
      </ul>
    </React.Fragment>
  );
}
