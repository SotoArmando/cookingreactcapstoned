import React from "react";


function Wrappedrowlist({  item:Item , list, handleClick, basis = 43, margin = 12 }) {
    console.log("Wrappedrowlist list ",list)

    return <div className={`row basis_${basis} nmar_l${margin} nmar_r${margin}`}>
        {
            (list || []).map(e => Item({...e, handleClick, margin}))
        }
    </div>
}

export default Wrappedrowlist;