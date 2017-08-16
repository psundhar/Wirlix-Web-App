export default (state = [], action) => {
    console.log(state);
    switch(action.type) {
        case 'UPDATE_STATEMENT': {
            return state;
        }
        case 'CREATE_STATEMENT': {
            const statements = [...state];

            statements.push(action.statement);

            return statements;
        }
    }
    return state;
};