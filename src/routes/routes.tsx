import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Login } from "../components/login";
import Memoboards from "../components/memoboards";

export function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} key = {"root"}/>
                <Route path="/home" exact component={Memoboards} key = {"home"}/>
            </Switch>
        </Router>
    )
}