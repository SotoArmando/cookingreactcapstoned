import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Fixedrownav from './containers/Fixedrownav';

import Homepath from './components/Homepath';
import Portraitmealpath from './containers/Portraitmealpath';

function App() {
  const paths = {
    '/recipe/:id': Portraitmealpath,
    '/': Homepath,
  };
  return (
    <div className="App">
      <Fixedrownav heigth={5} />
      <Switch>
        {
          Object.entries(paths)
            .map(
              ({ 0: route, 1: View }) => <Route key={route} path={route}><View /></Route>,
            )
        }
      </Switch>
    </div>
  );
}

export { App, Homepath, Portraitmealpath };
