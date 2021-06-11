import Cellprofilepicture from "./Cellprofilepicture";
import { useHistory } from "react-router";

function Rownavigatormenu() {
    let [history] = [useHistory()]
    const handleClick = (string) => {
        switch (string) {
            case ("Assistant"): history.push('/assistant'); break;
            default: history.push('/'); break;
        }
    }
    return [<div className="corebox_3 nav row space_between items_center back_0">

        <div className="row">
            {
                ["Back", "Save"].
                    map(e => <span className="corebox_x5 center btn_u">{e}</span>)
            }
        </div>
        <div className="row">
            {
                ["Assistant", "Option", "Option", "Option"].
                    map(e => <span onClick={() => handleClick(e)} className="corebox_x5 center btn_u">{e}</span>)
            }
            <Cellprofilepicture size={30} />
            <span className="corebox_x5 corebox_3 center  btn_u hover relative">
                Profile
                <div className="to_hover absolute corebox_10 back_5 col top left">
                    {
                        ["Assistant", "Option", "Option", "Option"].
                            map(e => <span onClick={() => handleClick(e)} className="corebox_x5 center btn_u">{e}</span>)
                    }
                </div>
            </span>
        </div>
    </div>,
    <div className="corebox_3" />


    ]
}

export default Rownavigatormenu;