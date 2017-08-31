import React, { Component } from 'react';

class EditableBio extends Component {
    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);

        this.state = {inputText: '', showBioEdited:false,};
    };

    handleTextChange(e) {
        this.setState({inputText: e.target.value});
    };

    componentWillReceiveProps(nextProps) {

        this.setState({
            inputText: nextProps.bio || '',
            showBioEdited:false,
        });
    };

   

    render() {

        const { isEditable = false, bio, handleEdit } = this.props;
        const { inputText,text,user} = this.state;

        const isDirty =!!inputText != !!text;
            //(typeof inputText != 'undefined' && typeof bio != 'undefined' && inputText != bio);

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
                }} value={ inputText }  onChange={ this.handleTextChange }></textarea>) :
                    (
                        <p>{ bio   || 'None added yet' }</p>
                    )
                }
                { isEditable && isDirty && (<div className="flex justify-end mt1">
                    <button onClick={ () => handleEdit(inputText) } className="caps editButton p1" href="#" data-toggle="modal" data-target="#edit-conf"  style={{border:"1px solid black", display:"inline-block", width:"auto"}}>Edit</button>
                </div>) }

            <div id="edit-conf" className="modal fade" role="dialog">
            <div className="modal-dialog">
            <div className="modal-content">
            <p>Bio Edited !!</p>
            </div>
            </div>
            </div>
            </div>
        )
    };
};

export default EditableBio;