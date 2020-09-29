import React, { Component } from "react";
export default class London extends Component {
  render() {
    return (
      <div class="container">
        <h2 className="text-center">London</h2>
        <table class="table">
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
              <td>United Kingdom</td>
              <td>England</td>
              <td>39</td>
              <td>Unlisted</td>
              <td>42</td>
              <td>39</td>
              <td>26</td>
              <td>36</td>
              <td>38</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
