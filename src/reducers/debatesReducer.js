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
    }
    return state;
};
