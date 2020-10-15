import React, { Component } from "react";
import { Map, TileLayer } from "leaflet";

type State = {
  animate: boolean;
  latlng: {
    lat: number;
    lng: number;
  };
};

export default class AnimateExample extends Component<{}, State> {
  state = {
    animate: false,
    latlng: {
      lat: 51.505,
      lng: -0.09,
    },
  };

  handleClick = (e: any) => {
    this.setState({
      latlng: e.latlng,
    });
  };

  toggleAnimate = () => {
    this.setState({
      animate: !this.state.animate,
    });
  };

  render() {
    return <div>HIIII</div>;
  }
}
