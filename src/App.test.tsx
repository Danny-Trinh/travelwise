import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import App from "./App";
import About from "./pages/About";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Covid from "./pages/Covid";
import Airports from "./pages/Airports";
// import CityDetail from "./components/CityDetail";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import MemberCard from "./components/MemberCard";

test("renders About page", () => {
  let fakeStateData = {
    // make the typescript warnings go brrrrr
    commits: 10,
    issues: 10,
    tests: 10,
    members: 10,
  };
  const component = render(<Router>{<About {...fakeStateData} />}</Router>);
  const element = component.getByText("About Page");
  expect(element).toBeInTheDocument();
});
test("renders Home page", () => {
  const component = render(<Home />);
  const element = component.getByText("Get Started");
  expect(element).toBeInTheDocument();
});
test("renders Cities page", () => {
  const component = render(<Cities />);
  const element = component.getByText("Political Freedom");
  expect(element).toBeInTheDocument();
});
test("renders Airports page", () => {
  const component = render(<Airports />);
  const element = component.getByText("Airport");
  expect(element).toBeInTheDocument();
});
test("renders Covid page", () => {
  const component = render(<Covid />);
  const element = component.getByText("Total Deaths");
  expect(element).toBeInTheDocument();
});
test("renders Navbar page", () => {
  const component = render(
    <Router>
      <Navbar />
    </Router>
  );
  const element = component.getByText("Travelwise");
  expect(element).toBeInTheDocument();
});
test("renders Error page", () => {
  const component = render(<Error />);
  const element = component.getByText(/404/);
  expect(element).toBeInTheDocument();
});
test("renders Member Card", () => {
  let fakeProps = {
    member: {
      image: "",
      name: "Danny",
      desc: "",
      jobs: "",
      gitlab: 10,
      commits: 10,
      issues: 10,
      tests: 10,
    },
  };
  const component = render(<MemberCard {...fakeProps} />);
  const element = component.getByText("Danny");
  expect(element).toBeInTheDocument();
});

// this test works, but just to be safe, I am ommiting it from turn in
// test("renders CityDetail instance", async () => {
//   const component = render(
//     <Router>
//       {<CityDetail match={{ params: { city: "Abuja", country_code: "NG" } }} />}
//     </Router>
//   );
//   const element = await component.findByText("Abuja");
//   expect(element).toBeInTheDocument();
// });
