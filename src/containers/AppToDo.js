import React, {Component} from "react";
import ListActions from '../components/ListActions';
import {connect} from 'react-redux';
import InputTask from '../components/InputTask'
import FilteredList from './FilteredList'

import '../polyfills/findIndex';

import '../App.css';
import {addTask, setFilter, sortBy} from "../actions";

class AppToDo extends Component {

    getNextID = () => {
        const items = this.props.items;
        if (!items.length) return 0;
        const maxItem = items.reduce((prev, cur) => parseInt(prev.id) > parseInt(cur.id) ? prev : cur);
        return maxItem.id++;
    }

    render() {
        return (
            <div className="container">
                <div className="col-lg-9 col-sm-12 p-1">
                    <h1 className="mt-1">Simple todo's app</h1>
                    <InputTask sendTask={title => this.props.dispatch(addTask(title, this.getNextID()))}/>
                    <ListActions {...this.props}
                                 sortTasks={v=>this.props.dispatch(sortBy(v))}
                                 setFilter={v=>this.props.dispatch(setFilter(v))} />
                    <FilteredList />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps)(AppToDo)
