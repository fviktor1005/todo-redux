import { combineReducers } from 'redux'
import itemsFromJson from '../data/items'
import {ADD_TODO, DELETE_TODO, EDIT_TODO, SET_SORTBY, FILTER_TODO} from '../constants/ActionTypes'

const initialState = {
    items: itemsFromJson,
    title: 'an empty task...',
    filter: {},
    sortBy: '',
    showCompleted: false
};

export default function (state, action) {

    const newState = {...state};
    let newItem;

    switch (action.type){
        case ADD_TODO:
            newItem = {...action.task};
            newState.items = [...state.items, newItem];
            newState.sortBy = '';
            return newState;
        case SET_SORTBY:
            newState.items = state.items.sort(compareTitles(action.sortBy));
            newState.sortBy = action.sortBy;
            return newState;
        case DELETE_TODO:
           const items = state.items.filter(item => (item.id !== action.id));
           newState.items = items;
           return newState;
        case EDIT_TODO:
            newItem = state.items.find(item => item.id === action.id);
            newItem[action.attr] = action.value;
            newState.items = state.items.map(item => (item.id === action.id) ? newItem : item);
            //console.log(newState);
            return newState;
        case FILTER_TODO:
            newState.showCompleted = !state.showCompleted;
            return newState;
        default:
            return state || initialState;
    }
}

const compareTitles = (sortBy) => (a, b) =>{
    let result = 0;

    if (a.title.toUpperCase() > b.title.toUpperCase()) {
        result = 1;
    }
    if (a.title.toUpperCase() < b.title.toUpperCase()) {
        result = -1;
    }

    return (sortBy === 'asc') ? result : result * -1;
}

//export default mainReducer = combineReducers({addTask, deleteTask})