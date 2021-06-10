export default function Cellgrocerylist({strCategory, handleClick, cellBoundings}){
    return <div className="btn_u" onClick={() => handleClick(strCategory)}>{strCategory}</div>
}