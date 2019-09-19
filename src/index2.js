import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import HOC from './HOC';

import * as serviceWorker from './serviceWorker';

class Index extends Component {
    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <div>
                <h2>This is header.</h2>
                <Title />
            </div>
        )
    }
}

class Title extends Component {
    render() {
        return (
            <div>react.js books</div>
        )
    }
}

class Main extends Component {
    render() {
        return (
            <div>
                <h2>This is Main.</h2>
                <Content />
            </div>
        )
    }
}

class Content extends Component {
    render() {
        return (
            <div>This is content text......</div>
        )
    }
}

// class Index extends Component {

//     render() {
//         return (
//             <BrowserRouter>
//                 <Switch>
//                     <Route path="/index" component={ Header } />
//                     <Route path="/home" component={ Tab } />
//                 </Switch>
//             </BrowserRouter>
            
//         )
//     }
// }

ReactDOM.render(
    <Index />, document.getElementById('root')
)



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
