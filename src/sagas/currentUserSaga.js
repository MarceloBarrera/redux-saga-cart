import {take, put, call, apply} from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {GET_CURRENT_USER_INFO, setCurrentUser} from "./../actions/";

export function* currentUserSaga(){
    const {id} = yield take(GET_CURRENT_USER_INFO);
    const response = yield call(fetch,`http://localhost:8081/user/${id}`);
    const data = yield apply(response, response.json);
    //apply is like doing call except we also get to bind the scope of the method to whatever we choose
    //the reason we do this is we get an error if we just try to call response.json, response.json relies on the "this" scope
    //to tell it where it is and give it access to utility methods
    //this is a real async call

    yield put(setCurrentUser(data));



}