import apiFetch from '../utilities/apiFetch';

export const updateUserAction = (user) => {
    return {
        type: 'UPDATE_USER',
        user,
    }
};

export const updateUser = (userId, updates) => {
    return dispatch => {
        apiFetch('/api/users/' + userId, 'PUT', updates)
        .then(res => {
            return res.json();
        })
        .then(json => {
            dispatch(updateUserAction(json));
        })
    }
};
