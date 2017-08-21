import apiFetch from '../utilities/apiFetch';

export const updateUserAction = (user) => {
    return {
        type: 'UPDATE_USER',
        user,
    }
};

export const updateUser = (userId, updates) => {
    apiFetch('/api/users/' + userId, 'PUT', )
        .then(res => {
            return res.json();
        })
        .then(json => {
            updateUserAction()
        })
};
