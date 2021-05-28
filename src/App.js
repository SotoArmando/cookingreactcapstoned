import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';
import { Defaultstate, fetcher, mealdbkeys } from './fetch';
import Wrappedrowlist from './components/Wrappedrowlist';
import Cellmeal from './components/cellMeal';

const paths = {
  "/": Homepath,
}

function Homepath() {
  const [[loaded, setLoaded], [data, setData]] = [useState(false), useState(Defaultstate)];

  let handleFetch = ({ 0: response_0, 1: response_1 }) => {
    debugger;
    setData({ ...data, ...response_0, ...response_1 })
  }

  useEffect(() => {
    if (!loaded) {
      const { ["Filter by Category"]: urlfiltercategory, ["List all meal categories"]: urllistcategory } = mealdbkeys
      fetcher([urlfiltercategory, urllistcategory], handleFetch).fetchandwaitAll(); setLoaded(true)
    }
  })

  const { meals, focusedmealdetails, categories } = data;
  return <div>
    {<Wrappedrowlist list={meals} item={Cellmeal} />}
    {JSON.stringify(focusedmealdetails)}
    {JSON.stringify(categories)}
  </div>
}

function Portraitmealpath() {
  return <div className="col">
    <Portraitmealpath />
  </div>
}

function App() {
  const routes = Object.entries(paths).map(([route, view]) => <Route path={route}>{view()}</Route>);
  return (
    <div className="App">
      <Switch >
        {routes}
      </Switch>
    </div>
  );
}

export default App;
