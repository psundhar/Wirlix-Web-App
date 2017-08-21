export default (state = [], action) => {
    switch(action.type) {
        case 'CREATE_CHALLENGE': {
            const challenges = [...state];

            challenges.push(action.challenge);

            return challenges;
        }
    }
    return state;
};
