import React from "react";


function Wrappedrowlist({  item:Item , list, handleClick, basis = 43, marginh = 12, marginv = 12 }) {
    console.log("Wrappedrowlist list ",list)

    return <div className="corebox_16">
        <div className={`row  basis_${basis} nmar_l${marginh} nmar_r${marginh} nmar_t${marginv} nmar_b${marginv}`}>
        {
            (list || []).map(e => Item({...e, handleClick, marginh, marginv}) )
        }
    </div>
    </div>
}

export default Wrappedrowlist;