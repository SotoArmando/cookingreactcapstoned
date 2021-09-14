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
import Homepath from './components/Portraithomepath'

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
        {Object.entries(paths).map(({ 0: route, 1: View }) => <Route key={route} path={route} ><View /></Route>)}
      </Switch>
    </div>
  );
}

export default App; 
