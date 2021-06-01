import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';
import Wrappedrowlist from '../containers/Wrappedrowlist';
import Cellmeal from '../containers/Cellmeal';
import Cellcategory from '../containers/Cellcategory';
import Rowsearch from '../containers/Rowsearch'; import {
     Detectitems, fetcher, mealdbkeys,
} from '../fetch';

/* eslint max-len: 0 */

function Homepath({ appstate, Updateappstate }) {
    const [[loaded, setLoaded], [data, setData], wrappedrowmealslatest] = [useState(false), useState(appstate), useRef()];

    const handleLoadFetch = ({ 0: { meals }, 1: { categories }, 2: { focusedmealdetails: mealslatest } }) => {
        Updateappstate('categories', categories);
        setData({
            ...data, meals, categories, mealslatest,
        });

        Updateappstate("meals",meals)
        Updateappstate("categories",categories)
        Updateappstate("mealslatest",mealslatest)
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

Homepath.propTypes = {
    Updateappstate: PropTypes.func.isRequired,
    appstate: PropTypes.shape({
            meals: PropTypes.array.isRequired,
            focusedmealdetails: PropTypes.shape.isRequired,
            categories: PropTypes.array.isRequired,
            mealslatest: PropTypes.array.isRequired,
        }
    ).isRequired
};

const mapStatetoProps = ({ appstate }) => ({ appstate });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Homepath);
