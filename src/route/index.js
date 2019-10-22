import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
    Redirect
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
        const loggedIn = true;
        return (
            <Router basename="/appTest">
                <div>
                    <ul>
                        <li>
                            <Link to="/">Index</Link>
                        </li>
                        <li>
                            <NavLink to={{
                                pathname: '/staticPage',
                                search: '?sort=name',
                                hash: '#the-hash'
                            }} activeClassName="myLinkStyle">StaticPage</NavLink>
                        </li>
                        <li>
                            <NavLink exact strict to="/dynamicPage/" activeStyle={{
                                fontWeight: 'bold',
                                color: 'red'
                            }}>DynamicPage</NavLink>
                        </li>
                        <li>
                            <NavLink to="/hocPage" activeStyle={{
                                fontWeight: 'bold',
                                color: 'red'
                            }}>HOCPage</NavLink>
                        </li>
                    </ul>
                    <hr />
                    <Switch>
                        <Redirect sensitive from="/users/:id" to="/staticPage" />
                        <Route exact path="/" component={ Index } />
                        <Route exact path="/test" render={ () => {
                            return (
                                <div>This is test component content.</div>
                            )
                        } } />
                        <Route exact path="/staticPage"><StaticPage /></Route>
                        <Route exact path="/dynamicPage/"><DynamicPage /></Route>
                        <Route exact path="/hocPage">
                            { loggedIn ? <HOCPage /> : <Redirect to="/" /> }
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default ReactAppRoute;

/**
 * https://reacttraining.com/react-router/web/api/NavLink/activeclassname-string 
 * 关于react-router比较值得参考的文档
 * 1.BrowserRouter
 * 一般用作整个app的路由配置的组件
 * A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
 * 底层原理是使用h5的history API来执行的
 * a. basename属性： 所有location的base url。如果后端是从服务器的子目录提供service服务，那么前端需要给每一个链接都加上一个类似于项目的pathname
 * 此时使用basename会更简便很多
 * 
 * 
 * 2.NavLink: A special version of the <Link> that will add styling attributes to the rendered element when it matches the current URL.
 * 如果当前link的状态变为active,那么后面对应的style或者css样式就会展示
 *  a. strict这个属性的作用,顾名思义是严格一致activeClassName和activeStyle才会起作用
 * When true, a path that has a trailing slash will only match a location.pathname with a trailing slash. This has no effect when there are additional URL segments in the location.pathname.
 * path	   location.pathname	 matches?
    /one/	/one	                no
    /one/	/one/	                yes
    /one/	/one/two	            yes
    也就是说如果规定path属性的末尾带了slash斜杠，那么strict的作用就是只有当location.pathname一致并且location.pathname后面也有斜杠，activeClassName和activeStyle才起作用
    同时，这个activeClassName,对于location.pathname符合，斜杠也有，斜杠后面还有别的二级pathname的情况也会有作用，只是渲染的组件会更改成对应的组件，如果没有，就显示空白

    b. to这个属性的属性值有三种：string, object, function
    当是object的时候，访问该link的时候，pathname和在对象中设置的hash值都会出现在location的url中
    <NavLink exact strict to="/dynamicPage/" activeStyle={{
                                fontWeight: 'bold',
                                color: 'red'
                            }}>DynamicPage</NavLink>

    

    3.HashRouter
    hash router是用hash来进行页面切换的.现代浏览器不建议使用 
    原生js种可以用onhashchange来进行页面不同组件的切换
    表现方式为在url后面加上  #pathname （如果path="/staticPage",那么页面的后面会是 #/staticPage）


    4.Redirect类似于http请求的3××的response。to属性的值可以是string，也可以是object，和Link使用方法类似
    当访问一个路径，这个路径下面根据实际情况会再重定向
    比如，如果某个用户没有登陆，或者用户的token过期，那么重定向到登陆页面 就是用这个来实现
    <Route exact path="/hocPage">
        { loggedIn ? <HOCPage /> : <Redirect to="/" /> }
    </Route>
        
    from属性：  
    <Redirect from="/users/:id" to="/staticPage" />
    如果一个url符合from的值的path，那么会自动重定向到to的值所在的pathname
    如果页面有这个pathname，那么这个pathname对应的组件就会呈现在页面上

    sensitive属性：
    大小写是否敏感。如果加上了，那么就是大小写敏感。像下面的url配置，如果在页面上是 http://localhost:3000/appTest/Users/89
    那么不会渲染任何组件的内容
    <Redirect sensitive from="/users/:id" to="/staticPage" />


    5.Route组件
    Route组件是react-router中最重要的部分。作用是当当前location.pathname符合这个Route组件的path对应的值
    的时候，就会渲染Route组件内部的组件

    a.component属性：
    <Route exact path="/" component={ Index } />
    b.render属性：
    <Route exact path="/test" render={ () => {
                            return (
                                <div>This is test component content.</div>
                            )
    } } />
    render属性跟普通的react组件的render函数比较一样。也是一个函数，函数内部法妞一个jsx语法结构的内容
    c.children属性：
    未完待续
 */