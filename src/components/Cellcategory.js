export default function Cellcategory({ strCategory, handleClick, cellBoundings, marginv, marginh }) {
    return <div className={`btn_u col fore_s0  mar_l${marginh} mar_r${marginh} mar_t${marginh} mar_b${marginh} corebox_10 back_s0 pad_22`} onClick={() => handleClick(strCategory)}>{strCategory}</div>
}
