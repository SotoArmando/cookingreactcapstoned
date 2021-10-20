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
    <div key={strCategory} data-testid="Cellcategory" role="button" tabIndex={0} className={`btn_u    mar_l${marginh} mar_r${marginh} mar_t${marginv} mar_b${marginv} `} onClick={() => handleClick(strCategory)} onKeyDown={handleKeyDown}>
      <div className="allsize back_0 col center">
        <div className={`iconsize_27 pad_t24 mar_b24 svgicon_${strCategory.toLowerCase()}`} />
        <span>{strCategory}</span>
      </div>
    </div>
  );
}

Cellcategory.propTypes = {
  strCategory: PropTypes.string,
  marginh: PropTypes.number,
  marginv: PropTypes.number,
  handleClick: PropTypes.func,
};

Cellcategory.defaultProps = {
  handleClick: () => { },
  marginh: 12,
  marginv: 12,
  strCategory: 'Meat',
};

export default Cellcategory;
