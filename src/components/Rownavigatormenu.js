import Cellprofilepicture from "./Cellprofilepicture";
import { withRouter } from "react-router";
import { createMapDispatchtoProps } from "../reducers/createDefaultreducer";
import { connect } from "react-redux";

function Rownavigatormenu({ location: { pathname }, history, history: { length: historylength }, session: { active, activesession: { nick } }, u_session }) {

    const handleSignout = () => u_session('active', false)
    const handleClick = (string) => {
        switch (string) {
            case ("Assistant"): history.push('/assistant'); break;
            case ("Settings"): history.push('/profile/settings'); break;
            case ("Library"): history.push('/profile/library'); break;
            case ("Save"): history.push('/profile/library'); break;
            case ("Sign"): history.push('/sign'); break;
            case ("Back"): history.goBack(); break;
            case ("Sign out"): handleSignout(); break;
            default: history.push('/'); break;
        }
    }

    const mapUrlwithcontrols = (string) => {
        return ['Save'][['/recipe/'].findIndex(e => string.match(e))];
    }
    return [<div key='Rownavigatormenu' className="corebox_3 nav row space_between items_center back_s1">

        <div className="row">
            {
                [
                    (historylength > 2 ? <span key="Rownavigatormenuback" onClick={() => handleClick('Back')} className="corebox_x5 center btn_u">
                    Back
                    </span> : []),
                    ...[mapUrlwithcontrols(pathname)].map(e => <span  key={'mapUrlwithcontrols'+e} onClick={() => handleClick(e)} className="corebox_x5 center btn_u">{e}</span>)]
            }
        </div>
        <div className="row pad_r24">
            {
                [["Home", 4]].filter((e, i) => [true, true, !active][i]).map(
                    ([e, size]) => <span key={"Rownavigatormenu"+e+size} onClick={() => handleClick(e)} className={`corebox_x${size} center btn_u tcenter`}>{e}</span>)
            }
            
           
        </div>
    </div>,
    <div key='Rownavigatormenucorebox_3' className="corebox_3" />


    ]
}


let mapStatetoProps = ({ session }) => ({ session });
let mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(withRouter(Rownavigatormenu));
