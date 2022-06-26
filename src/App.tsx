import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";

import MyProTable from "./components/demo/ProEditTable";
import Survey from "./bestqa/Survey";

import ExcelView from "./bestqa/Excel";

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

const App = () => {

    return (
        <div>
            <Router basename="/react" >
                {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
                <Switch>
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

export default App;