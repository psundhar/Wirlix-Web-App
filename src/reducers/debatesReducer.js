export default (state = [], action) => {
    switch(action.type) {
        case 'UPDATE_DEBATE': {
            const debates = [...state];

            const indexToUpdate = debates.findIndex(d => d._id == action.debate._id);

            if(indexToUpdate > -1) {
                debates[indexToUpdate] = action.debate;
            }

            return debates;
        }
        case 'DELETE_DEBATE': {
            const debates = [...state];

            const indexToDelete = debates.findIndex(d => d._id == action.debateId);

            if(indexToDelete > -1) {
                debates.splice(indexToDelete, 1);
            }

            return debates;
        }
    }
    return state;
};
