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
import Portraitprofilelibrary from './components/Portraitprofilelibrary';
import Portraitassistant from './components/Portraitassistant';
import Portraitassistantrecipe from './components/Portraitassistantrecipe';
import Portraitsign from './components/Portraitsign';
import Portraituseractivation from './components/Portraituseractivation';


function Homepath({ u_appstate }) {
  let [[loaded, setLoaded], [data, setData]] = [useState(false), useState({})];

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
    debugger;
    if (!loaded) {
      const { ["Filter by Category"]: urlfiltercategory, ["List all meal categories"]: urllistcategory, ["Filter by Latest"]: urlmealslatest } = mealdbkeys
      fetcher([urlfiltercategory + "Seafood", urllistcategory, urlmealslatest], handleLoadFetch).fetchandwaitAll();
      setLoaded(true);
    }

    debugger;



    // const mailgun = require("mailgun-js");
    // const DOMAIN = 'sotoarmando.com';
    // let api_key = '403e833f3246653d52e10efefd900779-24e2ac64-e84f3ca9'
    // const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
    // const data = {
    //   from: 'Excited User <armandosoto@sotoarmando.com>',
    //   to: 'armando29@live.com, armandosoto@sotoarmando.com',
    //   subject: 'Hello',
    //   text: 'Testing some Mailgun awesomness!'
    // };
    // mg.messages().send(data, function (error, body) {
    //   debugger;
    //   console.log(body);
    // });
  })

  const { categories, meals, mealslatest } = data;
  debugger;
  return <div>
    <Rowsearch handleSubmit={handleSearch} />
    <Wrappedrowlist list={categories} item={Cellcategory} handleClick={handleCategoryFilterUpdate} />
    <span className="row items_center corebox_3 f600">Meals</span>
    <Wrappedrowlist list={meals} item={Cellmeal} basis={40} marginv={23} marginh={23} />
    <span className="row items_center corebox_3 f600">Latest Meals</span>
    <Wrappedrowlist list={mealslatest} item={Cellmeal} basis={40} marginv={23} marginh={23} />
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
    "/profile/library": Portraitprofilelibrary,
    "/profile/settings": Portraitprofilesettings,
    "/profile/:id": Portraitprofile,
    "/assistant/recipe/:id": Portraitassistantrecipe,
    "/assistant": Portraitassistant,
    "/activateuser/:hash": Portraituseractivation,
    "/sign": Portraitsign,
    "/": connect(() => ({}), createMapDispatchtoProps())(Homepath)
  }

  // done
  // library x profile
  // settings x profile
  // content x profile, profile
  // timers x recipe, recipes x library x profile, grocerylists x profile, timers x profile


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
