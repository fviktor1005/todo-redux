import React from 'react';

const ListActions = (props)=> {
    const onSortClick = (event) => {
        const sortBy = event.target.id;
        props.sortTasks(sortBy);
    }

    return(
        <div className="btn-group btn-group-toggle mb-3" data-toggle="buttons">

            <label className={`btn btn-light ${(props.sortBy === 'asc') ? 'active' : ''}`}>
                <input type="radio" name="options" id="asc" onClick={onSortClick} /> Asc
            </label>
            <label className={`btn btn-light ${(props.sortBy === 'desc') ? 'active' : ''}`}>
                <input type="radio" name="options" id="desc" onClick={onSortClick}/> Desc
            </label>
            <label className={`btn ${(props.showCompleted) ? 'btn-info active' : 'btn-outline-info'}`}>
                <input type="checkbox" onClick={props.setFilter} aria-pressed={props.showCompleted} data-toggle="button" /> Show completed
            </label>

        </div>
    )
}




export default ListActions;