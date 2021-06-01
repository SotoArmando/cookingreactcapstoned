import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetcher, mealdbkeys } from '../fetch';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';

function Portraitmeal({
  focusedmealdetails: details,
  Updateappstate,
}) {
  const [[loaded, setLoaded], { id }] = [useState(false), useParams()];

  const handleFetch = ({ meals: { 0: response } }) => {
    Updateappstate('focusedmealdetails', response);
  };

  const handleLoad = () => {
    const { 'Lookup full meal details by id': url } = mealdbkeys;
    fetcher(url + (id), handleFetch).fetch();
  };

  useEffect(() => {
    let isMounted = true;
    if (loaded === false && isMounted) {
      handleLoad();
      setLoaded(true);
    }
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="col" data-testid="Portraitmeal">
      {
                Object.entries(details).map(({ 0: k, 1: v }) => <span key={`Portraitmeal${k}`}>{v}</span>)
            }
    </div>
  );
}

Portraitmeal.propTypes = {
  focusedmealdetails: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strTags: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
  Updateappstate: PropTypes.func.isRequired,
};

const mapStatetoProps = ({ appstate: { focusedmealdetails } }) => ({ focusedmealdetails });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Portraitmeal);
