import React, { Component } from 'react';

class StaticPage extends Component {
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

export default StaticPage;