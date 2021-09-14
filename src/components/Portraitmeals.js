import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetcher, mealdbkeys } from '../fetch';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';

function Portraitmeal({
  appstate: {
    focusedmealdetails: {
      strArea, strCategory, strInstructions, strMeal, strMealThumb, strTags, strYoutube,
    },
  }, u_appstate: Uappstate,
}) {
  const [[loaded, setLoaded], { id = 0 }] = [useState(false), useParams(), useHistory()];

  const handleFetch = ({ meals: { 0: response } }) => {
    Uappstate('focusedmealdetails', response);
  };

  const handleLoad = () => {
    const { 'Lookup full meal details by id': url } = mealdbkeys;
    fetcher(url + (id), handleFetch).fetch();
  };

  useEffect(() => {
    if (loaded === false) {
      handleLoad();
      setLoaded(true);
    }
  }, [loaded, setLoaded]);

  return (
    <div className="col pad_22">
      <div
        className="corebox_14 "
        style={{
          backgroundImage: `url(${strMealThumb})`,
          backgroundSize: 'cover',
        }}
      />
      <span className="f_1 corebox_3 row items_center">{strMeal}</span>
      {
            [strArea, strCategory, strMealThumb, strTags, strYoutube].map(
              (e) => <span key={`Portraitmeallabel${e}`}>{e}</span>,
            )
        }
      <span className="pad_t22">
        {strInstructions}
      </span>

    </div>
  );
}
Portraitmeal.propTypes = {
  appstate: PropTypes.shape({
    focusedmealdetails: PropTypes.shape({
      strArea: PropTypes.string,
      strCategory: PropTypes.string,
      strInstructions: PropTypes.string,
      strMeal: PropTypes.string,
      strMealThumb: PropTypes.string,
      strTags: PropTypes.arrayOf(PropTypes.string),
      strYoutube: PropTypes.string,
    }),
  }),
  u_appstate: PropTypes.func,
};

Portraitmeal.defaultProps = {
  appstate: {},
  u_appstate: () => 0,
};

const mapStatetoProps = ({ appstate }) => ({ appstate });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Portraitmeal);
