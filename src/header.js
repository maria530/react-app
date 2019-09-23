import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './connect';

/* 
像这样的组件：
1.有大量重复逻辑 --- 需要用高阶组件
2.组件内部都依赖context，如果一个组件对外界的依赖过于强，那么这个组件的移植性就会很差。如果一个组件，只依赖于传入的props和自己
的state，也就是说像纯函数一样，给他什么，就渲染什么，这种组件的复用性是极强的。叫做Pure Component,也叫dumb component。感觉
呆呆的，让干啥就干啥。
高阶组件，我们起了一个名字，叫做connect,因为它把context和Dumb component连起来了
*/

class Header extends Component {

    /*
    static contextTypes = {
        store: PropTypes.object
    }

    
    constructor() {
        super();
        this.state = {
            themeColor: ''
        }
        this._updateThemeColor = this._updateThemeColor.bind(this);
    }

    componentDidMount() {
        const { store } = this.context;
        this._updateThemeColor();
        //挂载到元素上的时候，让这个组件订阅，当store中数据发生变化时候，会执行传入的函数，从而调用改组件的
        //setState方法，重新渲染页面
        
        store.subscribe(() => this._updateThemeColor());
    }

    _updateThemeColor() {
        const state = this.context.store.getState();
        this.setState({
            themeColor: state.themeColor
        })
    }
    */

    render() {
        return (
            <div>
                <h2 style={{ color: this.props.themeColor }}>React.js小书</h2>
                <div>{ this.props.themeName }</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        themeColor: state.themeColor,
        themeName: state.themeName
    }
}

export default connect(mapStateToProps)(Header);