/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Cellmeal({
  strMeal,
  idMeal,
  marginh,
}) {
  const [history, [state, setState]] = [useHistory(), useState({ marked: false, liked: false })];
  const { marked, liked } = state;
  const handleClick = (e) => {
    switch (e) {
      case ('Like'):
      case ('Liked'): {
        setState({ ...state, liked: !liked });
        break;
      }
      case ('Mark'):
      case ('Marked'): {
        setState({ ...state, marked: !marked });
        break;
      }
      default: {
        history.push(`/recipe/${idMeal}`);
        break;
      }
    }
  };

  return (
    <div data-testid="Cellmeal" className={`col space_between mar_l${marginh} mar_r${marginh} mar_t${marginh} mar_b${marginh} corebox_10 back_3 pad_22`}>
      <div
        className="btn_u"
        aria-hidden="true"
        onClick={() => (handleClick)()}
      >
        {strMeal}
      </div>
      <div className="row">
        {[liked ? 'Liked' : 'Like', marked ? 'Marked' : 'Mark'].map(
          (e, i) => (
            <span
              key={`cellmealchecks${e}`}
              onClick={() => handleClick(e)}
              className={`btn_u corebox_x5 ${[liked, marked][i] ? 'f600' : ''}`}
              aria-hidden="true"
            >
              {e}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

Cellmeal.propTypes = {
  strMeal: PropTypes.string,
  idMeal: PropTypes.string,
  marginh: PropTypes.number,
};

Cellmeal.defaultProps = {
  strMeal: '',
  idMeal: '',
  marginh: 0,
};

export default Cellmeal;
