import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
type myProps = {
  data: any;
  latitude: number;
  longitude: number;
  zoom: number;
};

// renders map for instance pages
export default function MapRender(props: myProps) {
  return (
    <React.Fragment>
      <h1 className="my-5 text-center"> Map </h1>
      <div style={{ height: "20rem", width: "100%" }}>
        <Map
          center={[props.latitude, props.longitude]}
          className="mx-auto d-block"
          zoom={props.zoom}
          style={{
            width: "80%",
            height: "100%",
            borderRadius: "25px 25px 0px 25px",
          }}
          minZoom={3}
        >
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[props.latitude, props.longitude]}>
            <Popup>{props.data.country}</Popup>
          </Marker>
        </Map>
      </div>
    </React.Fragment>
  );
}
