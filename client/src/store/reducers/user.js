import * as actions from '../actions';

const initialState = {
	users: [],
	canFetch: true,
	skip: 0,
	limit: 10
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GET_USERS: {
			action.payload.users.map((user1) => {
				const i = state.users.findIndex((user2) => user2._id === user1._id);
				if (i === -1) state.users.push(user1);
				return;
			});
			return {
				...state,
				skip: action.payload.skip,
				limit: action.payload.limit
			};
		}
		case actions.ADD_USER: {
			return {
				...state,
				users: [...state.users, action.payload]
			};
		}
		case actions.UPDATE_USER: {
			const i = state.users.findIndex((user) => user._id === action.payload._id);
			Object.keys(action.payload.field).map((k) => {
				state.users[i][k] = action.payload.field[k];
				return;
			});
			return state;
		}
		case actions.DELETE_USER: {
			return {
				...state,
				users: state.users.filter((u) => u._id !== action.payload)
			};
		}
		case actions.STOP_FETCHING_USERS: {
			return {
				...state,
				canFetch: false
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
