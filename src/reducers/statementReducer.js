export default (state = [], action) => {
    switch(action.type) {
        case 'UPDATE_STATEMENT': {
            const statements = [...state];

            const indexToUpdate = statements.findIndex(s => s._id == action.statement._id);

            if(indexToUpdate > -1) {
                statements[indexToUpdate] = action.statement;
            }
            else {
                statements.push(action.statement);
            }

            return statements;
        }
        case 'CREATE_STATEMENT': {
            const statements = [...state];

            statements.push(action.statement);

            return statements;
        }
    }
    return state;
};