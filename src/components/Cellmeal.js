import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Cellmeal({
  strMeal, strMealThumb, idMeal, marginh, marginv,
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
    <div key={strMeal} role="button" tabIndex={0} data-testid="Cellmeal" className={`btn_u corebox_13 half_horizontalmar half_verticalmar mar_l${marginh} mar_r${marginh} mar_t${marginv} mar_b${marginv}`} onClick={handleClick} onKeyDown={handleKeyDown}>
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
};

export default Cellmeal;
