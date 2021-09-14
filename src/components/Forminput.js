import PropTypes from 'prop-types';
import { useState } from 'react';

function Forminput({
  entries, vmargin = 20, handleCapture, id,
}) {
  const [[state, setState], [status, setStatus]] = [useState({}), useState('')];

  const handlekeyUp = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const isValid = () => entries.every(([key, { regex }]) => (state[key] || '').match(regex || '.{1,}'));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid()) {
      setStatus(`state is valid ${JSON.stringify(state)}`);

      delete state.confirmpassword;

      handleCapture(state);
    } else {
      setStatus(`state is not valid ${JSON.stringify(state)}`);
    }
  };

  return [
    <form key={id} id={id} onSubmit={handleSubmit} onKeyUpCapture={handlekeyUp} className={`col overflowhidden nmar_b${vmargin} nmar_t${vmargin}`}>
      {
            entries.map(
              ({ 0: key, 1: { holder = false, regex = '.{1,}', type = 'text' } }, required = true) => (
                <input
                  key={`Forminput${key}`}
                  name={key}
                  placeholder={holder || key}
                  pattern={regex}
                  type={type}
                  required={required}
                  className={`corebox_2 border_0 mar_t${vmargin} mar_b${vmargin}`}
                />
              ),
            )
        }
    </form>,
    <div key={`${id}status`} className="corebox_2 items_center row">{status}</div>,
  ];
}

Forminput.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    0: PropTypes.string,
    1: PropTypes.shape({
      holder: PropTypes.bool,
      regex: PropTypes.string,
      type: PropTypes.string,
    }),
  })),
  vmargin: PropTypes.number,
  handleCapture: PropTypes.func,
  id: PropTypes.string,
};

Forminput.defaultProps = {
  entries: [],
  vmargin: 20,
  handleCapture: () => 0,
  id: '0',
};
export default Forminput;
