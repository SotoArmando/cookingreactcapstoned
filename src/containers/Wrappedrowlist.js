import React from 'react';
import PropTypes from 'prop-types';

/* eslint react/forbid-prop-types: 0 */

function Wrappedrowlist({
  item: Item, list, handleClick, basis, marginh, marginv, testid,
}) {
  return (
    <div data-testid={testid} className="corebox_16">
      <div className={`row  mbasis_${basis - 1} basis_${basis} nmar_l${marginh} nmar_r${marginh} nmar_t${marginv} nmar_b${marginv}`}>
        {
          (list).map((e, i) => Item({
            handleClick, marginh, marginv, ...e, key: [testid, i].join(''),
          }))
        }
      </div>
    </div>
  );
}

Wrappedrowlist.propTypes = {
  item: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
  basis: PropTypes.number,
  marginh: PropTypes.number,
  marginv: PropTypes.number,
  testid: PropTypes.string,
};

Wrappedrowlist.defaultProps = {
  handleClick: () => { },
  basis: 43,
  marginh: 12,
  marginv: 12,
  testid: 'Wrappedrowlist',
};

export default Wrappedrowlist;
