import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import paymentReducer from "./reducers/paymentReducers";
import dateReducer from "./reducers/dateReducers";
import userReducer from "./reducers/userReducer";
import loginReducer from "./reducers/loginReducer";

const reducers = combineReducers({
  paymentData: paymentReducer,
  dateData: dateReducer,
  loginData: loginReducer,
  userData: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

export default store;
