
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import { getStudentReducer } from './reducer/studentReducer';


const reducer=combineReducers({
     getStudents:getStudentReducer
});

const middleware=[thunk];


const store=createStore(
     reducer,
     composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
