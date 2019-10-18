import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './component/provider';
import Route from './route';
import store from './redux/store';
import PropTypes from 'prop-types';


ReactDOM.render(
    <Provider store={ store }>
        <Route />
    </Provider>
    , document.getElementById('app'));


/**
 * summary:
 * React.js除了状态提升外，没有更好的办法帮助我们解决组件之间共享状态的问题。
 * 而使用全局变量context会让程序变得不可预测。
 * 通过Redux章节，我们知道store里面的内容是不可随意更改，而必须通过dispatch才能变更state
 * 所以我们尝试把Redux（store）和Context相结合：
 * 
 * 高级组件connect把组件中的重复逻辑取出，让connect直接跟context打交道
 * 
 * 每个组件需要的数据和需要触发的action都不一样，所以调整connect，让它接受两个参数 mapStateToProps
 * 和 mapDispatchToProps，分别告诉connect，这个组件需要什么state，需要触发什么action
 * 
 * 最后为了把所有关于context的代码完全从业务逻辑中清除掉，我们构建了Provider组件（之所以叫它Provider组件，
 * 是因为它给根组件提供了store）。Provider组件作为所有组件树的根节点，外界通过props给它提供store,它会把
 * store放到自己的context里面，子组件会通过connect组件获取到
 * 这也是为什么子组件想要获得redux里面的数据，需要通过connect来实现
 * 
 */
