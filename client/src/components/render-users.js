import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import * as actions from 'store/actions';
import Fab from '@material-ui/core/Fab';
import { apiRequest, catchError } from 'utils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import DialogBox from './dialog-box';
import RenderCell from './render-cell';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		textAlign: 'center'
	},
	body: {
		fontSize: 14
	},
	root: {
		maxHeight: 50,
		minHeight: 50,
		'&:nth-child(1)': {
			minWidth: 60,
			maxWidth: 60
		},
		'&:nth-child(2)': {
			minWidth: 120,
			maxWidth: 120
		},
		'&:nth-child(3)': {
			minWidth: 100,
			maxWidth: 100
		},
		'&:nth-child(4)': {
			minWidth: 140,
			maxWidth: 140
		},
		'&:nth-child(5)': {
			minWidth: 100,
			maxWidth: 100
		},
		'&:nth-child(6)': {
			minWidth: 100,
			maxWidth: 100
		},
		'&:nth-child(7)': {
			minWidth: 75,
			maxWidth: 75
		}
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);

function ShowUsers({ users, fetchMore, fetchingUsers }) {
	const dispatch = useDispatch();

	const [showDeleteIcon, setShowDeleteIcon] = useState(-1);
	const [showEdit, setShowEdit] = useState({ ind: -1, name: '' });

	const [dialogOpen, setDialogOpen] = useState(false);

	const [deletingUser, setDeletingUser] = useState(false);
	const [updatingUser, setUpdatingUser] = useState(false);

	const [selectedUserId, setSelectedUserId] = useState(null);
	const [field, setField] = useState({});

	const preDeleteUser = (id) => {
		setSelectedUserId(id);
		setDialogOpen(true);
	};

	const deleteUser = () => {
		setDeletingUser(true);
		apiRequest({ url: `/api/deleteUser/${selectedUserId}`, method: 'DELETE' })
			.then(({ data }) => {
				toast.success(data);
				dispatch({ type: actions.DELETE_USER, payload: selectedUserId });
				setSelectedUserId(null);
				setDialogOpen(false);
			})
			.catch(catchError)
			.finally(() => {
				setDeletingUser(false);
			});
	};

	const updateUser = () => {
		setUpdatingUser(true);

		apiRequest({ url: `/api/updateUser/${selectedUserId}`, method: 'PUT', data: field })
			.then(() => {
				toast.success('User Updated Successfully');
				dispatch({ type: actions.UPDATE_USER, payload: { _id: selectedUserId, field } });
				setSelectedUserId(null);
				setField({});
			})
			.catch(catchError)
			.finally(() => {
				setUpdatingUser(false);
			});
	};

	const preUpdateUser = (id, name, value) => {
		setSelectedUserId(id);
		setField({ [name]: value });
	};

	const undoPreUpdateUser = () => {
		setSelectedUserId(null);
		setField({});
	};
	return (
		<div className='full-height'>
			<Table aria-label='customized table' className='mb-1'>
				<TableHead>
					<TableRow>
						<StyledTableCell>#</StyledTableCell>
						<StyledTableCell>Participants</StyledTableCell>
						<StyledTableCell>Location</StyledTableCell>
						<StyledTableCell>Date</StyledTableCell>
						<StyledTableCell>Units</StyledTableCell>
						<StyledTableCell>Type</StyledTableCell>
						<StyledTableCell>Points</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user, i) => (
						<StyledTableRow
							key={i}
							onMouseLeave={() => setShowDeleteIcon(-1)}
							onMouseEnter={() => setShowDeleteIcon(i)}
						>
							<StyledTableCell
								component='th'
								scope='row'
								align='center'
								onMouseEnter={() => setShowDeleteIcon(i)}
							>
								{i === showDeleteIcon ? (
									<Fab
										disabled={updatingUser || deletingUser}
										color='secondary'
										aria-label='delete'
										size='small'
										onClick={() => preDeleteUser(user._id)}
									>
										<DeleteIcon />
									</Fab>
								) : (
									i + 1
								)}
							</StyledTableCell>
							<StyledTableCell
								component='th'
								scope='row'
								onMouseEnter={() => setShowEdit({ ind: i, name: 'name' })}
								onMouseLeave={() => setShowEdit({ ind: -1, name: '' })}
							>
								<RenderCell
									loading={updatingUser || deletingUser}
									user={user}
									fieldKey='name'
									i={i}
									preUpdateUser={preUpdateUser}
									showEdit={showEdit}
									userId={selectedUserId}
									field={field}
									setField={setField}
									undoPreUpdateUser={undoPreUpdateUser}
									updateUser={updateUser}
									label='Name'
									type='text'
								/>
							</StyledTableCell>
							<StyledTableCell
								component='th'
								scope='row'
								onMouseEnter={() => setShowEdit({ ind: i, name: 'location' })}
								onMouseLeave={() => setShowEdit({ ind: -1, name: '' })}
							>
								<RenderCell
									loading={updatingUser || deletingUser}
									user={user}
									fieldKey='location'
									i={i}
									preUpdateUser={preUpdateUser}
									showEdit={showEdit}
									userId={selectedUserId}
									field={field}
									setField={setField}
									undoPreUpdateUser={undoPreUpdateUser}
									updateUser={updateUser}
									label='Location'
									type='text'
								/>
							</StyledTableCell>
							<StyledTableCell
								component='th'
								scope='row'
								onMouseEnter={() => setShowEdit({ ind: i, name: 'date' })}
								onMouseLeave={() => setShowEdit({ ind: -1, name: '' })}
							>
								<RenderCell
									loading={updatingUser || deletingUser}
									user={user}
									fieldKey='date'
									i={i}
									preUpdateUser={preUpdateUser}
									showEdit={showEdit}
									userId={selectedUserId}
									field={field}
									setField={setField}
									undoPreUpdateUser={undoPreUpdateUser}
									updateUser={updateUser}
									label='Date'
									type='datetime-local'
								/>
							</StyledTableCell>
							<StyledTableCell
								component='th'
								scope='row'
								onMouseEnter={() => setShowEdit({ ind: i, name: 'units' })}
								onMouseLeave={() => setShowEdit({ ind: -1, name: '' })}
							>
								<RenderCell
									loading={updatingUser || deletingUser}
									user={user}
									fieldKey='units'
									i={i}
									preUpdateUser={preUpdateUser}
									showEdit={showEdit}
									userId={selectedUserId}
									field={field}
									setField={setField}
									undoPreUpdateUser={undoPreUpdateUser}
									updateUser={updateUser}
									label='Units'
									type='text'
								/>
							</StyledTableCell>
							<StyledTableCell
								component='th'
								scope='row'
								onMouseEnter={() => setShowEdit({ ind: i, name: 'type' })}
								onMouseLeave={() => setShowEdit({ ind: -1, name: '' })}
							>
								<RenderCell
									loading={updatingUser || deletingUser}
									user={user}
									fieldKey='type'
									i={i}
									preUpdateUser={preUpdateUser}
									showEdit={showEdit}
									userId={selectedUserId}
									field={field}
									setField={setField}
									undoPreUpdateUser={undoPreUpdateUser}
									updateUser={updateUser}
									label='Type'
									type='text'
								/>
							</StyledTableCell>
							<StyledTableCell
								component='th'
								scope='row'
								onMouseEnter={() => setShowEdit({ ind: i, name: 'points' })}
								onMouseLeave={() => setShowEdit({ ind: -1, name: '' })}
							>
								<RenderCell
									loading={updatingUser || deletingUser}
									user={user}
									fieldKey='points'
									i={i}
									preUpdateUser={preUpdateUser}
									showEdit={showEdit}
									userId={selectedUserId}
									field={field}
									setField={setField}
									undoPreUpdateUser={undoPreUpdateUser}
									updateUser={updateUser}
									label='Points'
									type='number'
								/>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>

			{fetchingUsers ? (
				'fetching...'
			) : (
				<Typography
					className='cursor-pointer decent-padding button'
					gutterBottom
					variant='caption'
					color='primary'
					children='Fetch more'
					onClick={fetchMore}
				/>
			)}
			<DialogBox
				loading={deletingUser}
				open={dialogOpen}
				handleClose={() => setDialogOpen(false)}
				handleSubmit={deleteUser}
				action='Yes'
				cancel='No'
			/>
		</div>
	);
}

export default ShowUsers;
