import { combineReducers } from 'redux';

import stateReducer from './state/state.reducer';

export default combineReducers({
  stateReducer: stateReducer,
});
