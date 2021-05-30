import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { fetcher, mealdbkeys } from "../fetch";

function Cellmeal({ strMeal, strMealThumb, idMeal, marginh, marginv }) {

    let [history] = [useHistory()]
    const handleClick = () => {
        history.push('/recipe/' + idMeal)
    }

    return <div className={`btn_u corebox_13  pad_l${marginh} pad_r${marginh} pad_t${marginv} pad_b${marginv}`} onClick={handleClick}>
        <div className="allsize back_0 col">
            <div className="corebox_12 cover" style={{ backgroundImage: `url(${strMealThumb})` }} />
            <div className="col pad_24">
                <div>{strMeal}</div>
            </div>
        </div>
    </div >
}

export default Cellmeal;