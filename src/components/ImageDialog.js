import React from 'react';

const ImageDialog = React.createClass({
    render() {
        const { handleCancel, handleConfirm} = this.props;

        return (
            <div id="image-conf" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <p>Are you sure you want to continue without a profile picture?</p>
                        <div className="col-xs-6 col-sm-6 col-md-6 confirm">
                            <button data-dismiss="modal" onClick={ () => handleConfirm() }>Yes</button>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 cancel">
                            <button data-dismiss="modal" onClick={ () => handleCancel() }>No</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    },
});


export default ImageDialog;