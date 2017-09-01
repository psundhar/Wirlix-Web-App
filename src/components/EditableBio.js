import React, { Component } from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

class EditableBio extends Component {
    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);

        this.state = {inputText: ''};
    };

    handleTextChange(e) {
        this.setState({inputText: e.target.value});

    };

    componentWillReceiveProps(nextProps) {

        this.setState({
            inputText: nextProps.bio || '',
        });
        Alert.success('Bio Saved');
    };

   

    render() {

        const { isEditable = false, bio, handleEdit } = this.props;
        const { inputText,text,user} = this.state;
        const isDirty =!!inputText;
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
                    <button onClick={ () =>handleEdit(inputText)  } className="caps  p1" style={{border:"1px solid black", display:"inline-block", width:"auto"}}>Edit</button>
                    <Alert effect='jelly' position='top-right' timeout= {5000} offset={150} />
                </div>) }
            </div>
        )
    };
};

export default EditableBio;