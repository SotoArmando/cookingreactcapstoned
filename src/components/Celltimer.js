function Celltimer() {
    return <div className="relative corebox_0 hover">
        <div className="corebox_0 absolute left top col center">
            <span>00 : 00 : 00</span>
        </div>

        <div className="to_hover back_4 row space_between btn items_center">
            {["Play","Pause","Repeat"].map(e => <span className="btn_u">{e}</span>)}
        </div>
    </div>
}

export default Celltimer;