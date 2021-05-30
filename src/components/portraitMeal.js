import { useEffect, useState } from "react";
import { connect } from "react-redux"
import { useParams } from "react-router";
import { fetcher, mealdbkeys } from "../fetch";
import { createMapDispatchtoProps } from "../reducers/createDefaultreducer"

function Portraitmeal({ appstate: { focusedmealdetails: { strArea, strCategory, strInstructions, strMeal, strMealThumb, strTags, strYoutube } }, u_appstate }) {

    
    let [[loaded, setLoaded], { id }] = [useState(false), useParams()];

    useEffect(() => {
        if (loaded == false) {
            
            handleLoad();
            setLoaded(true)
        }
    }, [loaded, setLoaded])

    const handleFetch = ({ meals: { 0: response } }) => {
        u_appstate("focusedmealdetails", response)
    }

    const handleLoad = () => {
        const { ["Lookup full meal details by id"]: url } = mealdbkeys;
        fetcher(url + (id), handleFetch).fetch()
    }
    return <div className="col">
        {
            [ strMeal,strArea, strCategory, strInstructions, strMealThumb, strTags, strYoutube ].map(e => <span>{e}</span>)
        }
    </div>
}


const mapStatetoProps = ({ appstate }) => ({ appstate })
const mapDispatchtoProps = createMapDispatchtoProps()

export default connect(mapStatetoProps, mapDispatchtoProps)(Portraitmeal)