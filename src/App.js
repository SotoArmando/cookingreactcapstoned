import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';
import { Detectitems, fetcher, mealdbkeys } from './fetch';

const paths = {
  "/": Homepath(),
}

console.log(Object.entries(paths))

function Homepath() {
  return <div>
    App.js says: Hello World!
  </div>
}


function App() {

  const [[loaded, setLoaded], [data, setData]] = [useState(false), useState({})];

  let handleFetch = ({ 0: response_0, 1: response_1 }) => {
    debugger;
    setData({ ...data, ...response_0, ...response_1 })
  }

  useEffect(() => {
    if (!loaded) {
      const { ["Filter by Category"]: urlfiltercategory, ["List all meal categories"]: urllistcategory } = mealdbkeys
      fetcher([urlfiltercategory, urllistcategory], handleFetch).fetchandwaitAll(); setLoaded(true)
    }
  }, [])

  // const {}
  return (
    <div className="App">
      <Switch >
        {
          // Object.entries(paths).forEach(([path, component]) => <Route  path="/">
          //   <Homepath/>
          // </Route>)

          <Route path="/">
            {JSON.stringify(data)}
          </Route>

        }
      </Switch>
    </div>
  );
}


export default App;
