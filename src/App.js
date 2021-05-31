import './App.scss';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Wrappedrowlist from './containers/Wrappedrowlist';
import Cellmeal from './containers/Cellmeal';
import Portraitmeal from './components/Portraitmeal';
import Cellcategory from './containers/Cellcategory';
import Rowsearch from './containers/Rowsearch';
import Fixedrownav from './containers/Fixedrownav';
import {
  Defaultstate, Detectitems, fetcher, mealdbkeys,
} from './fetch';
import { createMapDispatchtoProps } from './reducers/createDefaultreducer';

/* eslint max-len: 0 */

function Homepath({ Updateappstate }) {
  const [[loaded, setLoaded], [data, setData], wrappedrowmealslatest] = [useState(false), useState(Defaultstate), useRef()];

  const handleLoadFetch = ({ 0: { meals }, 1: { categories }, 2: { focusedmealdetails: mealslatest } }) => {
    Updateappstate('categories', categories);
    setData({
      ...data, meals, categories, mealslatest,
    });
  };

  const handleFetch = ({ meals: response }) => {
    setData({ ...data, [Detectitems(response[0])]: response });
  };

  const handleCategoryFilterUpdate = (category) => {
    window.scroll({
      top: wrappedrowmealslatest.current.getBoundingClientRect().y + 300,
      behavior: 'smooth',
    });
    const { 'Filter by Category': url } = mealdbkeys;
    fetcher(url + category, handleFetch).fetch();
  };

  const handleSearch = (search) => {
    window.scroll({
      top: wrappedrowmealslatest.current.getBoundingClientRect().y + 300,
      behavior: 'smooth',
    });
    const { 'Search meal by name': url } = mealdbkeys;
    fetcher(url + search, ({ meals: response }) => {
      setData({ ...data, meals: response });
    }).fetch();
  };

  useEffect(() => {
    if (!loaded) {
      const { 'Filter by Category': urlfiltercategory, 'List all meal categories': urllistcategory, 'Filter by Latest': urlmealslatest } = mealdbkeys;
      fetcher([`${urlfiltercategory}Seafood`, urllistcategory, urlmealslatest], handleLoadFetch).fetchandwaitAll(); setLoaded(true);
    }
  });

  const { categories, meals, mealslatest } = data;

  return (
    <div className="">
      <Rowsearch handleSubmit={handleSearch} />
      <div className="corebox_2 items_center row f_1 f600">Popular Categories</div>
      <Wrappedrowlist list={categories} item={Cellcategory} marginv={27} marginh={21} handleClick={handleCategoryFilterUpdate} basis={40} testid="Wrappedrowlistcategories" />
      <div className="corebox_2 items_center row f_1 f600">Latest</div>
      <Wrappedrowlist list={mealslatest} item={Cellmeal} marginv={27} marginh={21} testid="WrappedrowlistLatest" />
      <div ref={wrappedrowmealslatest} className="" />
      <div className="corebox_2 items_center row f_1 f600">Library</div>
      <Wrappedrowlist list={meals} item={Cellmeal} marginv={27} marginh={21} testid="Wrappedrowlistlibrary" />

    </div>
  );
}

function Portraitmealpath() {
  return (
    <div className="col">
      <Portraitmeal />
    </div>
  );
}

function App() {
  const paths = {
    '/recipe/:id': Portraitmealpath,
    '/': connect(() => ({}), createMapDispatchtoProps())(Homepath),
  };
  return (
    <div className="App">
      <Fixedrownav heigth={5} />
      <Switch>
        {
          Object.entries(paths)
            .map(
              ({ 0: route, 1: View }) => <Route key={route} path={route}><View /></Route>,
            )
        }
      </Switch>
    </div>
  );
}

Homepath.propTypes = {
  Updateappstate: PropTypes.func.isRequired,
};

export { App, Homepath, Portraitmealpath };
