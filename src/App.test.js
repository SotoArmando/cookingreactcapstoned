import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Homepath, Portraitmealpath, App } from './App';
import Portraitmeal from './components/Portraitmeal';
import Cellcategory from './containers/Cellcategory';
import Cellmeal from './containers/Cellmeal';
import Fixedrownav from './containers/Fixedrownav';
import Rowsearch from './containers/Rowsearch';
import Wrappedrowlist from './containers/Wrappedrowlist';
import { Defaultstate } from './fetch';
import { createMapDispatchtoProps } from './reducers/createDefaultreducer';
import linkpersistedstore from './reducers/store';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});

test('renders all containers', () => {
  let datasample_0 = [{
    strMeal: "asd", strMealThumb: "asd", idMeal: 1
  }]
  let { 0: components, 1: props } = {
    0: [
      Cellcategory,
      Cellmeal,
      Fixedrownav,
      Wrappedrowlist,
      Rowsearch
    ],
    1: [
      { strCategory: "Category x" },
      { strMeal: "Nice recipe 0", strMealThumb: "google.com", idMeal: "0" },
      { height: 4 },
      { list: datasample_0, item: Cellmeal },
      { handleSubmit: (search) => { } }
    ]
  }

  render(components.map((View, index) => <View {...props[index]} />));
});

test('renders all components', () => {
  let { 0: containers, 1: props } = {
    0: [
      Portraitmeal,
    ],
    1: [
      { ...Defaultstate, u_appstate: () => { } },
    ]
  }

  const { store, persistor } = linkpersistedstore();

  render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {containers.map((View, index) => <View {...props[index]} />)}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );

});

test('renders all paths', () => {
  const { store, persistor } = linkpersistedstore();
  let { 0: paths, 1: props } = {
    0: [
      Portraitmealpath,
      connect(() => ({}), createMapDispatchtoProps())(Homepath),
    ],
    1: [
      {},
      { ...Defaultstate, u_appstate: () => { } },
    ]
  }

  render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {paths.map((View, index) => <View {...props[index]} />)}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );

});

test('fetchs and loads Filter by Category,List all meal categories, Filter by Latest ', async () => {
  const { store, persistor } = linkpersistedstore();

  render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
    , container);

  jest.useFakeTimers();
  jest.runAllTimers();
  
  act(() => {
    /* fire events that update state */
  });
  expect(document.querySelectorAll(".row.nmar_l21.nmar_r21.nmar_t27.nmar_b27").length).toBe(3)
  
})