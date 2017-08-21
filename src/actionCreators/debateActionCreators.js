import apiFetch from '../utilities/apiFetch';

export const updateDebateAction = (debate) => {
    return {
        type: 'UPDATE_DEBATE',
        debate,
    };
};

export const deleteDebateAction = (debateId) => {
    return {
        type: 'DELETE_DEBATE',
        debateId,
    }
}

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
        dispatch(updateDebate(debateId, { message: newMessageObj }));
    }
};

export const subscribeToDebate = (debateId) => {
    return (dispatch, getState) => {
        const { debates, user } = getState();

        const selectedDebate = debates.find(d => d._id == debateId);

        if(!selectedDebate) return;

        const sdSubscribers = selectedDebate.subscribers;

        let subscribed = "subscribe";

        if(sdSubscribers.some(sid => {
                return sid == user._id;
            })) { // Remove
            subscribed = "unsubscribe";
        }

        dispatch(updateDebate(debateId, { subscribed }));
    }
}

export const deleteDebate = (debateId) => {
    return (dispatch, getState) => {
        apiFetch('/api/debates/' + debateId, 'DELETE').then(res => {
            if(res.ok) {
                dispatch(deleteDebateAction(debateId));
            }
        })
    }
}