export default function Fixedrownav({heigth = 4}) {
    
    return <div className="nav top  back_0 center">
    <div className="bodywidth row space_between ">
        <div className="row ">
            <span className={`corebox_x5 center row items_center corebox_${(heigth)} btn_u`}>Home</span>
            <span className="corebox_x5 center row items_center btn_u">Contact</span>
        </div>
        <div></div>

    </div>
</div>
}