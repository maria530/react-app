import React, { Component } from 'react';
import HOC from '../component/HOC';

class HOCPage extends Component {
    render() {
        return (
            <div>
                <p>Below is data from localstorage using HOC component</p>
                { this.props.data }
            </div>
        )
    }
}

export default HOC(HOCPage);