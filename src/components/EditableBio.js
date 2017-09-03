import React, { Component } from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

class EditableBio extends Component {
    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);

        this.state = {
            inputText: '',
            isEditing: false
        };
    };

    handleTextChange(e) {
        this.setState({inputText: e.target.value});

    };

    handleSaveChangesClick() {
      this.setState({ isEditing: false })
    }

    handleModifyClick() {
        this.setState({ isEditing: true })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputText: nextProps.bio || '',
        });
        Alert.success('Changes Saved!!!');
    };

    render() {

        const { isEditable = false, bio, handleEdit } = this.props;
        const { inputText, isEditing } = this.state;
        const isDirty =!!inputText;
            //(typeof inputText != 'undefined' && typeof bio != 'undefined' && inputText != bio);

        return (

            <div className="rounded p3 align-left" style={{backgroundColor: "rgba(255,255,255,.5)", border: "2px solid white", color: "black", textAlign: "left"}}>
                <div className="mb1">
                    <span className="caps bold mb3">Bio</span>
                </div>
                { isEditable ? (<textarea className="rounded p2"
                style={{
                    width: "100%",
                    outline: "none",
                    color: "black",
                    backgroundColor: "white"
                }}
                disabled={!isEditing}
                value={ inputText }
                onChange={ this.handleTextChange }></textarea>) :
                    (
                        <p>{ bio   || 'None added yet' }</p>
                    )
                }
                { isEditable && isDirty && !isEditing && (<div className="flex justify-end mt1">
                    <button onClick={ () => this.handleModifyClick()} className="caps  p1" style={{border:"1px solid black", display:"inline-block", width:"auto"}}>Modify</button>
                </div>) }

              { isEditing && (<div className="flex justify-end mt1">
                  <button onClick={() => {
                      this.handleSaveChangesClick()
                      handleEdit(inputText)
                  }}
                  className="caps  p1"
                  style={{border:"1px solid black", display:"inline-block", width:"auto"}}>
                      Save Changes
                  </button>
              </div>) }
            </div>
        )
    };
};

export default EditableBio;