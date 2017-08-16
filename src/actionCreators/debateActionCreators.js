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
