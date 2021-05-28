import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { fetcher, mealdbkeys } from "../fetch";

function Cellmeal({ strMeal, strMealThumb, idMeal }) {

    const [history, { id }, [loaded, setLoaded], [data, setData]] = [useHistory(), useParams(), useState(false), useState(undefined)]
    const handleClick = () => {
        history.push('/recipe/?' + idMeal)
    }

    useEffect(() => {
        if (!loaded){ handleLoad(); setLoaded(true)}
    })

    const handleFetch = ({ meals: response }) => {
        setData(response)
    }

    const handleLoad = () => {
        
        const { ["Lookup full meal details by id"]: url } = mealdbkeys;

        fetcher(url, handleFetch).fetch()
    }

    return <div className="btn_u" onClick={handleClick}>
        {strMeal}
        {strMealThumb}
        {idMeal}
    </div>
}

export default Cellmeal;