import * as types from '../constants/ActionTypes'

export const addTask = (title, id) => (
    {
        type: types.ADD_TODO,
        task: {
            title,
            id,
            completed: false
        }
    }
)

export const removeTask = id => (
    {
        type: types.DELETE_TODO,
        id
    }
)


export const editItem = (id, attr, value) => (
    {
        type: types.EDIT_TODO,
        id, attr, value
    }
)

export const setFilter = (showCompleted) => (
    {
        type: types.FILTER_TODO,
        showCompleted
    }
)

export const sortBy = (sortBy) => (
    {
        type: types.SET_SORTBY,
        sortBy
    }
)