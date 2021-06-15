import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { fetcher, mealdbkeys } from "../fetch";


function Cellmeal({ strMeal, strMealThumb, idMeal, cellBoundings, handleClick: handleclick = false, marginv, marginh }) {

    let [history, [state, setState]] = [useHistory(), useState({ marked: false, liked: false })]
    let { marked, liked } = state;
    const handleClick = (e) => {
        switch (e) {
            case ('Like'):
            case ('Liked'): {
                setState({ ...state, liked: !liked })
                break
            }
            case ('Mark'):
            case ('Marked'): {
                setState({ ...state, marked: !marked})
                break
            }
            default: {
                history.push('/recipe/' + idMeal)
                break;
            }
        }
    }



    return <div className={`col space_between mar_l${marginh} mar_r${marginh} mar_t${marginh} mar_b${marginh}`} >
        <div className="btn_u" onClick={() => (handleclick || handleClick)()}>{strMeal}</div>
        <div className="row">
            {[liked ? 'Liked' : 'Like', marked ? 'Marked' : 'Mark'].map((e,i) => <span onClick={() => handleClick(e)} className={`btn_u corebox_x5 ${[liked,marked][i]?'f600':''}`}>{e}</span>)}
        </div>
    </div>
}

export default Cellmeal;