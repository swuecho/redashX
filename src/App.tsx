import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";

import MyProTable from "./components/demo/ProEditTable";
import ExcelView from "./bestqa/Excel";

import { Card, Col, Row } from 'antd';

import ProHome from './ProHome';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}



function ViewExecl() {
    let query = useQuery();
    let name = query.get('name')
    let eid = query.get('eid')
    if (name && eid) {
        return <ExcelView name={name} eid={eid as unknown as number}></ExcelView>
    }
    return null;
}

export default () => {

    return (
        <div>
            <Router basename="/react" >
                {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <MyProTable />
                    </Route>
                    <Route path="/users">
                        <MyProTable />
                    </Route>
                    <Route path="/excel">
                        <ViewExecl></ViewExecl>
                    </Route>
                    <Route path="/table">
                        <MyProTable />
                    </Route>
                    <Route path="/">
                        <ProHome />
                    </Route>
                </Switch>
            </Router>
        </div>

    );
};