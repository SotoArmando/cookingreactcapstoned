function Rownavigatormenu() {
    return [<div className="corebox_3 nav row space_between items_center">
        <div className="row">
            {
                ["Back", "Save"].
                    map(e => <span className="corebox_x5 center btn_u">{e}</span>)
            }
        </div>
        <div className="row">
            {
                ["Option", "Option", "Option", "Option"].
                    map(e => <span className="corebox_x5 center btn_u">{e}</span>)
            }
        </div>
    </div>,
    <div className="corebox_3" />


    ]
}

export default Rownavigatormenu;