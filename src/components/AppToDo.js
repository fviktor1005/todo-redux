import React, {Component} from "react";
import List from './List';
import ListActions from './ListActions';
import itemsFromJson from '../data/items';
import '../polyfills/findIndex';

import '../App.css';

class AppToDo extends Component {
    constructor(){
        super();
        const firstState = {
            items: itemsFromJson,
            title: 'an empty task...',
            filter: {},
            sortBy: '',
            showCompleted: false
        };
        const localItems = localStorage.getItem('state');
        const state = localItems === null ? firstState : {...JSON.parse(localItems)};
        //console.log(state);
        this.state = state;
    }

    static compareTitles = (sortBy) => (a, b) =>{
        let result = 0;

        if (a.title.toUpperCase() > b.title.toUpperCase()) {
            result = 1;
        }
        if (a.title.toUpperCase() < b.title.toUpperCase()) {
            result = -1;
        }

        return (sortBy === 'asc') ? result : result * -1;
    }

    sortTasks = (sortBy) => {
        const items = this.state.items.sort(AppToDo.compareTitles(sortBy));
        this.setState({items, sortBy});
    }

    setFilter = () => {
        this.setState({showCompleted: !this.state.showCompleted});
    }

    handleClickAdd = () => {
        this.addItem(this.state.title);
    }
    addItem = (title) => {
        if(!title) return;
        const newItem = {
            title: title,
            id: this.getNextID(),
            completed: false
        }

        this.setState({
            items: [...this.state.items, newItem],
            title: '',
            sortBy: ''
        })
    }

    removeItem = (id) => {
        let items = this.state.items.filter(item => item.id !== id);
        this.setState({items});
    }

    componentWillReceiveProps(nextProps) {
        console.log('will props');
    }

    editItem = (id, attr, value) => {
        const index = this.state.items.findIndex(item => item.id === id);
        const items = this.state.items;
        items[index][attr] = value;

        this.setState({items});
    }

    getNextID(){
        if (!this.state.items.length) return 0;
        const maxItem = this.state.items.reduce((prev, cur) => parseInt(prev.id) > parseInt(cur.id) ? prev : cur);
        return maxItem.id++;
    }

    onChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            this.handleClickAdd();
        }
    }

    componentDidUpdate(prevProps, prevState){
        localStorage.setItem('state', JSON.stringify(this.state));
        console.log('did update');
    }

    render() {
        return (
            <div className="container">
                <div className="col-lg-9 col-sm-12 p-1">

                    <h1 className="mt-1">Simple todo's app</h1>
                    <div className="input-group input-group-lg mb-3">
                        <input type="text" className="form-control"
                               value={this.state.title} onChange={this.onChange} onKeyPress={this.handleKeyPress}
                               aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.handleClickAdd}>add</button>
                        </div>
                    </div>

                    <ListActions {...this.state} sortTasks={this.sortTasks} setFilter={this.setFilter} />
                    <List {...this.state} removeItem={this.removeItem} editItem={this.editItem} />
                </div>
            </div>
        );
    }
}

export default AppToDo
