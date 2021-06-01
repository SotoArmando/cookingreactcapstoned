import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import {
  waitFor, fireEvent, screen, createEvent,
} from '@testing-library/dom';

import App from '../App';

import linkpersistedstore from '../reducers/store';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
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

// it('fetchs filter by search ', async () => {
//   const { store, persistor } = linkpersistedstore();
//   await act(async () => {
//     render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <BrowserRouter>
//             <App />
//           </BrowserRouter>
//         </PersistGate>
//       </Provider>, container,
//     );
//   });

//   const rowsearchinput = container.querySelector('[data-testid="Rowsearchinput"]');
//   rowsearchinput.value = 'Rice';
//   fireEvent.keyDown(rowsearchinput, { key: 'Enter', code: 'Enter' });

//   expect(
//     container.querySelectorAll(' [data-testid="Wrappedrowlistlibrary"] [data-testid="Cellmeal"]').length,
//   ).toBe(0);

//   await waitFor(() => expect(container.querySelectorAll(' [data-testid="Wrappedrowlistlibrary"] [data-testid="Cellmeal"]').length).toBeGreaterThan(0));
// });

// it('filters by category', async () => {
//   const { store, persistor } = linkpersistedstore();
//   await act(async () => {
//     render(
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <BrowserRouter>
//             <App />
//           </BrowserRouter>
//         </PersistGate>
//       </Provider>, container,
//     );
//   });

//   const [Category0] = await waitFor(() => screen.getAllByTestId('Cellcategory'));

//   const myEvent = createEvent.click(Category0, { button: 2 });
//   fireEvent(Category0, myEvent);

//   await waitFor(() => expect(container.querySelectorAll(' [data-testid="Wrappedrowlistlibrary"] [data-testid="Cellmeal"]').length).toBeGreaterThan(0));

//   const myEvent1 = createEvent.click(Category0, { button: 2 });
//   fireEvent(Category0, myEvent1);

//   await waitFor(() => expect(container.querySelectorAll(' [data-testid="Wrappedrowlistlibrary"] [data-testid="Cellmeal"]').length).toBeGreaterThan(0));
// });
