import React, { Component } from "react";
import './StaticStyles.css'
import GoogleMapReact from 'google-map-react';

export default class London extends Component {
  static defaultProps = {
    center: {
      lat: 51.57,
      lng: -0.80
    },
    zoom: 11
  };
  render() {
    return (
      <div className="container">
        <h2 className="text-center">London</h2>
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
        <img 
        className="photo"
        src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE2OTUzNX0"
        alt="lendnen"
        />
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCDLGn-VIAxyzFxcPlHYNy0VzY__2ySRJc' }}
          defaultCenter={London.defaultProps.center}
          defaultZoom={London.defaultProps.zoom}
        >
        </GoogleMapReact>
      </div>
      </div>
    );
  }
}
