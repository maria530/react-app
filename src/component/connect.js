import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {

    /**mapStateToProps其实是告诉connect如何获取、整合状态 */
    /**mapDispatchToProps 用来告诉组件如何触发dispatch */
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor() {
            super();
            this.state = {
                allProps: {}
            }
        }

        componentDidMount() {
            const { store } = this.context;
            this._updateProps();
            /** 组件挂载到dom元素之后，订阅这个更新的方法，一旦发生有dispatch，那么就会重新执行setState，所有的组件都会重新render */
            store.subscribe(() => this._updateProps())
        }

        _updateProps() {
            const { store } = this.context;
            console.log('this:',this);
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {};
            let dispathProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {};
            this.setState({
                allProps: {
                    ...stateProps,//从state中生成的props
                    ...dispathProps,
                    ...this.props // 组件中既有的普通的props
                }
            })
        }

        render() {
            return (
                <WrappedComponent { ...this.state.allProps } />
            )
        }
    }
    return Connect;
}

