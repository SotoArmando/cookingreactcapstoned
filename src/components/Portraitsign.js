import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { fetcher, mealdbkeys } from '../fetch';
import { newsession, newuser } from '../formsetup';
import Forminput from './Forminput';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';

function Portraitsign({ u_session: Usession, session }) {
  const [[boolsignup, setboolsignup]] = [useState(false)];

  const handleUserSignup = (unknownuser) => {
    if (boolsignup) {
      const { 'unknownuser CRUD': url } = mealdbkeys;
      const { fetchcrudOperation } = fetcher(url);
      fetchcrudOperation('POST', unknownuser);
    }
  };
  const handleUserSignin = (user) => {
    if (boolsignup === false) {
      const { 'unknownuser CRUD': url, userExist } = mealdbkeys;
      const { fetchcrudOperation } = fetcher(url, ((e) => {
        if (e.length > 0) {
          Usession('active', true);
          Usession('activesession', e[0]);
        }
      }
      ));
      fetchcrudOperation('GET', userExist(user));
    }
  };

  const switchForm = (form) => {
    const Cond0 = boolsignup !== form;
    if (Cond0) {
      setboolsignup(form);
    }
  };

  return (
    <div className="pad_l24 pad_r24 col">
      <div className="pad_l24 pad_r24 col">
        <span className="f_4">Welcome to dothiscooking</span>
        <span>Happy to have you here :)</span>
        <div className="corebox_0" />
        <div>
          {JSON.stringify(session)}
        </div>
        <Forminput
          id="Signform"
          entries={boolsignup ? newuser : newsession}
          handleCapture={boolsignup ? handleUserSignup : handleUserSignin}
        />
        <button form="Signform" type="submit" onClick={() => switchForm(false)} value="Submit" className="corebox_2 border_0 back_0 btn_u">Sign in</button>
        <button form="Signform" type="submit" onClick={() => switchForm(true)} value="Submit" className="corebox_2 border_0 back_0 mar_t24 btn_u">Sign up</button>
      </div>
    </div>
  );
}

Portraitsign.propTypes = {
  u_session: PropTypes.func,
  session: PropTypes.shape({}),
};

Portraitsign.defaultProps = {
  u_session: () => 0,
  session: {},
};
const mapStatetoProps = ({ session }) => ({ session });
const mapDispatchtoProps = createMapDispatchtoProps();
export default connect(mapStatetoProps, mapDispatchtoProps)(Portraitsign);
