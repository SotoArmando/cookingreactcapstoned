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

  const [{
    strMeal,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
    strSource,
  }, ingredients, measures] = [
    details,
    Object.entries(details).filter(([k, v]) => k.includes('strIngredient') && ((v || '').trim() !== '')),
    Object.entries(details).filter(([k, v]) => (k.includes('strMeasure')
        && ((v || '').trim() !== ''))),
  ];

  return (
    <div className="row basis_46 grow back_3">
      <div className="col relative">
        <div className="corebox_18 mobilecorebox_14 cover fixed halfbodywidth" style={{ backgroundImage: `url(${strMealThumb})` }} />
      </div>
      <div className="col pad_33 back_2" data-testid="Portraitmeal">
        <span className="f_4 f600">{strMeal}</span>
        <span>{strArea}</span>
        <span className="btn_u">{strSource}</span>
        <span className="f_0 lh_3 corebox_11 center">{strInstructions}</span>

        <div className="row basis_42 grow pad_t27 pad_b27">
          <div className="col">
            {ingredients.map(([k, v]) => <span key={k} className="row items_center corebox_0">{v}</span>)}
          </div>
          <div className="col">
            {measures.map(([k, v]) => <span key={k} className="row items_center corebox_0">{v}</span>)}
          </div>

        </div>
        <div className="row">
          {

            (strTags || '').split(',').map((e) => <span key={`tag${e}`} className="pad_r30 center f500">{e}</span>)
          }
        </div>
        <span>{strYoutube}</span>

      </div>
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
