import React from "react";
import RedashPlot from "../redash/redashPlot";


// query, id.
// plot configuration

function CbLessPlot() {

  return (
    <div className="redash_plot">
      <RedashPlot queryId={31} plotId={46}></RedashPlot>
    </div>

  );
}

export default CbLessPlot;