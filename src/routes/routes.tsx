import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Home } from "../components/home";
import Memoboards from "../components/memoboards";

export function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/memoboards" exact component={Memoboards} />
            </Switch>
        </Router>
    )
}