import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import "antd/dist/antd.css";


/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./Content.mdx'
import Content2 from '!babel-loader!@mdx-js/loader!./Content2.mdx'



export default function App() {
  return (
      <div className="App">
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <Content />
          </Route>
          <Route path="/users">
            <Content2 />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  </div>
  );
}

function Home() {
  return <div>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
  </nav>
  </div>
}



