import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router';

const paths = {
  "/": Homepath(),
}

console.log(Object.entries(paths))

function Homepath() {
  return <div>
    App.js says: Hello World!
  </div>
}

function App() {
  return (
    <div className="App">
      <Switch >
        {
          // Object.entries(paths).forEach(([path, component]) => <Route  path="/">
          //   <Homepath/>
          // </Route>)
          <Route path="/">
            path says hello world
          </Route>

        }
      </Switch>
    </div>
  );
}


export default App;
