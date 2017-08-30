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
        const { isEditable=false, text, handleEdit } = this.props;
        const { inputText } = this.state;

        const isDirty = !!inputText;
            //(typeof inputText != 'undefined' && typeof text != 'undefined' && inputText != text);

        return (
            <div>
                    { isEditable ?(<div><textarea style={{
                            width: "100%",
                            outline: "none",
                            color: "black",
                            backgroundColor: "white"
                        }} value={ inputText } onChange={ this.handleTextChange }>
                    </textarea></div>):
                        <p> { text || (<h4 className="mt4">No opinion available</h4>)}</p>
                    }
                    { isEditable && isDirty && (<div className="flex justify-end mt1">
                        <button onClick={ () => { handleEdit(inputText) }} className="caps p1" style={{border:"1px solid black", color: "black", display:"inline-block", padding: ".5rem", width:"auto"}}>Edit</button>
                    </div>) }


            </div>
        )
    }
}