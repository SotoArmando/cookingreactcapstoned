import PropTypes from 'prop-types';

export default function Cellcategory({
  strCategory, handleClick, marginv, marginh,
}) {
  return (
    <div
      className={`btn_u col fore_s0  mar_l${marginh} mar_r${marginh} mar_t${marginv} mar_b${marginv} corebox_10 back_s0 pad_22`}
      onClick={() => handleClick(strCategory)}
      aria-hidden="true"
    >
      {strCategory}
    </div>
  );
}

Cellcategory.propTypes = {
  strCategory: PropTypes.string,
  handleClick: PropTypes.func,
  marginv: PropTypes.number,
  marginh: PropTypes.number,
};

Cellcategory.defaultProps = {
  strCategory: '',
  handleClick: () => 0,
  marginv: 20,
  marginh: 20,
};
