import React, { Component } from "react";
export default class page1 extends Component {
  async componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ isLoading: true });
      try {
        const json = await Axios({
          method: "get",
          url: "/api/user/",
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        });
        localStorage.setItem("username", json.data[0].username);
        localStorage.setItem("id", json.data[0].id);
        this.setState({
          logged_in: true,
          isLoading: false,
        });
        this.fetchPokemon();
      } catch (error) {
        this.setState({ error, isLoading: false });
      }
    }
  }
  render() {
    return <div>Page 1</div>;
  }
}
