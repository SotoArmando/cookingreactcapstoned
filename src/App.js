import './App.scss';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { createMapDispatchtoProps } from './reducers/createDefaultreducer';
import Portraitmeals from './components/Portraitmeals';
import Portraitprofile from './components/Portraitprofile';
import Rownavigatormenu from './components/Rownavigatormenu';
import Portraitprofilesettings from './components/Portraitprofilesettings';
import Portraitprofilelibrary from './components/Portraitprofilelibrary';
import Portraitassistant from './components/Portraitassistant';
import Portraitassistantrecipe from './components/Portraitassistantrecipe';
import Portraitsign from './components/Portraitsign';
import Homepath from './components/Portraithomepath';

function App() {
  const paths = {
    '/recipe/:id': Portraitmeals,
    '/profile/library': Portraitprofilelibrary,
    '/profile/settings': Portraitprofilesettings,
    '/profile/:id': Portraitprofile,
    '/assistant/recipe/:id': Portraitassistantrecipe,
    '/assistant': Portraitassistant,
    '/sign': Portraitsign,
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
