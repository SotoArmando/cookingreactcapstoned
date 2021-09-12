import { useEffect, useState } from "react";
import { connect } from "react-redux"
import { useParams } from "react-router";
import { fetcher, mealdbkeys } from "../fetch";
import { createMapDispatchtoProps } from "../reducers/createDefaultreducer"
import Celltimer from "./Celltimer";
import Rowcomment from "./Rowcomment";
import Wrappedrowlist from "./Wrappedrowlist";
import { useHistory } from "react-router";
import Rowcommentinput from "./Rowcommentinput";

function Portraitmeal({ appstate: { focusedmealdetails: { strArea, strCategory, strInstructions, strMeal, strMealThumb, strTags, strYoutube } }, u_appstate }) {


    let [[loaded, setLoaded], { id }, history] = [useState(false), useParams(), useHistory()];

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

    const handleAuthorClick = () => {
        history.push('/profile/' + 1)
    }
    return <div className="col pad_22">
        <div className="corebox_14 "
            style={{
            backgroundImage: `url(${strMealThumb})`,
            backgroundSize: 'cover'
        }}>
        </div>
        <span className="f_1 corebox_3 row items_center">{strMeal}</span>
        {
            [ strArea, strCategory, , strMealThumb, strTags, strYoutube].map(e => <span>{e}</span>)
        }
        <span className="pad_t22">
        {strInstructions}
        </span>
 


    </div>
}


const mapStatetoProps = ({ appstate }) => ({ appstate })
const mapDispatchtoProps = createMapDispatchtoProps()

export default connect(mapStatetoProps, mapDispatchtoProps)(Portraitmeal)
