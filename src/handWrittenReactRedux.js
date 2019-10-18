/**
 * 以下是手写的react-redux的创建过程  无法用import export的方式实现
    如需查看，可以更改文件名为index.js渲染这个文件
 */

/* 
以下是模拟react.js结合redux架构模式的一个实例。
在这个文件的同级目录下，有一个.html文件，body里面有两个元素
<div id="title"></div>
<div id="content"></div>
*/

/** appState代替的是react项目中的共享状态（也就是多个组件共享的数据内容） */
// const appState = {
//     title: {
//         text: 'this is title text',
//         color: 'red'
//     },
//     content: {
//         text: 'this is content text',
//         color: 'blue'
//     }
// }

/* 
每一个app通过createStore创造一个store实例，store是一个对象。对象有三个key
getState: 获取state
dispatch: 当需要更改共享状态时候，需要出发的一个函数。这个函数里面会调用stateChanger,根据state和传入的action对象，对state做实质的更改
subscribe: 如果没有订阅的方法，实例化的store.getState()拿到了更改后的数据，但是页面无法做到根据更新的数据
渲染页面，所以需要实例化store的时候，订阅，在dispatch方法里面，当监听到有更改之后，触发订阅时传入的具体渲染更新的函数
*/
function createStore(stateChanger) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = stateChanger(state ,action);// 通过在stateChanger函数里面返回一个新的对象，覆盖原来的state
        listeners.forEach((listener) => listener());
    }
    dispatch({});// 初始化state 为在stageChanger中state为null时候的值
    return { getState, dispatch, subscribe }

}

/* 为了提升渲染页面的性能，对于未发生变化的数据，不进行页面渲染，所以增加了newState和oldState进行对比，不一样才渲染 */
function renderApp(newAppState, oldAppState = {}) {
    if(newAppState === oldAppState) return;
    console.log(11);
    renderTitle(newAppState.title, oldAppState.title);
    renderContent(newAppState.content, oldAppState.content);
}

function renderTitle(newTitle, oldTitle = {}) {
    if(newTitle === oldTitle) return;
    console.log(22);
    const titleDom = document.getElementById('title');
    titleDom.innerHTML = newTitle.text;
    titleDom.style.color = newTitle.color;
}

function renderContent(newContent, oldContent = {}) {
    if(newContent === oldContent) return;
    console.log(33);
    const contentDom = document.getElementById('content');
    contentDom.innerHTML = newContent.text;
    contentDom.style.color = newContent.color;
}

/* 
其实质是react-redux里面的reducer函数，根据当前的state和传入的action对象，按照一定的逻辑，对state进行更改
同时每次更改，都是对oldState的浅复制之后再更改
此时如果数据发生变化，比如title对象的text改变了 通过oldState.title 和 newState.title的对比，就可以知道
因为浅复制，不是原来的地址引用
*/
/* 把appState和stateChanger结合到一起,stateChanger既充当了获取初始化数据的功能，也充当了生成更新数据的功能 */
/* 
到了这一步，stateChanger就是Redux架构中的reducer函数。reducer函数是一个纯函数。
之所以命名为reducer，是因为这个函数的实现结果和Array.reduce的这个方法比较类似
var array = [{ count:1 },{ count:4 }, { count:10 }, { count:6 }, { count:0 }]
array.reduce((a,b) => {
console.log(a,b);
if(a.count > b.count){ return a }
if(a.count < b.count){ return b }
}, { count: -100 })
返回结果是 { count: 10 }

另外一个例子：
var arr = [0, 1, 2, 3];
arr.reduce((a,b) => { return a+b }, 0)

Array.reduce方法的功能可以将数组中的多个项的数据整合到一起
而Redux中的功能是先浅复制这个对象，然后将新复制的对象的修改的属性值再整合到这个对象上，比较类似
*/
/* reducer只能是纯函数，功能就是负责初始化state 以及根据state和action计算具有共享结构的新的state */
function stateChanger(state, action) {
    if(!state) {
        return {
            title: {
                text: 'this is title text',
                color: 'red'
            },
            content: {
                text: 'this is content text',
                color: 'blue'
            }
        }
    }
    switch(action.type) {
        case 'UPDATE_TITLE_TEXT': 
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR': 
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default: //如果不能识别这个action类别（也就是action.type）,那么会把state原封不动地返回
            return state;
    }
}

const store = createStore(stateChanger);
let oldState = store.getState();
console.log('oldState:',oldState);
// store.subscribe(() => renderApp(store.getState()));
/* 但是从代码中可以看出，newState和oldState返回的结果其实都是对全局变量appState的操作，这样的话两个变量一定是相等的
多以是无法达到我们想要的对比title和content对象中的text和color的值的，这个时候用es6的一种写法，浅复制一个新的对象 */
/* 监听数据变化，重新渲染页面 */
store.subscribe(() => {
    const newState = store.getState();
    renderApp(newState, oldState);
    oldState = newState;
})
renderApp(store.getState()); // 首次渲染页面


store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'updated title text' });
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'yellow' });
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'purple' });

// renderApp(store.getState());