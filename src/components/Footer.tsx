import React, { Component } from "react";
export default class Footer extends Component {
  state = {
    searchQuery: "",
    searchActive: false,
  };

  // handles any changes in the navbar search
  handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    this.setState((prevstate) => {
      const newState: any = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-teal-700 ">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active text-white">
                  Contact Us: 914-737-9938 | 2100 Nueces Street Unit 714, Austin, TX 78705
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
