export default (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_USER': {
            return Object.assign({}, state, action.user);
        }
    }
    return state;
};
