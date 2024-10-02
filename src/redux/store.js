import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/index";
import { Provider } from "react-redux";

let composeEnhancers = compose;
try {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} catch (err) {
  // Handle error or simply fall back to default compose
}

const store = createStore(
  rootReducer,
  //composeWithDevTools(applyMiddleware(thunk)),
  composeEnhancers(applyMiddleware(...[thunk]))
);

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
