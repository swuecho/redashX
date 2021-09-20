import CbSummary from './../../components/cb/summary.js'
import RedashPlot from "./../../components/redash/redashPlot";
import StarRating from "./../../components/learn/starRating.js";


function CbWatch() {
    return (
        <div className="bg-white">
            <div className="p-10">
                <div className="text-center">
                    <h1> 可转债观察 </h1>
                    <StarRating stars={5} />
                    <CbSummary />
                </div>
                <RedashPlot queryId={53} plotId={76}></RedashPlot>

                <RedashPlot queryId={31} plotId={46}></RedashPlot>
            </div>
        </div >
    )

}

export default CbWatch;