import React, { Component } from 'react';

class EditableBio extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="rounded" style={{backgroundColor: "white",  color: "black"}}>
                <textarea placeholder="bio" className="rounded" style={{width: "100%", outline: "none"}}></textarea>
                <button className="rounded">Edit</button>
            </div>
        )
    };
};

export default EditableBio;