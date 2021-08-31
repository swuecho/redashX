import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import 'antd/dist/antd.css';
import '@ant-design/pro-layout/dist/layout.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-card/dist/card.css';
import "antd/dist/antd.css";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
