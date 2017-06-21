import { combineReducers } from 'redux';
import locationReducer from './location';
import user from './user';
import pics from './pics';
import notes from './notes';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user,
    pics,
    notes,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
