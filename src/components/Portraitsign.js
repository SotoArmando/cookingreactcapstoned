import { useState } from 'react';
import { fetcher, mealdbkeys } from '../fetch';
import { newsession, newuser } from '../formsetup';
import Forminput from './Forminput';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer'
import { connect } from 'react-redux';
function Portraitsign({ u_session, session: { activesession } }) {

    let [[boolsignup, setboolsignup], [session, setSession]] = [useState(false), useState(activesession)];

    const handleUserSignup = (unknownuser) => {
        if (boolsignup) {
            let { ["unknownuser CRUD"]: url } = mealdbkeys;
            let { fetchcrudOperation } = fetcher(url, (e => console.log(e)));
            fetchcrudOperation("POST", unknownuser)
        }
    }
    const handleUserSignin = (user) => {
        if (boolsignup === false) {
            let { ["unknownuser CRUD"]: url, userExist } = mealdbkeys;
            let { fetchcrudOperation } = fetcher(url, (e => {
                if (e.length > 0) {
                    setSession(e[0]);
                    u_session('active', true)
                    u_session('activesession', e[0])
                }
            }
            ));
            fetchcrudOperation("GET", userExist(user))
        }
    }

    const switchForm = (form) => {
        if (boolsignup != form) {
            setboolsignup(form);
        }
    }

    return <div className='pad_l24 pad_r24 col'>
        <div className='pad_l24 pad_r24 col'>
            <span className='f_4'>Welcome to dothiscooking</span>
            <span>Happy to have you here :)</span>
            <div className='corebox_0' />
            <div>
                {JSON.stringify(session)}
            </div>
            <Forminput
                id="Signform"
                entries={boolsignup ? newuser : newsession}
                handleCapture={boolsignup ? handleUserSignup : handleUserSignin} />
            <button form="Signform" type="submit" onClick={() => switchForm(false)} value="Submit" className='corebox_2 border_0 back_0 btn_u'>Sign in</button>
            <button form="Signform" type="submit" onClick={() => switchForm(true)} value="Submit" className='corebox_2 border_0 back_0 mar_t24 btn_u'>Sign up</button>
        </div>
    </div>
}

let mapStatetoProps = ({session}) => ({session});
let mapDispatchtoProps = createMapDispatchtoProps()
export default connect(mapStatetoProps, mapDispatchtoProps)(Portraitsign);