export default function Cellcategory({ strCategory, handleClick, marginh, marginv }) {
    return <div className={`btn_u corebox_12   pad_l${marginh} pad_r${marginh} pad_t${marginv} pad_b${marginv}`} onClick={() => handleClick(strCategory)}>
        <div className="allsize back_0 col center">
            <div className={"iconsize_34 pad_t24 mar_b24 svgicon_"+strCategory.toLowerCase()}></div>
            <span>{strCategory}</span>
        </div>
    </div>
}