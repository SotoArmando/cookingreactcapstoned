import React from "react";
import PropTypes from "prop-types";

import { useRef } from "react";
import { useState } from "react";

/* eslint react/forbid-prop-types: 0 */

function Wrappedrowlist({
  item: Item,
  list,
  handleClick = () => 0,
  basis,
  marginh,
  marginv,
  testid,
  className,
  marginvoff,
  g,
}) {


  
  return (
    <div data-testid={testid} className="wrappedrowcontainer">
      <div
        className={`row half_horizontalmar half_verticalmar mbasis_${
          basis - 1
        } ${g || ""}basis_${basis} nmar_l${marginh} nmar_r${marginh} nmar_t${
          marginvoff || marginv
        } nmar_b${marginvoff || marginv} ${className || ""}`}
      >
        {list.map((e, i) => (
              <Item key={[Item.name || Item.displayName, i].join("")}
                {...{
                  handleClick,
                  marginh,
                  marginv,
                  flexgrow: 1,
                  ...e,
                  key: [Item.name || Item.displayName, i].join("")
                }}
              />
            ))}
      </div>
    </div>
  );
}

Wrappedrowlist.propTypes = {
  item: PropTypes.func,
  list: PropTypes.array,
  handleClick: PropTypes.func,
  basis: PropTypes.number,
  marginh: PropTypes.number,
  marginv: PropTypes.number,
  testid: PropTypes.string,
};

Wrappedrowlist.defaultProps = {
  handleClick: () => 0,
  basis: 43,
  marginh: 12,
  marginv: 12,
  testid: "Wrappedrowlist",
  item: () => {},
  list: [],
};

export default Wrappedrowlist;
