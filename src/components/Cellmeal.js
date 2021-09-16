import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Cellmeal({
  strMeal, strMealThumb, idMeal, marginh, marginv, key,
}) {
  const [history] = [useHistory()];
  const handleClick = () => {
    history.push(`/recipe/${idMeal}`);
  };

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      handleClick();
    }
  };
  return (
    <div key={key} role="button" tabIndex={0} data-testid="Cellmeal" className={`btn_u corebox_13  pad_l${marginh} pad_r${marginh} pad_t${marginv} pad_b${marginv}`} onClick={handleClick} onKeyDown={handleKeyDown}>
      <div className="allsize back_0 col">
        <div className="corebox_12 cover" style={{ backgroundImage: `url(${strMealThumb})`, backgroundSize: 'cover' }} />
        <div className="col pad_24">
          <div>{strMeal}</div>
        </div>
      </div>
    </div>
  );
}
Cellmeal.propTypes = {
  strMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  idMeal: PropTypes.string.isRequired,
  marginh: PropTypes.number.isRequired,
  marginv: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
};

export default Cellmeal;
