import { useState } from 'react';
import { fetcher, mealdbkeys } from '../fetch';
import { newsession, newuser } from '../formsetup';
import Forminput from './Forminput';

function Portraitsign({ }) {

    let [boolsignup, setboolsignup] = useState(false);

    const handleUserSignup = (unknownuser) => {
        if (boolsignup) {
            let { ["unknownuser CRUD"]: url } = mealdbkeys;
            let { fetchcrudOperation } = fetcher(url, (e => console.log(e)));
            fetchcrudOperation("POST", unknownuser)
        }
    }
    const handleUserSignin = (user) => {
        if (boolsignup === false) {
            let { ["unknownuser CRUD"]: url } = mealdbkeys;
            let { fetchcrudOperation } = fetcher(url, (e => console.log(e)));
            fetchcrudOperation("GET", user)
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
            <Forminput
                id="Signform"
                entries={boolsignup ? newuser : newsession}
                handleCapture={boolsignup ? handleUserSignup : handleUserSignin} />
            <button form="Signform" type="submit" onClick={() => switchForm(false)} value="Submit" className='corebox_2 border_0 back_0 btn_u'>Sign in</button>
            <button form="Signform" type="submit" onClick={() => switchForm(true)} value="Submit" className='corebox_2 border_0 back_0 mar_t24 btn_u'>Sign up</button>
        </div>
    </div>
}

export default Portraitsign;