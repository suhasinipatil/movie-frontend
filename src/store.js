// src/store.js
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.payload };
        default:
            return state;
    }
}

const store = configureStore({
    reducer,
});

export default store;