import PropTypes from 'prop-types';

export default function Rowsearch({ handleSubmit }) {
  const handleKeyDown = ({ code, target: { value: textsearch } }) => {
    if (code === 'Enter') {
      handleSubmit(textsearch);
    }
  };
  return (
    <div
      className="col center corebox_17 back_22 pic_pic0 cover"
      style={{ backgroundSize: 'cover' }}
    >
      <div className="col center corebox_9 tcenter ">
        <span className="f_4 f600 corebox_4 center">Easy way to make recipes</span>
        <span className="f_4 f600 center">What are you cooking today?</span>
      </div>
      <input data-testid="Rowsearchinput" placeholder="Search" className="back_0 corebox_0 maxedcorebox_x18  pad_24 " onKeyDownCapture={handleKeyDown} />
      <span className="back_0 corebox_0 maxedcorebox_x18  pad_l24 fore_4 borderbox">
        E.g Rice, Soup, Fish
      </span>
    </div>
  );
}

Rowsearch.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
