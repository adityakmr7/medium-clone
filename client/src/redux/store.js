import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "./reducers/authReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  combineReducers({
    auth: authReducer,
  }),
  {}, // initial state
  compose(
    applyMiddleware(sagaMiddleware),
    // If you are using the devToolsExtension, you can add it here also
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
sagaMiddleware.run(rootSaga);
