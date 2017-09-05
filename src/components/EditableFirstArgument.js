import React, { Component } from 'react';

export default class EditableFirstArgument extends Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);

        this.state = {
            inputText: '',
            isEditing: false
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

    handleSaveChangesClick() {
      this.setState({ isEditing: false })
    }

    handleModifyClick() {
      this.setState({ isEditing: true })
    }

    render() {
        const { isEditable=false, text, handleEdit } = this.props;
        const { inputText, isEditing } = this.state;

        const isDirty = !!inputText !=text;
            //(typeof inputText != 'undefined' && typeof text != 'undefined' && inputText != text);

        return (
            <div>
                <p>Opinion</p>
                { text && (<div style={{backgroundColor: "white", border: "4px solid "}} className="p2">
                    { isEditable && (<div><textarea
                      style={{
                        width: "100%",
                        outline: "none",
                        color: "black",
                        backgroundColor: "white"
                      }}
                      disabled={!isEditing}
                      value={ inputText }
                      onChange={ this.handleTextChange }>
                    </textarea></div>)}
                    { isEditable && isDirty && !isEditing && (<div className="flex justify-end mt1">
                        <button onClick={ () => { this.handleModifyClick() }} className="caps p1" style={{border:"1px solid black", color: "black", display:"inline-block", padding: ".5rem", width:"auto"}}>Click Here to Edit</button>
                    </div>) }
                    { isEditing && (<div className="flex justify-end mt1">
                        <button
                          onClick={ () => {
                            this.handleSaveChangesClick()
                            handleEdit(inputText);
                          }}
                          className="caps p1"
                          style={{border:"1px solid black", color: "black", display:"inline-block", padding: ".5rem", width:"auto"}}>
                            Save Changes
                        </button>

                    </div>) }
                    { !isEditable && text && (<h4 style={{color: 'black', fontStyle: 'italic', textTransform: 'none'}}>{ text }</h4>) }
                </div>) }
            </div>
        )
    }
}
