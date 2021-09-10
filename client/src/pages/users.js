import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import * as actions from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest, catchError } from 'utils';
import { CreateUser, DialogBox, RenderUsers } from 'components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import { toast } from 'react-toastify';

const initialState = {
	name: '',
	location: '',
	date: moment().format('YYYY-MM-DDTHH:mm'),
	units: '',
	type: '',
	points: 0
};

function Users() {
	const dispatch = useDispatch();
	const { users, canFetch, skip, limit } = useSelector(({ user }) => user);

	const [dialogOpen, setDialogOpen] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [creatingUser, setCreatingUser] = useState(false);
	const [form, setForm] = useState({ ...initialState });

	const preAddUser = () => setDialogOpen(true);

	const handleChange = ({ target: { name, value } }) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const addUser = () => {
		setCreatingUser(true);
		const data = { ...form, date: moment(form.date).toDate() };
		apiRequest({ url: '/api/createUser', method: 'POST', data })
			.then(({ data }) => {
				toast.success('User Created Successfully');
				dispatch({ type: actions.ADD_USER, payload: data });
				setDialogOpen(false);
			})
			.catch(catchError)
			.finally(() => {
				setCreatingUser(false);
			});
	};

	const fetchUsers = () => {
		if (!canFetch) toast.info('all users are fetched...');
		if (canFetch) {
			apiRequest({ url: `/api/users?skip=${skip}&limit=${limit}`, method: 'GET' })
				.then(({ data }) => {
					if (data.length < 10) dispatch({ type: actions.STOP_FETCHING_USERS });

					dispatch({
						type: actions.GET_USERS,
						payload: {
							users: data,
							skip: users.length + data.length,
							limit: data.length
						}
					});
				})
				.catch(catchError)
				.finally(() => setLoading(false));
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<div className='max-width-sm m-auto'>
			<div className='mt-2 flex items-center justify-between mb-1'>
				<Typography children='Leader-Board Participants' color='secondary' variant='h4' />
				<Fab color='primary' aria-label='add user' size='small' onClick={preAddUser}>
					<AddIcon />
				</Fab>
			</div>
			{isLoading ? (
				<div className='absolute'>
					<CircularProgress />
				</div>
			) : (
				<RenderUsers users={users} fetchMore={fetchUsers} fetchingUsers={isLoading} />
			)}

			<DialogBox
				loading={creatingUser}
				open={dialogOpen}
				handleClose={() => setDialogOpen(false)}
				handleSubmit={addUser}
				action='Save'
				title='ADD PARTICIPANT'
			>
				<CreateUser form={form} handleChange={handleChange} />
			</DialogBox>
		</div>
	);
}

export default Users;
