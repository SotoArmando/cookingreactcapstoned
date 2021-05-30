import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';


import linkpersistedstore from './reducers/store';
import { waitFor } from "@testing-library/dom";
import { fireEvent, screen } from "@testing-library/dom";
import { App } from "./App";
import { createEvent } from "@testing-library/dom";


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

test('fetchs and loads Filter by Category,List all meal categories, List all Latest Meals ', async () => {
  const { store, persistor } = linkpersistedstore();
  await act(async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>, container)
  })

  await waitFor(() => { expect(container.querySelectorAll('[data-testid="Cellcategory"]').length).toBe(14) })

  await waitFor(() => expect(container.querySelectorAll(' [data-testid="WrappedrowlistLatest"] [data-testid="Cellmeal"]').length).toBeGreaterThan(0)
  )
  await waitFor(() => expect(container.querySelectorAll(' [data-testid="Wrappedrowlistlibrary"] [data-testid="Cellmeal"]').length).toBeGreaterThan(0))
})

it('fetchs filter by search ', async () => {
  const { store, persistor } = linkpersistedstore();
  await act(async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>, container)
  })

  let rowsearchinput = container.querySelector('[data-testid="Rowsearchinput"]')
  rowsearchinput.value = 'Rice'
  fireEvent.keyDown(rowsearchinput, { key: 'Enter', code: 'Enter' })

  expect(
    container.querySelectorAll(' [data-testid="Wrappedrowlistlibrary"] [data-testid="Cellmeal"]').length).toBe(0)

  await waitFor(() => expect(container.querySelectorAll(' [data-testid="Wrappedrowlistlibrary"] [data-testid="Cellmeal"]').length).toBeGreaterThan(0))

})


it('filters by category', async () => {
  const { store, persistor } = linkpersistedstore();
  await act(async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>, container)
  })

  const [category_0] = await waitFor(() => screen.getAllByTestId("Cellcategory"));

  const myEvent = createEvent.click(category_0, { button: 2 })
  fireEvent(category_0, myEvent)

  await waitFor(() => expect(container.querySelectorAll(' [data-testid="Wrappedrowlistlibrary"] [data-testid="Cellmeal"]').length).toBeGreaterThan(0))

  const myEvent1 = createEvent.click(category_0, { button: 2 })
  fireEvent(category_0, myEvent1)

  await waitFor(() => expect(container.querySelectorAll(' [data-testid="Wrappedrowlistlibrary"] [data-testid="Cellmeal"]').length).toBeGreaterThan(0))
})

