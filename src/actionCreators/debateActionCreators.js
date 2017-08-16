import apiFetch from '../utilities/apiFetch';

export const updateDebateAction = (debate) => {
    return {
        type: 'UPDATE_DEBATE',
        debate,
    };
};

export const updateDebate = (debateId, updatedDebate) => {
    return dispatch => {
        apiFetch('/api/debates/' + debateId, 'PUT', updatedDebate)
        .then(res => res.json())
        .then(json => {
            dispatch(updateDebateAction(json));
        });
    };
};

export const createDebateMessage = (debateId, text, isModerator) => {
    return (dispatch, getState) => {
        const { user, debates } = getState();

        const newMessageObj = {
            text,
        };

        if(!isModerator) {
            newMessageObj['user'] = user._id;
        }
        else {
            newMessageObj['moderator'] = true;
        }

        // Update db state
        apiFetch('/api/debates/' + debate._id, 'PUT', {
            message: newMessageObj
        })
        .then(res => res.json())
        .then(json => {
            dispatch(updateDebateAction(json));
        })
        .catch(err => console.log(err));
    }
};