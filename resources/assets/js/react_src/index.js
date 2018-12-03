import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,  composeEnhancers(
    applyMiddleware(thunk)
  ));

/*
const store = createStore(rootReducer, 
    applyMiddleware(thunk));
*/

const app = <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>;


if (document.getElementById('app')) {

    ReactDOM.render(app, document.getElementById('app'));
}
