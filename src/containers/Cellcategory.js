import PropTypes from 'prop-types';

function Cellcategory({
  strCategory, handleClick, marginh, marginv,
}) {
  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      handleClick();
    }
  };
  return (
    <div data-testid="Cellcategory" role="button" tabIndex={0} className={`btn_u corebox_12   pad_l${marginh} pad_r${marginh} pad_t${marginv} pad_b${marginv}`} onClick={() => handleClick(strCategory)} onKeyDown={handleKeyDown}>
      <div className="allsize back_0 col center">
        <div className={`iconsize_34 pad_t24 mar_b24 svgicon_${strCategory.toLowerCase()}`} />
        <span>{strCategory}</span>
      </div>
    </div>
  );
}

Cellcategory.propTypes = {
  strCategory: PropTypes.string.isRequired,
  marginh: PropTypes.number.isRequired,
  marginv: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Cellcategory;
