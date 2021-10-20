import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';

function Rownavigatormenu({
  history: { length: historylength },
  session: { active },
}) {
  const { pathname } = useLocation();
  const handleClick = (string) => {
    switch (string) {
      default: window.location.href = '/'; break;
    }
  };

  const mapUrlwithcontrols = (string) => [''][['/recipe/'].findIndex((e) => string.match(e))];
  return [
    <div key="Rownavigatormenu" className="corebox_3 nav row space_between items_center back_s1">

      <div className="row">
        {
        [
          (historylength > 2 ? (
            <span
              key="Rownavigatormenuback"
              role="button"
              tabIndex={0}
              onClick={() => handleClick('Back')}
              aria-hidden="true"
              className="corebox_x5 center btn_u"
            >
              Back
            </span>
          ) : []),
          ...[mapUrlwithcontrols(pathname)].map(
            (e) => (
              <span
                key={`mapUrlwithcontrols${e}`}
                onClick={() => handleClick(e)}
                aria-hidden="true"
                className="corebox_x5 center btn_u"
              >
                {e}
              </span>
            ),
          ),
        ]
      }
      </div>
      <div className="row pad_r24">
        {
        [['Home', 4]].filter((e, i) => [true, true, !active][i]).map(
          ([e, size]) => (
            <span
              key={`Rownavigatormenu${e}${size}`}
              onClick={() => handleClick(e)}
              aria-hidden="true"
              className={`corebox_x${size} center btn_u tcenter`}
            >
              {e}
            </span>
          ),
        )
      }

      </div>
    </div>,

  ];
}
Rownavigatormenu.propTypes = {

  history: PropTypes.shape({
    length: PropTypes.number,
    push: PropTypes.func,
    goBack: PropTypes.func,
  }),
  session: PropTypes.shape({
    active: PropTypes.bool, activesession: PropTypes.shape({ nick: PropTypes.string }),
  }).isRequired,
};

Rownavigatormenu.defaultProps = {
  history: {
    length: 0,
  },
};

const mapStatetoProps = ({ session }) => ({ session });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Rownavigatormenu);
