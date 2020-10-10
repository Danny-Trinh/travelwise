import React, { Component } from "react";
import './StaticStyles.css';
export default class Dallas extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center">Dallas</h2>
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
        <img 
        className="photo"
        src="https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE2OTUzNX0"
        alt="new"
        />
      </div>
    );
  }
}
