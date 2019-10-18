import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Provider extends Component {

    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    }

    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        console.log('this.props.children: ',this.props.children);
        /**
         * this.props.children指的是被Provider组件所包裹的组件元素，在本项目中指的是Home组件
         */
        return (
            <div>{ this.props.children }</div>
        )
    }
}

