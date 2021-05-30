import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { Defaultstate, Detectitems, fetcher, mealdbkeys } from './fetch';
import Wrappedrowlist from './containers/Wrappedrowlist';
import Cellmeal from './containers/Cellmeal';
import Portraitmeal from './components/Portraitmeal';
import { createMapDispatchtoProps } from './reducers/createDefaultreducer';
import Cellcategory from './containers/Cellcategory';
import { connect } from 'react-redux';
import Rowsearch from './containers/Rowsearch';
import Fixedrownav from './containers/Fixedrownav';


function Homepath({ u_appstate }) {
  let [[loaded, setLoaded], [data, setData], wrappedrowmealslatest] = [useState(false), useState(Defaultstate), useRef()];
  
  let handleLoadFetch = ({ 0: { meals }, 1: { categories }, 2: { focusedmealdetails: mealslatest } }) => {
    u_appstate("categories", categories)
    setData({ ...data, meals, categories, mealslatest })
  }

  let handleFetch = ({ meals: response }) => {
    setData({ ...data, [Detectitems(response[0])]: response })
  }

  let handleCategoryFilterUpdate = (category) => {
    window.scroll({
      top: wrappedrowmealslatest.current.getBoundingClientRect().y + 300,
      behavior: 'smooth'
    });
    document.querySelector("span").getBoundingClientRect()
    const { ["Filter by Category"]: url } = mealdbkeys;
    fetcher(url + category, handleFetch).fetch()
  }

  let handleSearch = (search) => {
    window.scroll({
      top: wrappedrowmealslatest.current.getBoundingClientRect().y + 300,
      behavior: 'smooth'
    });
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

  return <div className="mar_t35">
    <Rowsearch handleSubmit={handleSearch} />
    <div className="corebox_2 items_center row f_1 f600">Popular Categories</div>
    <Wrappedrowlist list={categories} item={Cellcategory} marginv={27} marginh={21} handleClick={handleCategoryFilterUpdate} basis={40} testid="Wrappedrowlistcategories"/>
    <div className="corebox_2 items_center row f_1 f600">Latest</div>
    <Wrappedrowlist list={mealslatest} item={Cellmeal} marginv={27} marginh={21} testid="WrappedrowlistLatest"/>
    <div ref={wrappedrowmealslatest} className="" />
    <div className="corebox_2 items_center row f_1 f600">Library</div>
    <Wrappedrowlist list={meals} item={Cellmeal} marginv={27} marginh={21} testid="Wrappedrowlistlibrary"/>
   
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
      <Fixedrownav heigth={5} />
      <Switch >
        {Object.entries(paths).map(({ 0: route, 1: View }) => <Route path={route} ><View /></Route>)}
      </Switch>
    </div>
  );
}

export {App,Homepath,Portraitmealpath};
