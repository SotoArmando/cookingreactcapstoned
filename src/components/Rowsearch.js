import PropTypes from 'prop-types';

export default function Rowsearch({ handleChange }) {
  return (
    <div
      className="col center corebox_17 back_22 pic_pic0 cover mobilepad_22"
      style={{ backgroundSize: 'cover' }}
    >
      <div className="col center corebox_9 tcenter ffam_poppins ">
        <span className="f_4 f600 corebox_4 mobilecorebox_0 center  f_m_1">Easy way to make recipes</span>
        <span className="f_4 f600 center ">What are you cooking today?</span>
      </div>
      <input data-testid="Rowsearchinput" placeholder="Search" className="back_0 corebox_0 maxedcorebox_1 maxedcorebox_x18  pad_24 " onKeyDownCapture={handleChange} />
      <span className="back_0 corebox_0 maxedcorebox_x18  maxedcorebox_0 pad_l24 fore_4 borderbox">
        E.g Rice, Soup, Fish
      </span>
    </div>
  );
}

Rowsearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
