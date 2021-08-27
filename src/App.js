import './App.css';
import RedashPlot from './PlotRedashData.js'
import "antd/dist/antd.css";


/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./Content.mdx'

function App() {
  return (
    <div className="App">
      <Content></Content>
      <RedashPlot/>
    </div>
  );
}

export default App;
