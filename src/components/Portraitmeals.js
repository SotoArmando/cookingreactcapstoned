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

    debugger;
    let [[loaded, setLoaded], { id }, history] = [useState(false), useParams(), useHistory()];

    useEffect(() => {
        if (loaded == false) {
            debugger;
            handleLoad();
            setLoaded(true)
        }
    }, [loaded, setLoaded])

    const handleFetch = ({ meals: { 0: response } }) => {
        debugger;
        u_appstate("focusedmealdetails", response)
    }

    const handleLoad = () => {
        const { ["Lookup full meal details by id"]: url } = mealdbkeys;
        fetcher(url + (id), handleFetch).fetch()
    }

    const handleAuthorClick = () => {
        history.push('/profile/' + 1)
    }
    return <div className="col">
        <div className="btn_u " onClick={handleAuthorClick}>Author: XMan</div>
        {
            [strMeal, strArea, strCategory, strInstructions, strMealThumb, strTags, strYoutube].map(e => <span>{e}</span>)
        }
        <Wrappedrowlist list={"0".repeat(3).split("")} item={Celltimer} basis={40} />


        <Rowcomment />
        <Rowcomment />
        <Rowcomment />
        <Rowcommentinput/>
    </div>
}


const mapStatetoProps = ({ appstate }) => ({ appstate })
const mapDispatchtoProps = createMapDispatchtoProps()

export default connect(mapStatetoProps, mapDispatchtoProps)(Portraitmeal)