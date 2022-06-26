import RedashPlot from "./../../components/redash/redashPlot";


function SurveyPerformance() {
    return (
        <div className="bg-white">
            <div className="p-10">
                <div className="text-center">
                    <h1>BestQA performance</h1>
                </div>
                <RedashPlot queryId={56} plotId={82}></RedashPlot>
                <RedashPlot queryId={55} plotId={83}></RedashPlot>
            </div>
        </div >
    )

}

export default SurveyPerformance;