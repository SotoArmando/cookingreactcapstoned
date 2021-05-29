export default function Cellcategory({ strCategory, handleClick, marginh, marginv }) {
    return <div className={`btn_u corebox_12   pad_l${marginh} pad_r${marginh} pad_t${marginv} pad_b${marginv}`} onClick={() => handleClick(strCategory)}>
        <div className="allsize back_4 col center">
            <span>{strCategory}</span>
            <div>Icon</div>
        </div>
    </div>
}