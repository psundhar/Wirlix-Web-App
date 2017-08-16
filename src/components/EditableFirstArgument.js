import React, { Component } from 'react';

export default class EditableFirstArgument extends Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);

        this.state = {
            inputText: '',
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputText: nextProps.text || '',
        });
    };

    handleTextChange(e) {
        this.setState({
            inputText: e.target.value,
        });
    };

    render() {
        const { isEditable, text, handleEdit } = this.props;
        const { inputText } = this.state;

        const isDirty = (typeof inputText != 'undefined' && typeof text != 'undefined' && inputText != text);

        return (
            <div>
                <div  className="p2">
                    { isEditable && (<div><textarea style={{
                            width: "100%",
                            outline: "none",
                            color: "black",
                            backgroundColor: "white"
                        }} value={ inputText } onChange={ this.handleTextChange }>
                    </textarea></div>)}
                    { isEditable && isDirty && (<div className="flex justify-end mt1">
                        <button onClick={ () => { handleEdit(inputText); }} className="caps p1" style={{border:"1px solid black", color: "black", display:"inline-block", padding: ".5rem", width:"auto"}}>Edit</button>
                    </div>) }
                    { !isEditable && text && (<h4 style={{color: 'black', fontStyle: 'italic', textTransform: 'none'}}>{ text }</h4>) }
                </div>
                {
                    !text && (<h4 className="mt4">No opinion available</h4>)
                }
            </div>
        )
    }
}