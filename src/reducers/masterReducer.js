import { combineReducers } from 'redux';
import statements from './statementReducer';
import users from './userReducer';

import topic from './topicReducer';
import userChallenges from './userChallengesReducer';
import debates from './debatesReducer';

export default combineReducers({
    statements,
    users,
    authUserId: (state = null) => state,
    topic,
    userChallenges,
    debates,
});
