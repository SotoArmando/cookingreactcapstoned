export default function Cellcategory({ strCategory, handleClick, margin }) {
    return <div className={`btn_u corebox_10   pad_l${margin} pad_r${margin}`} onClick={() => handleClick(strCategory)}>
        <div className="allsize back_4 col center">
            <span>{strCategory}</span>
            <div>Icon</div>
        </div>
    </div>
}