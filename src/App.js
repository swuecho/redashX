import './App.css';
import "antd/dist/antd.css";


/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./Content.mdx'
import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from "./pdfDoc";


function App() {
  return (
    <div className="App">
      <Content></Content>
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

export default App;
