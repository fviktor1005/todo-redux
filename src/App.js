import React from 'react';
import AppToDo from "./containers/AppToDo";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/index'

const localStore = JSON.parse(localStorage.getItem('state'));

const store = createStore(reducer, localStore);

store.subscribe(() => localStorage.setItem('state', JSON.stringify(store.getState())));

export default () => (
    <Provider store={store}>
        <AppToDo />
    </Provider>
);
