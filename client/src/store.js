import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import paymentReducer from "./reducers/paymentReducers";
import dateReducer from "./reducers/dateReducers";

const reducers = combineReducers({
  paymentData: paymentReducer,
  dateData: dateReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

export default store;
