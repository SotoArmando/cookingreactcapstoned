import './App.scss';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { createMapDispatchtoProps } from './reducers/createDefaultreducer';
import Portraitmeals from './components/Portraitmeals';
import Rownavigatormenu from './components/Rownavigatormenu';
import Homepath from './components/Portraithomepath';

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
