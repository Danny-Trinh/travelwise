import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Index from "./static_pages/index";
import Error from "./components/Error";
import Navbar from "./components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" component={this} exact></Route>
          <Route path="/page1" component={Index.Page1} exact></Route>
          <Route path="/page2" component={Index.Page2} exact></Route>
          <Route path="/page3" component={Index.Page3} exact></Route>
          <Route path="/page4" component={Index.Page4} exact></Route>
          <Route path="/page5" component={Index.Page5} exact></Route>
          <Route path="/page6" component={Index.Page6} exact></Route>
          <Route path="/page7" component={Index.Page7} exact></Route>
          <Route path="/page8" component={Index.Page8} exact></Route>
          <Route path="/page9" component={Index.Page9} exact></Route>
          <Route path="/page10" component={Index.Page10} exact></Route>
          <Route path="/page11" component={Index.Page11} exact></Route>
          <Route component={Error}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
