export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_USERS = 'GET_USERS';
export const STOP_FETCHING_USERS = 'STOP_FETCHING_USERS';
export const RESET = 'RESET';

export function getUsers(payload) {
	return (dispatch) => dispatch({ type: GET_USERS, payload });
}

export function addUser(payload) {
	return (dispatch) => dispatch({ type: ADD_USER, payload });
}

export function updateUser(payload) {
	return (dispatch) => dispatch({ type: UPDATE_USER, payload });
}

export function deleteUser(payload) {
	return (dispatch) => dispatch({ type: DELETE_USER, payload });
}

export function stopFetchingUsers() {
	return (dispatch) => dispatch({ type: STOP_FETCHING_USERS });
}

export function reset() {
	return (dispatch) => dispatch({ type: RESET });
}
