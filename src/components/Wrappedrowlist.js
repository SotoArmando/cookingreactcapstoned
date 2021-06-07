import React from "react";


function Wrappedrowlist({  item:Item , list, handleClick, itemBoundings}) {
    console.log("Wrappedrowlist list ",list)

    return <div className="row basis_43 ">
        {
            (list || []).map(e => Item({...e, handleClick}))
        }
    </div>
}

export default Wrappedrowlist;