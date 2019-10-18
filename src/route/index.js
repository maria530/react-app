import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import StaticPage from '../page/staticPage';
import DynamicPage from '../page/dynamicPage';
import HOCPage from '../page/HOCPage';

import './index.css';

class Index extends Component {
    render() {
        return (
            <div>This is Index Component</div>
        )
    }
}

class ReactAppRoute extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Index</Link>
                        </li>
                        <li>
                            <Link to="/staticPage">StaticPage</Link>
                        </li>
                        <li>
                            <Link to="/dynamicPage">DynamicPage</Link>
                        </li>
                        <li>
                            <Link to="/hocPage">HOCPage</Link>
                        </li>
                    </ul>
                    <hr />
                    <Switch>
                        <Route exact path="/"><Index /></Route>
                        <Route exact path="/staticPage"><StaticPage /></Route>
                        <Route exact path="/dynamicPage"><DynamicPage /></Route>
                        <Route exact path="/hocPage"><HOCPage /></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default ReactAppRoute;