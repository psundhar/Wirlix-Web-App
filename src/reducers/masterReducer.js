import { combineReducers } from 'redux';
import statements from './statementReducer';
import user from './userReducer';
import topic from './topicReducer';

export default combineReducers({
    statements,
    user,
    topic
});
