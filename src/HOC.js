import React, { Component } from 'react';

export default (WrappedComponent, name) => {
    class HOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null
            }
        }

        componentWillMount() {
            const data = localStorage.getItem('myItem');
            this.setState({
                data
            })
        }

        render() {
            return (
                <WrappedComponent data={ this.state.data } />
            )
        }
    }
    return HOC;
}