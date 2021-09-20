import CbSummary from './../../components/cb/summary.js'
import RedashPlot from "./../../components/redash/redashPlot";
import StarRating from "./../../components/learn/starRating.js";


function CbWatch() {
    return (
        <div>
            <StarRating stars={5} />
            <div className="text-center">
                <CbSummary />
            </div>
            <RedashPlot queryId={53} plotId={76}></RedashPlot>

            <RedashPlot queryId={31} plotId={46}></RedashPlot>

            <hr />
        </div >
    )

}

export default CbWatch;