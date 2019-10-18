import React, { Component } from 'react';
import Header from '../component/header';
import Content from '../component/content';

class DynamicPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

export default DynamicPage;