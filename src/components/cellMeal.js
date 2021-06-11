import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { fetcher, mealdbkeys } from "../fetch";


function Cellmeal({ strMeal, strMealThumb, idMeal, cellBoundings, handleClick: handleclick = false }) {

    let [history] = [useHistory()]
    const handleClick = () => {
        history.push('/recipe/' + idMeal)
    }

    debugger;

    return <div className="btn_u" onClick={handleclick || handleClick}>
        {strMeal}
        {strMealThumb}
        {idMeal}
    </div>
}

export default Cellmeal;