import * as actions from '../actions';

const initialState = {
	users: []
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GET_USERS: {
			return {
				...state,
				users: action.payload
			};
		}
		case actions.RESET: {
			return {
				...initialState
			};
		}
		default: {
			return state;
		}
	}
};

export default userReducer;
