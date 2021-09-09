import { combineReducers } from 'redux';
import user from './user';

const createReducer = () => combineReducers({ user });

export default createReducer;
