import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";



import ProHome from './ProHome';

const App = () => {

    return (
        <div>
            <Router basename="/react" >
                {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/">
                        <ProHome />
                    </Route>
                </Switch>
            </Router>
        </div>

    );
};

export default App;