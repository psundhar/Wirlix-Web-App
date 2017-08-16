import apiFetch from '../utilities/apiFetch';

export const updateStatementAction = (statement) => {
    return {
        type: 'UPDATE_STATEMENT',
        statement,
    };
};

export const createStatementAction = (statement) => {
    return {
        type: 'CREATE_STATEMENT',
        statement,
    };
};

export const createStatement = (statement, userObj) => {
    return (dispatch, getState) => {
        apiFetch('/api/statements', 'POST', statement)
        .then(res => res.json())
        .then(statement => {
            statement.user = userObj;
            dispatch(createStatementAction(statement))
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const voteOnStatement = (statementId, isRational) => {
    return (dispatch, getState) => {
        apiFetch('/api/statements/' + statementId, 'PUT', {isRational})
        .then(res => res.json())
        .then(json => {
            dispatch(updateStatementAction(json));
        })
        .catch((err) => {
            console.log(err);
        });
    };
};


