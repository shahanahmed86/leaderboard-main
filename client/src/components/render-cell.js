import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import RenderDate from './render-date';
import moment from 'moment';

function RenderCell({
	user,
	fieldKey,
	showEdit,
	i,
	preUpdateUser,
	userId,
	field,
	setField,
	undoPreUpdateUser,
	updateUser,
	label,
	type,
	loading
}) {
	const handleChange = ({ target: { name, value } }) => setField({ [name]: value });
	return (
		<div className='flex justify-between items-center'>
			<div>
				{userId === user._id && field[fieldKey] && (
					<div className='absolute bg-color-absolute'>
						<TextField
							disabled={loading}
							style={{ maxWidth: 277 }}
							type={type}
							label={label}
							name={fieldKey}
							value={
								type === 'datetime-local'
									? moment(field[fieldKey]).format('YYYY-MM-DDTHH:mm:ss')
									: field[fieldKey]
							}
							onChange={handleChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<SaveIcon className='cursor-pointer' onClick={updateUser} color='primary' />
										<CloseIcon
											className='cursor-pointer'
											onClick={undoPreUpdateUser}
											color='secondary'
										/>
									</InputAdornment>
								)
							}}
							InputLabelProps={['datetime-local', 'number'].includes(type) ? { shrink: true } : {}}
						/>
					</div>
				)}
				{type === 'datetime-local' ? <RenderDate date={user.date} /> : user[fieldKey]}
			</div>
			<div>
				{showEdit.ind === i && showEdit.name === fieldKey && (
					<EditIcon
						disabled={loading}
						className='cursor-pointer'
						size='small'
						onClick={() => preUpdateUser(user._id, fieldKey, user[fieldKey])}
					/>
				)}
			</div>
		</div>
	);
}

export default RenderCell;
