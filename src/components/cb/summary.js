import { useRedashQueryData } from "../redash/redashData";
import moment from "moment";
import 'moment/locale/zh-cn'  // without this line it didn't work

// turn this into a component (Value), mimic Evidence.
export function getValueInFirstRow(data, name) {
        return Math.round(data['rows'][0][name] * 100) / 100 
}

// turn this in to a filter
export function formatTradeDate(date) {
        moment.locale('zh-cn')
        return moment(date, 'YYYYMMDD').format('ll');
}

export function CbWatch() {
        // render after useEffect function run?
        const priceData = useRedashQueryData(65);
        const less100Data = useRedashQueryData(66);
        // how to extact. 
        // average follow proData
        /*
        const [average, setAverage] = useState(0);

        useEffect(() => {
                setAverage(getValueInFirstRow(priceData, 'average'))
        }, [priceData]);
        */
        // how to tell react, do not render if data is not available
        if (priceData && less100Data) {
                return (
                        <div>
                                <p>
                                        {formatTradeDate(getValueInFirstRow(less100Data, 'trade_date'))},
                                        在 {getValueInFirstRow(less100Data, 'total')} 支可转债中， 一共有 {getValueInFirstRow(less100Data, 'less_100')} 破发。
                                        中位数{getValueInFirstRow(priceData, 'median')}，平均值{getValueInFirstRow(priceData, 'average')}。
                                </p>
                        </div>
                )
        }
        return null;
}

export default CbWatch;