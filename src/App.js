import React, { Component } from 'react';
import List from './components/List';
import ListActions from './components/ListActions';
import './App.css';
import itemsFromJson from './data/items';

class App extends Component {
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
        console.log(state);
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
        const items = this.state.items.sort(App.compareTitles(sortBy));
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
            filtered: [...this.state.items, newItem],
            title: '',
            sortBy: ''
        })
    }

    removeItem = (id) => {
        let items = this.state.items;
        items = items.filter((item)=> {
            return item.id !== id;
        });
        this.setState({items, filtered: []});
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

    componentDidMount(){
        this.getNextID();
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
                <header className="App-header">
                    <h1 className="App-title">Demo app</h1>
                </header>

                <div className="col-9">
                    <div className="input-group input-group-lg mb-5">
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

export default App;
