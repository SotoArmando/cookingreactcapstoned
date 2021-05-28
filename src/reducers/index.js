
import { combineReducers } from 'redux';
import { createDefaultreducer } from './createDefaultreducer';

let resources = [{}, "appstate"]
const reducers = resources.reduce((total, e) => ({ ...(total || {}), [e]: createDefaultreducer(e) }));
const rootReducer = combineReducers(reducers);

export { rootReducer, reducers };
