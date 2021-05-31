import React from 'react';
import PropTypes from 'prop-types';

/* eslint react/forbid-prop-types: 0 */

function Wrappedrowlist({
  item: Item, list, handleClick, basis = 43, marginh = 12, marginv = 12, testid = 'Wrappedrowlist',
}) {
  return (
    <div data-testid={testid} className="corebox_16">
      <div className={`row  mbasis_${basis - 1} basis_${basis} nmar_l${marginh} nmar_r${marginh} nmar_t${marginv} nmar_b${marginv}`}>
        {
          (list || []).map((e) => Item({
            ...e, handleClick, marginh, marginv,
          }))
        }
      </div>
    </div>
  );
}

Wrappedrowlist.propTypes = {
  item: PropTypes.shape.isRequired,
  list: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  basis: PropTypes.number.isRequired,
  marginh: PropTypes.number.isRequired,
  marginv: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};

export default Wrappedrowlist;
