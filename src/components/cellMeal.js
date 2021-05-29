import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { fetcher, mealdbkeys } from "../fetch";

function Cellmeal({ strMeal, strMealThumb, idMeal, margin }) {

    let [history] = [useHistory()]
    const handleClick = () => {
        history.push('/recipe/' + idMeal)
    }

    return <div className={`btn_u corebox_13  pad_l${margin} pad_r${margin}`} onClick={handleClick}>
        <div className="allsize back_4">
            {strMeal}
            {idMeal}
        </div>
    </div>
}

export default Cellmeal;