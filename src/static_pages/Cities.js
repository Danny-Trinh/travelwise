import React, { Component } from "react";
export default class page1 extends Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col">
            <h1>Destination Cities</h1>
          </div>
          <div className="col-3">
            <form className="form-inline">
              <div className="form-group row">
                <input
                  placeholder="Search for City"
                  class="form-control mt-2 mr-sm-2"
                ></input>
                <a className="btn btn-primary mt-2">Search</a>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-3">
            <select className="form-control">
              <option value="">Name</option>
              <option value="">Elevation Meters</option>
              <option value="">LBGTQ Score</option>
              <option value="">Medical Score</option>
              <option value="">Overall Safety Score</option>
              <option value="">Physical Harm Score</option>
              <option value="">Political Freedom Score</option>
            </select>
          </div>
        </div>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">City</th>
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
              <td><a href="/Dallas">Dallas</a></td>
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
            <tr>
              <td><a href="/NewYork">New York</a></td>
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
            <tr>
              <td><a href="/London">London</a></td>
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
