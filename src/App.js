import './App.scss';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { createMapDispatchtoProps } from './reducers/createDefaultreducer';
import Portraitmeals from './containers/Portraitmeals';
import Rownavigatormenu from './containers/Rownavigatormenu';
import Homepath from './containers/Portraithomepath';

// "csstree/validator": false
// since this project uses functions to choose over font and box sizes
// for both screens, trying to validate with csstree defeats the purpose
// of doing it since using functions is not recognized as standard even when it is working.

function App() {
  const paths = {
    '/recipe/:id': Portraitmeals,
    '/': connect(() => ({}), createMapDispatchtoProps())(Homepath),
  };

  return (
    <div className="App">

      <Rownavigatormenu />
      <Switch>
        {
          Object.entries(paths).map(
            ({ 0: route, 1: View }) => (<Route key={route} path={route}><View /></Route>),
          )
        }
      </Switch>

    </div>
  );
}

export default App;
