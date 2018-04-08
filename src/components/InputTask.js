import React from 'react';

export default (props) => {
    let input;

    function handleKeyPress(event){
        if (event.key === 'Enter'){
            sendTask();
        }
    }

    function sendTask(){
        const title = input.value.trim();

        if (!title) return;
        props.sendTask(title);
        input.value = '';
    }

    return (
        <div className="input-group input-group-lg mb-3">
            <input type="text" className="form-control" ref={node => input = node} onKeyPress={handleKeyPress}
                   aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={sendTask}>add</button>
            </div>
        </div>
    )
}