import React from 'react';

const List = props => (
    <ul className="list-group">
        {
            props.items.filter(item => item.completed === props.showCompleted || !item.completed)
                .map((item) =>
                {
                const btnClass = (item.completed) ? "btn-success" : "btn-outline-success";

                const onChange = (event) => {
                    props.editItem(item.id, 'title', item.title);
                    item.title = event.target.value;
                }

                const onDoneClick = () => {
                    props.editItem(item.id, 'completed', true);
                }

                return (
                <li key={item.id} className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className={`btn ${btnClass}`} disabled={item.completed}
                                onClick={onDoneClick} type="button">done</button>
                    </div>
                    <input type="text" className={`form-control`} disabled={item.completed}
                           aria-describedby="basic-addon2" value={item.title} onChange={onChange}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-danger" type="button"
                                onClick={() => props.removeItem(item.id)}>remove</button>
                    </div>
                </li>
                )
            }

            )
        }
    </ul>
);

export default List;