import React, { Component } from "react";
export default class Dallas extends Component {
  render() {
    return (
      <div class="container">
        <div></div>
        <h2 className="text-center">Dallas</h2>
        <div className="card">
        <table class="table table-hover">
          <thead class="thead-dark">
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
              <td>Texas</td>
              <td>51</td>
              <td>70</td>
              <td>50</td>
              <td>50</td>
              <td>42</td>
              <td>50</td>
              <td>35</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
