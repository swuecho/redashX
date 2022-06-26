import RedashTable from "../../components/redash/redashTable";


function RedashTableDemo() {
    return (
        <div className="bg-white">
            <div className="p-10">
                <div className="text-center">
                    <h1>BestQA Latest Logins</h1>
                </div>
                <RedashTable queryId={41}></RedashTable>
            </div>
        </div >
    )

}

export default RedashTableDemo;