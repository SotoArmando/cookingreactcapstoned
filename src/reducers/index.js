/* eslint-disable function-paren-newline */
import { combineReducers } from 'redux';
import { createDefaultreducer } from './createDefaultreducer';

const resources = [{}, 'session', 'appstate'];
const reducers = resources.reduce(
  (total, e) => ({ ...(total || {}), [e]: createDefaultreducer(e) }));
const rootReducer = combineReducers(reducers);

export { rootReducer, reducers };
