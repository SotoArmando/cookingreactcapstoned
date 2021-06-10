import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { fetcher, mealdbkeys } from "../fetch";


function Cellmeal({ strMeal, strMealThumb, idMeal, cellBoundings }) {

    let [history] = [useHistory()]
    const handleClick = () => {
        history.push('/recipe/' + idMeal)
    }

    return <div className="btn_u" onClick={handleClick}>
        {strMeal}
        {strMealThumb}
        {idMeal}
    </div>
}

export default Cellmeal;