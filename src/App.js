import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as Index from "./components/index";

function App() {
  return (
    <React.Fragment>
      <Router>
        <ul>
          <li>
            <Link to="/page1">Link 1</Link>
          </li>
          <li>
            <Link to="/page2">Link 2</Link>
          </li>
          <li>
            <Link to="/page3">Link 3</Link>
          </li>
          <li>
            <Link to="/page4">Link 4</Link>
          </li>
          <li>
            <Link to="/page5">Link 5</Link>
          </li>
          <li>
            <Link to="/page6">Link 6</Link>
          </li>
          <li>
            <Link to="/page7">Link 7</Link>
          </li>
          <li>
            <Link to="/page8">Link 8</Link>
          </li>
          <li>
            <Link to="/page9">Link 9</Link>
          </li>
          <li>
            <Link to="/page10">Link 10</Link>
          </li>
        </ul>
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
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
