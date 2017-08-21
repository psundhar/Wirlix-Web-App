export default (state = [], action) => {
    switch(action.type) {
        case 'UPDATE_USER': {
            const users = [...state];

            const indexToEdit = users.findIndex(u => u._id == action.user._id);

            if(indexToEdit > -1) {
                users[indexToEdit] = action.user;
            }

            return users;
        }
    }
    return state;
};
