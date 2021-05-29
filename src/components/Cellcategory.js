export default function Cellcategory({strCategory, handleClick}){
    return <div className="btn_u" onClick={() => handleClick(strCategory)}>{strCategory}</div>
}