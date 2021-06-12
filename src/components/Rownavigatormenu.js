import Cellprofilepicture from "./Cellprofilepicture";
import { withRouter } from "react-router";

function Rownavigatormenu({ location: { pathname }, history, history: { length: historylength } }) {

    const handleClick = (string) => {
        switch (string) {
            case ("Assistant"): history.push('/assistant'); break;
            case ("Settings"): history.push('/profile/settings'); break;
            case ("Library"): history.push('/profile/library'); break;
            case ("Save"): history.push('/profile/library'); break;
            case ("Back"): history.goBack(); break;
            default: history.push('/'); break;
        }
    }

    const mapUrlwithcontrols = (string) => {
        return ['Save'][['/recipe/'].findIndex(e => string.match(e))];
    }
    return [<div className="corebox_3 nav row space_between items_center back_0">

        <div className="row">
            {
                [(historylength > 2 ? <span onClick={() => handleClick('Back')} className="corebox_x5 center btn_u">Back</span> : ""),
                [mapUrlwithcontrols(pathname)].map(e => <span onClick={() => handleClick(e)} className="corebox_x5 center btn_u">{e}</span>)]
            }
        </div>
        <div className="row">
            {
                ["Home", "Assistant"].
                    map(e => <span onClick={() => handleClick(e)} className="corebox_x6 center btn_u tcenter">{e}</span>)
            }
            <Cellprofilepicture size={30} />
            <span className="corebox_x5 corebox_3 center  btn_u hover relative">
                Profile
                <div className="to_hover absolute  corebox_x7  col right marcore_t26">
                    {
                        ["Settings", "Library"].
                            map(e => <span onClick={() => handleClick(e)} className="corebox_3 corebox_x5 center btn_u back_0">{e}</span>)
                    }
                </div>
            </span>
        </div>
    </div>,
    <div className="corebox_3" />


    ]
}

export default withRouter(Rownavigatormenu);