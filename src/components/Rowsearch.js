import PropTypes from 'prop-types';

export default function Rowsearch({ handleSubmit }) {
  const handleKeyDown = ({ code, target: { value: textsearch } }) => {
    if (code === 'Enter') {
      handleSubmit(textsearch);
    }
  };
  return (
    <div>
      <input data-testid="Rowsearchinput" placeholder="Search " onKeyDownCapture={handleKeyDown} className="corebox_2 border_0 mar_b22 mar_t22" />
    </div>
  );
}

Rowsearch.propTypes = {
  handleSubmit: PropTypes.func,
};

Rowsearch.defaultProps = {
  handleSubmit: () => 0,
};
