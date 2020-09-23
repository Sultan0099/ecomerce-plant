import 'react-native-gesture-handler';
import React from 'react';

import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useDispatch } from "react-redux";
import thunk from 'redux-thunk';
import FlashMessage from "react-native-flash-message";


import rootReducer from './src/redux/reducers';
import MyApp from './src/MyApp';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => {

  return (
    <Provider store={store}>
      <MyApp />
      <FlashMessage position="top" />
    </Provider>
  );
};



export default App;
