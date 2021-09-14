import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';

function Rownavigatormenu({
  history,
  history: { length: historylength },
  session: { active },
  u_session: Usession,
}) {
  const { pathname } = useLocation();
  const handleSignout = () => Usession('active', false);
  const handleClick = (string) => {
    switch (string) {
      case ('Assistant'): history.push('/assistant'); break;
      case ('Settings'): history.push('/profile/settings'); break;
      case ('Library'): history.push('/profile/library'); break;
      case ('Save'): history.push('/profile/library'); break;
      case ('Sign'): history.push('/sign'); break;
      case ('Back'): history.goBack(); break;
      case ('Sign out'): handleSignout(); break;
      default: history.push('/'); break;
    }
  };

  const mapUrlwithcontrols = (string) => ['Save'][['/recipe/'].findIndex((e) => string.match(e))];
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
    <div key="Rownavigatormenucorebox_3" className="corebox_3" />,

  ];
}
Rownavigatormenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    length: PropTypes.number,
    push: PropTypes.func,
    goBack: PropTypes.func,
  }),
  session: PropTypes.shape({
    active: PropTypes.bool, activesession: PropTypes.shape({ nick: PropTypes.string }),
  }).isRequired,
  u_session: PropTypes.func,
};

Rownavigatormenu.defaultProps = {
  u_session: () => 0,
  history: {
    length: 0,
  },
};

const mapStatetoProps = ({ session }) => ({ session });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Rownavigatormenu);
