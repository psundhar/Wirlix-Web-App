import React, { Component } from 'react';

class EditableBio extends Component {
    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);

        this.state = {
            inputText: props.text || '',
        }
    };

    handleTextChange(e) {
        this.setState({inputText: e.target.value});
    };

    render() {

        const { isEditable, text } = this.props;

        return (
            <div className="rounded p3 align-left" style={{backgroundColor: "rgba(255,255,255,.5)", border: "2px solid white", color: "black", textAlign: "left"}}>
                <div className="mb1">
                    <span className="caps bold mb3">Bio</span>
                </div>
                { isEditable ? (<textarea className="rounded p2" style={{
                    width: "100%",
                    outline: "none",
                    color: "black",
                    backgroundColor: "white"
                }} value={ this.state.inputText } onChange={ this.handleTextChange }></textarea>) :
                    (
                        <p>{ text }</p>
                    )
                }
                { isEditable && (<div className="flex justify-end mt1">
                    <button className="caps p1" style={{border:"1px solid black", display:"inline-block", width:"auto"}}>Edit</button>
                </div>) }
            </div>
        )
    };
};

export default EditableBio;