import './App.css';
import RedashPlot from './PlotRedashData.js'
import Redash from './Redash.js'
import "antd/dist/antd.css";


/* eslint-disable import/no-webpack-loader-syntax */
import Content from '!babel-loader!@mdx-js/loader!./Content.mdx'

function App() {
  return (
    <div className="App">
      <Content></Content>
      <RedashPlot/>
      <Redash/>
    </div>
  );
}

export default App;
