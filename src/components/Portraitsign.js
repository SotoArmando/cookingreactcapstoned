import { useState } from 'react';
import { newsession, newuser } from '../formsetup';
import Forminput from './Forminput';

function Portraitsign({ }) {

    let [boolsignup, setboolsignup] = useState(false);


    const handleUserSignup = () => {
        console.log('handleUserSignup')
    }
    const handleUserSignin = () => {
        console.log('handleUserSignin')
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
            <button form="Signform" type="submit" onClick={() => setboolsignup(false)} value="Submit" className='corebox_2 border_0 back_0 btn_u'>Sign in</button>
            <button form="Signform" type="submit" onClick={() => setboolsignup(true)} value="Submit" className='corebox_2 border_0 back_0 mar_t24 btn_u'>Sign up</button>
        </div>
    </div>
}

export default Portraitsign;