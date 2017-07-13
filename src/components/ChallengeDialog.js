import React from 'react';

export default ({}) => {
    return (
        <div id="challenge-conf" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <p>Are you sure you want to challenge <span>Username</span> to a debate?</p>
                    <div className="col-md-6 cancel">
                        <button data-dismiss="modal">Cancel</button>
                    </div>
                    <div className="col-md-6 confirm">
                        <button data-dismiss="modal">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}