import React from 'react';

const ChallengeDialog = React.createClass({
    render() {
        const {statementId, user, handleCancel, handleConfirm, topicId} = this.props;

        return (
            <div id="challenge-conf" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <p>Are you sure you want to challenge this statement and enter a debate?</p>
                        <div className="col-md-6 cancel">
                            <button data-dismiss="modal" onClick={ () => handleCancel() }>Cancel</button>
                        </div>
                        <div className="col-md-6 confirm">
                            <button data-dismiss="modal" onClick={ () => handleConfirm(statementId, topicId, user) }>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
});


export default ChallengeDialog;