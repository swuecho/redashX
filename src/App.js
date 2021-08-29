import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-card/dist/card.css';
import './App.css';
import "antd/dist/antd.css";


/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./Content.mdx'
import Content2 from '!babel-loader!@mdx-js/loader!./Content2.mdx'
import MyProTable from "./components/demo/ProEditTable";
import { Card, Col, Row } from 'antd';




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
          <Route path="/table">
            <MyProTable></MyProTable>
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
  return       <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={6}>
        <Card title="Card title" bordered={false}>
          <Link to="/table">Table</Link>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Card title" bordered={false}>
          <Link to="/about">About</Link>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Card title" bordered={false}>
          <Link to="/users">Users</Link>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Table" bordered={false} extra={ <a href="#">O</a>}>
          <Link to="/table">Table</Link>
        </Card>
      </Col>
    </Row>
  </div>
}



