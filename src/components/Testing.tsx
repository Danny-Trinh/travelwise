import React, { Component } from "react";
import { LatLngTuple } from "leaflet";
import {
  Circle,
  CircleMarker,
  Map,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  TileLayer,
} from "react-leaflet";

const center: LatLngTuple = [0, 0];
const url: string = "styles/dtrinh403/ckgbqpaav1i1e19pjrjq33ish/tiles";
const access_token: string =
  "pk.eyJ1IjoiZHRyaW5oNDAzIiwiYSI6ImNrZ2JjczlwbDAzb3Myem1xbTBhMm52bngifQ.O7QWKvMIxecgJ7j53oZPOw";

export default class VectorLayersExample extends Component<{}> {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div id="randomDiv">
            hello
            <Map id="mapId" center={center} zoom={2} minZoom={1} maxZoom={1}>
              <TileLayer url="https://api.mapbox.com/styles/v1/dtrinh403/ckgbqpaav1i1e19pjrjq33ish/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHRyaW5oNDAzIiwiYSI6ImNrZ2JjczlwbDAzb3Myem1xbTBhMm52bngifQ.O7QWKvMIxecgJ7j53oZPOw"></TileLayer>
            </Map>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
