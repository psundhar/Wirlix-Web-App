import apiFetch from '../utilities/apiFetch';

export const createChallengeAction = (challenge) => {
    return {
        type: 'CREATE_CHALLENGE',
        challenge,
    };
};

export const createChallenge = (statementId, topicId, user) => {
    return (dispatch) => {
        apiFetch('/api/challenges', 'POST', {
        statement: statementId,
        challenger: user._id,
        topic: topicId,
        })
        .then(res => res.json())
        .then(json => {
            dispatch(createChallengeAction(json));
        });
    }
};

