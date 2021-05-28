import { connect } from "react-redux";

function Wrappedrowlist({ props: { item }, list, handleClick }) {
    return <div className="row basis_43 ">
        {(list || []).forEach(e => item({ ...e, handleClick }))}
    </div>
}

export default Wrappedrowlist;