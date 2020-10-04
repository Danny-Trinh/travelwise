import React, { Component } from "react";
export default class NewYork extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center">New York</h2>
        <div className="card">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Region</th>
                <th scope="col">LGBTQ</th>
                <th scope="col">Medical</th>
                <th scope="col">Overall</th>
                <th scope="col">Physical Harm</th>
                <th scope="col">Political Freedom</th>
                <th scope="col">Theft</th>
                <th scope="col">Women</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>United States of America</td>
                <td>New York</td>
                <td>35</td>
                <td>73</td>
                <td>39</td>
                <td>30</td>
                <td>40</td>
                <td>27</td>
                <td>26</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}