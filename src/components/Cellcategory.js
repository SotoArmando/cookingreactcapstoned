export default function Cellcategory({ strCategory, handleClick, cellBoundings, marginv, marginh }) {
    return <div className={`btn_u col mar_l${marginh} mar_r${marginh} mar_t${marginh} mar_b${marginh}`} onClick={() => handleClick(strCategory)}>{strCategory}</div>
}