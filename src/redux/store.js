import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";

import rootReducer from "./reducers/index";
import { Provider } from "react-redux";

let composeEnhancers = compose;
try {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} catch (err) {}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...[thunk]))
);

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
