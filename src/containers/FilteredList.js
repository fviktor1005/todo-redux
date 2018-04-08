import React from 'react'
import List from '../components/List'
import {connect} from 'react-redux'
import {editItem, removeTask} from '../actions'


const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => (
    {
        removeItem: id => dispatch(removeTask(id)),
        editItem: (id, attr, value) => dispatch(editItem(id, attr, value))
    }
)

const FilteredList = connect(mapStateToProps, mapDispatchToProps)(List)

export default FilteredList