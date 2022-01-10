import React, { useState, useCallback, useMemo, useEffect, useContext, useRef } from 'react';
import { Select, Modal } from 'antd';
import { createStore } from 'redux';
import useAsync from '../constant/useAsync';

import articles from '../constant/articles';
import categories from '../constant/categories';
import articleData from '../constant/articleData';
import users from '../constant/userData';
import comments from '../constant/comments';
import userList from '../constant/userList';
import faker, { database } from 'faker';

const { Option } = Select;

// class Comp extends React.PureComponent {
//   render() {
//     console.log('child component is called');
//     return <h1>{this.props.value}</h1>
//   }
// }

// class App extends React.Component {
//   state = {
//     color: 'black'
//   }

//   render() {
//     return (
//       <div style={{ color: this.state.color }}>
//         <Comp value="Be Real" />
//         <button onClick={
//           () => this.setState({ color: 'green' })
//         }>change color</button>
//       </div>
//     )
//   }
// }

//  counter:
// export default function () {
//   const [count, setCount] = useState(0);

//   return (
//     <button onClick={ () => setCount(count + 1) }>
//       <span style={{ color: count > 10 ? 'red' : 'green' }}>{count}</span>
//       "Hello"
//     </button>
//   )
// }

//  UserList:
/*
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchUsers = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers([{
        id: '1',
        name: 'Lili'
      }, {
        id: 2,
        name: 'xiaoming'
      }, {
        id: 3,
        name: 'Lucy'
      }])
      setLoading(false);
    }, 3000)
  }

  return (
    <div className="userList">
      <button onClick={ fetchUsers }>{ loading ? "Loading..." : 'Show users' }</button>
      { error && <div style={{ color: 'red' }}>Failed</div> }
      <br />
      <ul>
      {
        users && users.length > 0 && users.map(item => {
          return <li key={ item.id }>{ item.name }</li>
        })
      }
      </ul>
    </div>
  )
}
*/
// SearchUserList:
/*
export default function SearchUserList() {
  const [users, setUsers] = useState(null);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setUsers([{
        id: 1,
        name: 'lili'
      }, {
        id: 2,
        name: 'haha'
      }, {
        id: 3,
        name: 'Lucy'
      }, {
        id: 4,
        name: 'xiaoming'
      }, {
        id: 5,
        name: 'Jane'
      }])
    }, 4000)
  }, [])

  const usersToShow = useMemo(() => {
    if(!users) {
      return null;
    }
    return users.filter((item) => {
      return item.name.indexOf(searchKey) > -1;
    })
  }, [users, searchKey])

  return (
    <div>
      <input value={ searchKey } onChange={ (e) => setSearchKey(e.target.value)} />
      <ul>
        {
          usersToShow && usersToShow.length > 0 && usersToShow.map((item) => {
            return <li key={ item.id }>{ item.name }</li>
          })
        }
      </ul>
    </div>
  )

}
*/
// useContext 实现切换theme的功能：
/*
const themes = {
  light: {
    foreground: '#000',
    background: '#eee'
  },
  dark: {
    foreground: '#fff',
    background: '#222'
  }
}
// 先创建一个context的容器
const MyThemeContext = React.createContext(themes.light);

function ToolBar() {
  const theme = useContext(MyThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>I am styled by theme context</button>
  )
}


export default function() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = useCallback(() => {
    setTheme((theme) => {
      return theme == 'light' ? 'dark' : 'light';
    })
  }, [])

  return (
  <MyThemeContext.Provider value={ themes[theme] }>
      <button onClick={ toggleTheme }>Toggle theme</button>
      <br />
      <ToolBar />
  </MyThemeContext.Provider>
  )
}
*/

// useContext 实现context容器
/*
const themes = {
  light: {
    foreground: '#000',
    background: '#eee'
  },
  dark: {
    foreground: '#fff',
    background: '#222'
  }
}

const myThemeContext = React.createContext(themes.light);

function ThemeButton() {
  const theme = useContext(myThemeContext);
  return <button style={{ color: theme.foreground, background: theme.background }}>I am styled by theme context</button>
}

export default function() {
  const [theme, setTheme] = useState('dark');

  const handleThemeChange = useCallback(() => {
     setTheme((theme) => theme == 'light' ? 'dark' : 'light');
  }, [])

  return (
    <myThemeContext.Provider value={themes[theme]}>
      <button onClick={ handleThemeChange } >
      Change Theme
      </button>
      <ThemeButton />
    </myThemeContext.Provider>
  )
}
*/

// timer:
/*
export default function Timer() {
  const [time, setTime] = useState(0);
  const timer = useRef(null);

  const handleStart = useCallback(() => {
    timer.current = setInterval(() => {
      // setTime((time) =>  time + 1)
      setTime(time + 1)
    }, 100)
  }, [])

  const handlePause = useCallback(() => {
    clearInterval(timer.current);
    timer.current = null;
  })

  return (
    <div>
      {time / 10} seconds
      <button onClick={ handleStart }>Start</button>
      <button onClick={ handlePause }>Pause</button>
    </div>
  )
}
*/

// 自定义Hook
// 这里的useCallback 实际上缓存一个函数，函数名为increase,函数体为() => { setCount(count+1) }
// 当点击+号之后，increase函数执行，此时count自动加1，然后函数increase重新声明，此时函数体内的count为增加后的值
/*
function useCounter() {
  const [count, setCount] = useState(0);
  const increase = useCallback(() => {
    setCount(count+1);
  }, [count])

  const decrease = useCallback(() => {
    console.log('create new decrease function')
    console.log('decrease count: ',count);
    setCount(count-1);
  }, [count])

  const reset = useCallback(() => {
    setCount(0);
  }, [count])
  return {
    count,
    increase,
    decrease,
    reset
  }
}

export default function Counter() {
  const { count, increase, decrease, reset } = useCounter();

  return (
    <div>
      <h1>Use counter</h1>
      <button onClick={ decrease }>-</button>
      <span>{ count }</span>
      <button onClick={ increase }>+</button>
      <button onClick={ reset }>Reset</button>
    </div>
  )
}
*/
/*
function Timer() {
  const [count, setCount] = useState(0);
  const refContext = useRef(null);
  useEffect(() => {
    console.log('enter useEffect');
    refContext.current = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)

    return () => {//effect的清除阶段在每次重新渲染时都会执行，而不是只在卸载组件的时候执行一次
      console.log('Timer destroyed');
      clearInterval(refContext.current);
      refContext.current = null;
    }
  })

  return (
    <button>{ count } Seconds</button>
  )
}

export default function() {
  const [pause, setPause] = useState(false);
  const handlePause = useCallback(() => {
    setPause(true);
  })
  return (
    <div>
      <button onClick={ handlePause }>Pause</button>
      { !pause ? <Timer /> : "Paused." }
    </div>
  )
}
*/

// useAsync sample
/*
const getData = () => {
  return new Promise((resolve) => {
    var data = ['lili', 'xiaoming', 'Lucy', 'Jone'];
    setTimeout(() => {
      resolve(data);
    }, 3000)
  })
}

export default function UserList() {
  const { execute: fetchUsers,  data: users, loading, error } = useAsync(
    async () => {
      const res = await getData();
      return res;
    }
  )

  return (
    <div>
      <h1>use async sample</h1>
      <button disabled={ loading } onClick={ fetchUsers }>
        { loading ? 'Loading...' : 'show users' }
      </button>
      { error && <span>Error message</span> }
      <ul>
        {
          users &&
          users.length > 0 &&
          users.map((name) => <li key={ name }>{ name }</li>)
        }
      </ul>
    </div>
  )
}
*/

// blog list
/*
const getArticles = () => {
  return new Promise((resolve) => {
    var data = articles;
    setTimeout(() => {
      resolve(data);
    }, 3000)
  })
}

const getCategories = () => {
  return new Promise((resolve) => {
    var data = categories;
    setTimeout(() => {
      resolve(data);
    }, 3000)
  })
}

const useArticles = () => {
  const { execute, data, loading, error } = useAsync(
    useCallback(async () => {
      const data = await getArticles();
      return data;
    }, [])
  )

  useEffect(() => execute(), [execute])

// 返回语义化的数据结构
  return {
    articles: data,
    articlesLoading: loading,
    articlesError: error
  }
}

const useCategories = () => {
  const { execute, data, loading, error } = useAsync(
    useCallback(async () => {
      const data = await getCategories();
      return data;
    }, [])
  )

  useEffect(() => execute(), [execute])

  return {
    categories: data,
    categoriesLoading: loading,
    categoriesError: error
  }
}

const useCombinedArticles = (articles, categories) => {
  return useMemo(() => {
    if(!articles || !categories) {
      return null;
    }
    return articles.map((article) => {
      return {
        ...article,
        category: categories.find((category) => {
          return category.id == article.categoryId;
        })
      }
    })

  }, [articles, categories])
}

const useFilteredArticles = (articles, selectedCategory) => {
  return useMemo(() => {
    if(!articles) { return null }
    if(!selectedCategory) { return articles; }
    return articles.filter((article) => {
      return article.category && article.category.name == selectedCategory;
    })
  }, [articles, selectedCategory])
}

export default () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { articles, articlesError } = useArticles();
  const { categories, categoriesError } = useCategories();

  const combined = useCombinedArticles(articles, categories);
  const result = useFilteredArticles(combined, selectedCategory);

  const options = useMemo(() => {
    if(categories) {
      var categies = categories.map((category) => {
        return category.name;
      })
      const uniqueCategories = new Set(categies);
      return [...uniqueCategories].map((item) => {
        return {
          value: item,
          label: item
        }
      })
    }

  }, [categories])

  if (!result) return "Loading...";

  if (articlesError || categoriesError) return "Failed";

  return (
    <div>
      <h1>Blog list</h1>
      <Select defaultValue="" style={{ width: 200 }} onChange={ (value) => setSelectedCategory(value) }>
        {
          options.map((option) => {
            return <Option  key={ option.value }  value={ option.value }>{ option.label }</Option >
          })
        }
      </Select>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            result && result.map((item, index) => {
              return (
                <tr key={ index }>
                  <td>{ item.title  } </td>
                  <td>{ item.category && item.category.name  } </td>
                </tr>
              )
            })
          }
          <tr ></tr>
        </tbody>
      </table>
    </div>
  )


}

*/
// useScroll
// faker.js 可以在浏览器或者node.js中生成大量虚假的数据
/*
const getPosition = () => {
  return {
    x: document.documentElement.scrollLeft,
    y: document.documentElement.scrollTop
  }
}

const ScrollTop = () => {
  const { y } = useScroll();

  const toTop = useCallback(() => {
    document.documentElement.scrollTop = 0;
  }, [])

  const style = {
    position: 'fixed',
    right: '10px',
    bottom: '10px'
  }

  if(y > 500) {
    return (
      <button onClick={ toTop } style={ style }>Back To Top</button>
    )
  }

  return null;
}



const useScroll = () => {
  const [position, setPosition] = useState(getPosition());

  useEffect(() => {
    const handler = () => {
      setPosition(getPosition())
    }
    document.addEventListener('scroll', handler);
    return () => {
      document.removeEventListener('scroll', handler);
    }
  }, []);

  return position;
}

const pageData = [];
for(let i = 0; i < 20; i++) {
  pageData.push({
    id: i,
    name: faker.name.findName(),
    introduction: faker.lorem.paragraph()
  })
}

export default () => {
  return (
    <div>
      <h1>Use Scroll Sample</h1>
      {
        pageData.map(item => {
          return (
            <div key={ item.id }>
              <h2>{ item.name }</h2>
              <p>{ item.introduction }</p>
            </div>
          )
        })
      }
      <ScrollTop />
    </div>
  )
}

*/

/// pure redux

//store的初始值

const initialState = { value: 0 };

const counterReducer = (state = initialState, action) => {
  switch(action.type) {
    case "counter/incremented":
      return { value: state.value + 1 }
    case "counter/decremented":
      return { value: state.value - 1 }
    default:
    return state;
  }
}

const output = [];

const store = createStore(counterReducer);

store.subscribe(() => output.push(store.getState()));

const incrementAction = { type: "counter/incremented" };
const decrementAction = { type: "counter/decremented" };

export default () => {
  const [times, setTimes] = useState(0);
  const onClickBtn = () => {
    setTimes((time) => time + 1);
  }
  return (
    <div>
      click { times } times <br />
      <button onClick={ () => store.dispatch(incrementAction) && onClickBtn() }>+</button>
      <button onClick={ () => store.dispatch(decrementAction) && onClickBtn() }>-</button> <br />
      <textarea style={{ width: '400px', height: '500px' }} readOnly value= {
        output.map((item) => JSON.stringify(item))
      }>
      </textarea>
    </div>
  )
}



// filterList
/*
const FilterList = ({ data }) => {
  const [searchKey, setSearchKey] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return item.title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
    })
  }, [searchKey, data])

  return (
    <div>
      <input value={ searchKey } onChange={ (evt) => setSearchKey(evt.target.value) } />
      {
        filteredData.map((item) => {
          return <div key={ item.id }>{ item.title }</div>
        })
      }
    </div>
  )
}

export default () => {
  const data = [
    {
      id: 1,
      title: "Mein Kampf"
    },
    {
      id: 2,
      title: "Tumannost Andromedy"
    },
    {
      id: 3,
      title: "Terumae romae (Thermae Romae)"
    },
    {
      id: 4,
      title: "White Banners"
    },
    {
      id: 5,
      title: "Train, The"
    },
    {
      id: 6,
      title: "Julia and Julia (Giulia e Giulia)"
    },
    {
      id: 7,
      title: "Can Go Through Skin (Kan door huid heen)"
    },
    {
      id: 8,
      title: "Two Moon Junction"
    },
    {
      id: 9,
      title: "Bill & Ted's Bogus Journey"
    },
    {
      id: 10,
      title: "iSteve"
    },
    {
      id: 11,
      title: "Pee-wee's Big Adventure"
    },
    {
      id: 12,
      title: "Celestial Wives of the Meadow Mari (Nebesnye zheny lugovykh mari)"
    },
    {
      id: 13,
      title: "Railroaded!"
    },
    {
      id: 14,
      title: "Devil Hides in Doubt (Sollbruchstelle)"
    },
    {
      id: 15,
      title: "Honeymoon Killers, The"
    },
    {
      id: 16,
      title: "Hurricane, The"
    },
    {
      id: 17,
      title: "Cheaper by the Dozen"
    },
    {
      id: 18,
      title: "New Wave (Nouvelle vague)"
    },
    {
      id: 19,
      title: "Keep Your Right Up"
    },
    {
      id: 20,
      title: "Deathsport"
    }
  ];

  return <FilterList data={ data } />
}

*/
// priceInput

/*
export default () => {
  const [result, setResult] = useState({ amount: '', currency: 'rmb' });


  const handleChange = (value) => {
    setResult({
      ...result,
      ...value
    })
  }

  return (
    <div>
      <input type="text" value={ result.amount } onChange={ (evt) => handleChange({ amount: evt.target.value }) } />
      <select value={ result.currency } onChange={ (evt) => handleChange({ currency: evt.target.value }) }>
        <option value="rmb">RMB</option>
        <option value="dollar">Dollar</option>
        <option value="eur">EUR</option>
      </select>
      <div>
        { JSON.stringify(result) }
      </div>
    </div>
  )

}
*/
//ArticleView
/*
const CommentList = ({ data = [] }) => {
  return (
    <div>
      <h3>Comments ({ data.length })</h3>
      <div>
        {
          data.map(item => {
            return (
              <div key={ item.id }>
                <p >{ item.user }</p>
                <div>{ item.content }</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const getArticleData = (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = articleData['data' + id]
      resolve(data);
    }, 1000)
  })
}

const getUsersData = (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = users[id]
      resolve(data);
    }, 1000)
  })
}

const useArticle = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getArticleData(id).then(res => {
      setLoading(false);
      setData(res);
    })
  }, [id])

  return {
    data,
    loading,
    error
  }
}

const useUser = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getUsersData(id).then(res => {
      setLoading(false);
      setData(res);
    })
  }, [id])

  return {
    data,
    loading,
    error
  }
}

const ArticleView = ({ id }) => {


  const { data: article, loading, error } = useArticle(id);
  const { data: user } = useUser(article && article.userId);

  console.log('article & loading: ',article, loading);

  if(!article || loading) {
    return 'Loading...'
  }

  return (
    <div>
      { id }. { article.title }
      { user &&
        <div>
          <div>{ user.name }</div>
          <div>{ article.createdAt }</div>
        </div>
      }
      <p>{ article.content }</p>
      <CommentList data={ comments } />
    </div>
  )
}

export default () => {
  const [id, setId] = useState(1);

  return (
    <div>
      <ul>
        <li onClick={ () => setId(1) }>Article 1</li>
        <li onClick={ () => setId(2) }>Article 2</li>
        <li onClick={ () => setId(3) }>Article 3</li>
        <li onClick={ () => setId(4) }>Article 4</li>
      </ul>
      <ArticleView id={ id } />
    </div>
  )
}
*/

// 自定义Hook例子
/*
const useUsers = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      setData(userList);
    }, 2000)
  }, [])

  return {
    data,
    loading,
    error
  }
}

export default () => {
  const { data: users, loading, error } = useUsers();
  if(!users || loading) { return 'Loading...' }

  if(error) { return 'Fetched Error' }
  return (
    <div>
      <h2>Use Users sample</h2>
      <ul>
        {
          users && users.map(user => {
            return (
              <li key={ user.id }>{ user.name }</li>
            )
          })
        }
      </ul>
    </div>
  )
}
*/

// user list2
//有点问题 findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of DomWrapper which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
//不知道如何解决
/*
const useUsers = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setData(userList);
    }, 2000)
  }, [])

  return {
    data,
    loading,
    error
  }
}

const UserInfoModal = ({ visible, data }) => {
  return (
    <Modal visible={ visible }>
      <div>
          <label>{data.name}</label>
          <p>{data.introduction}</p>
      </div>
    </Modal>
  )
}

const UserInfoModalWrapper = ({ visible, data }) => {
  if(!visible) { return null };
  return <UserInfoModal visible={ visible } data={ data } />
}

export default () => {
  const { data: users, loading, error } = useUsers();
  const [visibleUserId, setVisibleUserId] = useState(null);

  const modalContent = useMemo(() => {
    if(!users || !visibleUserId) {
      return null;
    }
    return users.find((user) => {
      return user.id == visibleUserId;
    })
  }, [users, visibleUserId])

  if(!users || loading) { return 'Loading...' }

  return (
    <div>
      <h1>users</h1>
      <div>Click name to show details</div>
      <ul>
        {
          users.map(user => {
            return <li key={ user.id } onClick={ () => setVisibleUserId(user.id) }>{ user.name }</li>
          })
        }
      </ul>
      <UserInfoModalWrapper visible={ !!visibleUserId } data={ modalContent }
      onOk={ () => setVisibleUserId(null) } onCancel={ () => setVisibleUserId(null) } />
    </div>
  )
}
*/

//toggle button
//所以useCallback缓存某个函数的时候，会连带着函数里面的变量的值也一起缓存？
// 以下两种实现方式都可以
/*
const ToggleBtn = ({ value, onChange }) => {
  const handleClick = () => {
    onChange(!value);
  }
  return (
    <>
      <button onClick={ handleClick }>{ value ? 'on' : 'off' }</button>
    </>
  )
}

export default () => {
  const [on, setOn] = useState(true);

  const clickBtn = useCallback(() => {
    setOn(on => !on);
  }, [])

  return (
    <div>
      <h1>Toggle button</h1>
      <ToggleBtn value={ on } onChange={ value => setOn(value) } />
      <button onClick={ clickBtn }>{ on ? 'on' : 'off' }</button>
    </div>
  )
}
*/

// key press
/*
const useKeyPress = () => {
  const [key, setKey] = useState(null);
  useEffect(() => {
    const handleKeyPress = (evt) => {
      setKey(evt.key)
    }
    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [])

  return key;
}

export default () => {
  const key = useKeyPress();
  return (
    <div>
      <h1>Use key Press</h1>
      <label>key pressed: { key || 'N/A' } </label>
    </div>
  )
}

*/
