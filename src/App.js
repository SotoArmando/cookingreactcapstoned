import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';
import { Defaultstate, fetcher, mealdbkeys } from './fetch';
import Wrappedrowlist from './components/Wrappedrowlist';
import Cellmeal from './components/Cellmeal';
import Portraitmeal from './components/Portraitmeal';
import { createMapDispatchtoProps } from './reducers/createDefaultreducer';
import Cellcategory from './components/Cellcategory';
import { connect } from 'react-redux';


function Homepath({ u_appstate }) {
  let [[loaded, setLoaded], [data, setData]] = [useState(false), useState(Defaultstate)];

  let handleLoadFetch = ({ 0: { meals }, 1: { categories } }) => {
    u_appstate("categories", categories)
    setData({ ...data, meals, categories })
  }

  let handleCategoryFilterUpdate = (category) => {
    const { ["Filter by Category"]: url } = mealdbkeys;
    fetcher(url + category, ({ meals: response }) => {
      setData({ ...data,meals: response })
    }).fetch()
  }

  useEffect(() => {
    if (!loaded) {
      const { ["Filter by Category"]: urlfiltercategory, ["List all meal categories"]: urllistcategory } = mealdbkeys
      fetcher([urlfiltercategory + "Seafood", urllistcategory], handleLoadFetch).fetchandwaitAll(); setLoaded(true)
    }
  })

  const { meals, categories } = data;
  return <div>
    <Wrappedrowlist list={categories} item={Cellcategory} handleClick={handleCategoryFilterUpdate} />
    <Wrappedrowlist list={meals} item={Cellmeal} />
  </div>
}

function Portraitmealpath() {
  return <div className="col">
    <Portraitmeal />
  </div>
}

function App() {
  let paths = {
    "/recipe/:id": Portraitmealpath,
    "/": connect(() => ({}), createMapDispatchtoProps())(Homepath)
  }
  return (
    <div className="App">
      <Switch >
        {Object.entries(paths).map(({ 0: route, 1: View }) => <Route path={route} ><View /></Route>)}
      </Switch>
    </div>
  );
}

export default App;
