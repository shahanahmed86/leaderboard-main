export const GET_USERS = 'GET_USERS';
export const RESET = 'RESET';

export function getUsers(payload) {
	return (dispatch) => dispatch({ type: GET_USERS, payload });
}

export function reset(payload) {
	return (dispatch) => dispatch({ type: RESET });
}
