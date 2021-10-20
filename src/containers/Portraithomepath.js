import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Detectitems, fetcher, mealdbkeys,
} from '../fetch';
import Wrappedrow from '../components/Wrappedrow';
import Cellmeal from '../components/Cellmeal';
import Rowsearch from '../components/Rowsearch';
import Cellcategory from '../components/Cellcategory';

export default function Homepath({ u_appstate: Uappstate }) {
  const [[loaded, setLoaded], [data, setData]] = [useState(false), useState({})];

  const handleLoadFetch = (
    {
      0: { meals },
      1: { categories }, 2: { focusedmealdetails: mealslatest },
    },
  ) => {
    Uappstate('categories', categories);
    setData({
      ...data, meals, categories, mealslatest,
    });
  };

  const handleFetch = ({ meals: response }) => {
    setData({ ...data, [Detectitems(response[0])]: response });
  };

  const handleCategoryFilterUpdate = (category) => {
    const { 'Filter by Category': url } = mealdbkeys;
    fetcher(url + category, handleFetch).fetch();
  };

  const handleSearch = (search) => {
    const { 'Search meal by name': url } = mealdbkeys;
    fetcher(url + search, ({ meals: response }) => {
      setData({ ...data, meals: response });
    }).fetch();
  };

  const handleKeyDown = ({ code, target: { value: textsearch } }) => {
    if (code === 'Enter') {
      handleSearch(textsearch);
    }
  };

  useEffect(() => {
    if (!loaded) {
      const { 'Filter by Category': urlfiltercategory, 'List all meal categories': urllistcategory, 'Filter by Latest': urlmealslatest } = mealdbkeys;
      fetcher([`${urlfiltercategory}Seafood`, urllistcategory, urlmealslatest], handleLoadFetch).fetchandwaitAll();
      setLoaded(true);
    }
  });

  const { categories, meals, mealslatest } = data;
  return (
    <div>
      <Rowsearch handleChange={handleKeyDown} />
      <Wrappedrow
        list={categories}
        item={Cellcategory}
        handleClick={handleCategoryFilterUpdate}
        testid="Wrappedrowlistcategories"
      />
      <span className="row items_center corebox_3 f600">Meals</span>
      <Wrappedrow list={meals} item={Cellmeal} basis={42} marginv={23} marginh={30} testid="Wrappedrowlistlibrary" />
      <span className="row items_center corebox_3 f600">Latest Meals</span>
      <Wrappedrow list={mealslatest} item={Cellmeal} basis={42} marginv={23} marginh={23} testid="WrappedrowlistLatest" />
    </div>
  );
}

Homepath.propTypes = {
  u_appstate: PropTypes.func,
};

Homepath.defaultProps = {
  u_appstate: () => 0,
};
