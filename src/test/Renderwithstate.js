import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { rootReducer } from '../reducers';

/* eslint react/prop-types: 0 */

const renderWithState = (
  ui,
  { initialState, ...renderOptions } = {},
) => {
  const store = createStore(rootReducer, initialState);
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderWithState;
