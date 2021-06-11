import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';
import { Defaultstate, Detectitems, fetcher, mealdbkeys } from './fetch';
import Wrappedrowlist from './components/Wrappedrowlist';
import Cellmeal from './components/Cellmeal';

import { createMapDispatchtoProps } from './reducers/createDefaultreducer';
import Cellcategory from './components/Cellcategory';
import { connect } from 'react-redux';
import Rowsearch from './components/Rowsearch';
import Portraitmeals from './components/Portraitmeals';
import Portraitprofile from './components/Portraitprofile';
import Rownavigatormenu from './components/Rownavigatormenu';
import Portraitprofilesettings from './components/Portraitprofilesettings';
import Portraitprofilelibrary from './components/Portraitprofilesettings';
import Portraitassistant from './components/Portraitassistant';
import Portraitassistantrecipe from './components/Portraitassistantrecipe';


function Homepath({ u_appstate }) {
  let [[loaded, setLoaded], [data, setData]] = [useState(false), useState(Defaultstate)];
  
  let handleLoadFetch = ({ 0: { meals }, 1: { categories }, 2: { focusedmealdetails: mealslatest } }) => {
    debugger;
    u_appstate("categories", categories)
    setData({ ...data, meals, categories, mealslatest })
  }

  let handleFetch = ({ meals: response }) => {
    setData({ ...data, [Detectitems(response[0])]: response })
  }

  let handleCategoryFilterUpdate = (category) => {
    const { ["Filter by Category"]: url } = mealdbkeys;
    fetcher(url + category, handleFetch).fetch()
  }

  let handleSearch = (search) => {
    const { ["Search meal by name"]: url } = mealdbkeys;
    fetcher(url + search, ({ meals: response }) => {
      setData({ ...data, meals: response })
    }).fetch()
  }

  useEffect(() => {
    if (!loaded) {
      const { ["Filter by Category"]: urlfiltercategory, ["List all meal categories"]: urllistcategory, ["Filter by Latest"]: urlmealslatest } = mealdbkeys
      fetcher([urlfiltercategory + "Seafood", urllistcategory, urlmealslatest], handleLoadFetch).fetchandwaitAll(); setLoaded(true)
    }
  })

  const { categories, meals, mealslatest } = data;

  return <div>
    <Rowsearch handleSubmit={handleSearch} />
    <Wrappedrowlist list={categories} item={Cellcategory} handleClick={handleCategoryFilterUpdate} />
    <Wrappedrowlist list={meals} item={Cellmeal} />
    <span>Latest</span>
    <Wrappedrowlist list={mealslatest} item={Cellmeal} />

    
  </div>
}

function Portraitmealpath() {
  return <div className="col">
    <Portraitmeals />
  </div>
}

function App() {
  let paths = {
    "/recipe/:id": Portraitmeals,
    "/profile/:id": Portraitprofile,
    "/profile/settings": Portraitprofilesettings,
    "/profile/library": Portraitprofilelibrary,
    "/assistant/recipe/:id": Portraitassistantrecipe,
    "/assistant": Portraitassistant,
    "/": connect(() => ({}), createMapDispatchtoProps())(Homepath)
  }
  return (
    <div className="App">
      <Rownavigatormenu />
      <Switch >
        {Object.entries(paths).map(({ 0: route, 1: View }) => <Route path={route} ><View /></Route>)}
      </Switch>
    </div>
  );
}

export default App;
